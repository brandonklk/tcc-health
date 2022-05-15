import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import multer from 'multer';

import connection from 'src/database/connection';

import { IDetailsProcedure, IFileInsert, IMedProcedures } from 'src/interfaces';

import { buildMessageFeedback } from 'src/utils/MessageFeedback';

import multerConfig from 'src/config/multer';
import { log } from 'src/logger/log';

import { buildDateCurrent } from '@utils/DateUtils';
import { insertFile, insertFileAndGetIdFile } from '@utils/FilesUtils';

import { getCache, hasCache, saveCache } from 'src/modules/cache';
import { generateUUId } from '@utils/Utils';

const upload = multer(multerConfig);

const MedProceduresConnection = () =>
  connection<IMedProcedures>('health_procedures as hp');

const MedProceduresCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });

class MedProcedures {
  async getAllHealthProceduresUser(request: Request, response: Response) {
    const { userId: user_id } = request.params;

    const userId = Number(user_id);

    const procedures = await MedProceduresConnection()
      .select(
        'hp.procedures_id',
        'hp.title',
        'hp.type_procedures',
        'hp.description',
      )
      //.leftJoin('files as f', 'hp.procedures_id', 'f.procedures_id')
      .where('hp.user_id', '=', userId);

    return response.json(procedures);
  }

  async saveMedProcedures(request: Request, response: Response) {
    const { title, type_procedures, description, user_id } =
      request.body as IMedProcedures;

    const create_date = buildDateCurrent();
    const uuIdProcedure = generateUUId();

    await connection.transaction(async trx => {
      try {
        await MedProceduresConnection().transacting(trx).insert({
          title,
          type_procedures,
          description,
          user_id,
          procedures_uuid: uuIdProcedure,
          create_date,
        });

        await trx.commit();
      } catch (e) {
        log.error(e, 'Erro ao salvar procedimento, rollback realizado.', e);
        await trx.rollback();

        return response.status(500).json(
          buildMessageFeedback({
            msg: 'Erro ao salvar procedimento.',
            type: 'error',
          }),
        );
      }
    });

    let resultInsertFiles = { success: null };

    if (request.files && request.files.length > 0) {
      const procedureId: Required<Pick<IMedProcedures, 'procedures_id'>> =
        await MedProceduresConnection()
          .select('hp.procedures_id')
          .where({ 'hp.procedures_uuid': uuIdProcedure })
          .first();

      const files: Express.Multer.File[] =
        request.files as Express.Multer.File[];

      for (const file of files) {
        const newFile: IFileInsert = {
          ...file,
          procedureId: procedureId.procedures_id,
        };

        const { success } = await insertFile(newFile);

        resultInsertFiles.success = success;

        if (!success) {
          break;
        }
      }
    }

    if (resultInsertFiles.success === false) {
      return response.status(500).json(
        buildMessageFeedback({
          msg: 'Erro ao salvar imagem do procedimento.',
          type: 'error',
        }),
      );
    } else {
      return response.json(
        buildMessageFeedback({
          msg: 'Procedimento salvo com sucesso.',
          type: 'success',
        }),
      );
    }
  }

  async deleteMedProcedures(request: Request, response: Response) {
    const { procedureId: procedId } = request.params;

    const procedureId = Number(procedId);

    await connection.transaction(async trx => {
      try {
        await MedProceduresConnection()
          .transacting(trx)
          .where({ procedures_id: procedureId })
          .del();

        await trx.commit();
      } catch (e) {
        log.error(e, 'Erro ao deletar procedimento, rollback realizado.', e);
        await trx.rollback();

        return response.status(500).json(
          buildMessageFeedback({
            msg: 'Erro ao deletar procedimento.',
            type: 'error',
          }),
        );
      }
    });

    return response.json(
      buildMessageFeedback({
        msg: 'Procedimento deletado com sucesso.',
        type: 'success',
      }),
    );
  }

  async getDetailsProcedure(request: Request, response: Response) {
    const { procedureId } = request.params;

    let details: any[] = [];

    const detailsProcedure = await MedProceduresConnection()
      .select(
        'hp.procedures_id',
        'hp.title as title_procedure',
        'hp.type_procedures',
        'hp.description',
        'f.files_id',
        'f.title as file_title',
        'f.title_storage',
      )
      .leftJoin('files as f', 'hp.procedures_id', 'f.procedures_id')
      .where({ 'hp.procedures_id': procedureId });

    detailsProcedure.forEach(
      ({
        file_title,
        title_storage,
        files_id,
        procedures_id,
        ...otherValues
      }) => {
        const procedureExist = details.findIndex(
          ({ procedures_id: procedureId }) => {
            return procedureId === procedures_id;
          },
        );

        if (procedureExist !== -1) {
          details[procedureExist].files.push({
            file_title,
            title_storage,
            files_id,
          });
        } else {
          details.push({
            ...otherValues,
            procedures_id,
            files: files_id ? [{ file_title, title_storage, files_id }] : [],
          });
        }
      },
    );

    return response.json(details[0]);
  }

  async editMedProcedures(request: Request, response: Response) {
    const { procedureId, description, typeProcedures, title } = request.body;

    try {
      let file_id = null;

      if (request.file) {
        file_id = await insertFileAndGetIdFile(request, response);

        if (file_id === 0) {
          return response.status(500).json(
            buildMessageFeedback({
              msg: 'Não foi possivel salvar a imagem do procedimento.',
              type: 'error',
            }),
          );
        }
      }

      await connection.transaction(async trx => {
        try {
          await MedProceduresConnection()
            .transacting(trx)
            .where({ procedures_id: procedureId })
            .update({
              description,
              type_procedures: typeProcedures,
              title,
              file_id,
            });

          await trx.commit();
        } catch (e) {
          log.error(e, 'Erro ao editar procedimento, rollback realizado.', e);
          await trx.rollback();
          return response.status(500).json(
            buildMessageFeedback({
              msg: 'Erro ao editar procedimento.',
              type: 'error',
            }),
          );
        }
      });

      return response.json(
        buildMessageFeedback({
          msg: 'Procedimento editado com sucesso.',
          type: 'success',
        }),
      );
    } catch (error) {
      return response.status(500).json(
        buildMessageFeedback({
          msg: 'Não foi possivel editado o procedimento.',
          type: 'error',
        }),
      );
    }
  }
}

export { MedProcedures };
