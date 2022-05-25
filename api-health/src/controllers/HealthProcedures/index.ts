import { Request, Response } from 'express';
import NodeCache from 'node-cache';
import multer from 'multer';

import connection from '@db/connection';

import { IFileInsert, IHealthProcedures } from '@interfaces/index';

import { buildMessageFeedback } from '@utils/MessageFeedback';

import { configMulter } from '@config/multerConfig';
import { log } from '@logs/log';

import { buildDateCurrent } from '@utils/DateUtils';

import { getCache, hasCache, saveCache } from '@modules/cache';
import { generateUUId } from '@utils/Utils';
import {
  getAllHealthProceduresUserService,
  getDetailsProcedureService,
  saveHealthProcedureService,
} from '@services/HealthProcedures/HealthProceduresServices';
import { insertFileAndGetIdFile } from '@models/FilesModel';

const upload = multer(configMulter);

const HealthProceduresConnection = () =>
  connection<IHealthProcedures>('health_procedures as hp');

class HealthProcedures {
  async getAllHealthProceduresUser(request: Request, response: Response) {
    const { userId } = request.params;

    const allProcedures = await getAllHealthProceduresUserService(
      Number(userId),
      response,
    );

    return allProcedures;
  }

  async saveHealthProcedures(request: Request, response: Response) {
    const { title, type_procedures, description, user_id } =
      request.body as IHealthProcedures;

    const create_date = buildDateCurrent();
    const uuIdProcedure = generateUUId();

    const valuesNewProcedures: IHealthProcedures = {
      title: title || '',
      type_procedures: type_procedures || 0,
      description: description || '',
      user_id: user_id || 0,
      create_date,
      procedures_uuid: uuIdProcedure || '',
      files_multer: request.files as Express.Multer.File[],
    };

    const resultSaveProcedure = await saveHealthProcedureService(
      valuesNewProcedures,
      response,
    );

    return resultSaveProcedure;
  }

  async deleteHealthProcedures(request: Request, response: Response) {
    const { procedureId: procedId } = request.params;

    const procedureId = Number(procedId);

    await connection.transaction(async trx => {
      try {
        await HealthProceduresConnection()
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

    const procedureDetails = await getDetailsProcedureService(
      Number(procedureId),
      response,
    );

    return procedureDetails;

    // let details: any[] = [];

    // const detailsProcedure = await HealthProceduresConnection()
    //   .select(
    //     'hp.procedures_id',
    //     'hp.title as title_procedure',
    //     'hp.type_procedures',
    //     'hp.description',
    //     'f.files_id',
    //     'f.title as file_title',
    //     'f.title_storage',
    //   )
    //   .leftJoin('files as f', 'hp.procedures_id', 'f.procedures_id')
    //   .where({ 'hp.procedures_id': procedureId });

    // detailsProcedure.forEach(
    //   ({
    //     file_title,
    //     title_storage,
    //     files_id,
    //     procedures_id,
    //     ...otherValues
    //   }) => {
    //     const procedureExist = details.findIndex(
    //       ({ procedures_id: procedureId }) => {
    //         return procedureId === procedures_id;
    //       },
    //     );

    //     if (procedureExist !== -1) {
    //       details[procedureExist].files.push({
    //         file_title,
    //         title_storage,
    //         files_id,
    //       });
    //     } else {
    //       details.push({
    //         ...otherValues,
    //         procedures_id,
    //         files: files_id ? [{ file_title, title_storage, files_id }] : [],
    //       });
    //     }
    //   },
    // );

    // return response.json(details[0]);
  }

  async editHealthProcedures(request: Request, response: Response) {
    const { procedureId, description, typeProcedures, title } = request.body;

    try {
      let file_id = null;

      if (request.file) {
        file_id = await insertFileAndGetIdFile(request.file);

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
          await HealthProceduresConnection()
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

export { HealthProcedures };
