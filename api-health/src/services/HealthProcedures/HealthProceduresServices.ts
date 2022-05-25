import { Response } from 'express';

import {
  IHealthProcedures,
  IDocumentsProcedureSave,
  IDetailsProcedure,
} from '@interfaces/index';

import { buildMessageFeedback } from '@utils/MessageFeedback';

import { log } from '@logs/log';

import { buildDateCurrent } from '@utils/DateUtils';

import {
  findAllProceduresUser,
  getDetailsProcedureUser,
  getProcedureUser,
  saveHealthProcedure,
} from '@models/HealthProceduresModel';
import {
  insertDocumentProcedure,
  insertFileAndGetIdFile,
} from '@models/FilesModel';
import { buildValuesProcedure } from '@utils/Utils';

export const getAllHealthProceduresUserService = async (
  userId: number,
  res: Response,
) => {
  if (!userId) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'O id do usuário não foi informado.',
        type: 'error',
      }),
    );
  }

  try {
    const procedures = await findAllProceduresUser(userId);

    return res.json(procedures);
  } catch (error) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'Não foi possivel obter os procedimentos registrados.',
        type: 'error',
      }),
    );
  }
};

export const saveHealthProcedureService = async (
  valuesProcedure: IHealthProcedures,
  res: Response,
) => {
  const {
    user_id,
    create_date,
    description,
    title,
    type_procedures,
    procedures_uuid,
    files_multer,
  } = valuesProcedure;

  if (!user_id) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'O id do usuário não foi informado.',
        type: 'error',
      }),
    );
  }

  if (!create_date) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'A data de criação do procedimento não foi informada, por favor contate o suporte.',
        type: 'error',
      }),
    );
  }

  if (!description) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'A descrição do procedimento não foi informado',
        type: 'error',
      }),
    );
  }

  if (!title) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'O titulo do procedimento não foi informado',
        type: 'error',
      }),
    );
  }

  if (!type_procedures) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'O tipo do procedimento não foi informado',
        type: 'error',
      }),
    );
  }

  const valuesNewProcedures = {
    user_id,
    create_date,
    description,
    title,
    type_procedures,
    procedures_uuid,
  };

  const insertProcedureSuccess = await saveHealthProcedure(valuesNewProcedures);

  if (!insertProcedureSuccess) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'Não foi possivel salvar o procedimento.',
        type: 'error',
      }),
    );
  }

  const filesProcedures: IDocumentsProcedureSave[] = [];

  if (files_multer && files_multer.length > 0) {
    const columns = ['hp.procedures_id'];

    const procedureUser: Required<Pick<IHealthProcedures, 'procedures_id'>> =
      await getProcedureUser(procedures_uuid, columns);
    let sucessInsertFile = true;

    for (const file of files_multer) {
      const fileId = await insertFileAndGetIdFile(file);

      if (!fileId) {
        sucessInsertFile = false;
        break;
      }

      filesProcedures.push({
        files_id: fileId,
        procedures_id: procedureUser.procedures_id,
        create_date: buildDateCurrent(),
      });
    }

    if (!sucessInsertFile) {
      return res.status(500).json(
        buildMessageFeedback({
          msg: 'Ocorreu um erro para salvar as imagens do procedimento',
          type: 'error',
        }),
      );
    }
  }

  if (filesProcedures && filesProcedures.length > 0) {
    let successInsertFileProcedure = true;

    for (const fileProcedure of filesProcedures) {
      successInsertFileProcedure = await insertDocumentProcedure(fileProcedure);

      if (!successInsertFileProcedure) {
        successInsertFileProcedure = false;
        break;
      }
    }

    if (!successInsertFileProcedure) {
      return res.status(500).json(
        buildMessageFeedback({
          msg: 'Ocorreu um erro para salvar os documentos do procedimento',
          type: 'error',
        }),
      );
    }
  }

  return res.json(
    buildMessageFeedback({
      msg: 'Procedimento salvo com sucesso',
      type: 'success',
    }),
  );
};

export const getDetailsProcedureService = async (
  procedureId: number,
  res: Response,
) => {
  if (!procedureId) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: 'A id do procedimento não foi informado',
        type: 'error',
      }),
    );
  }

  const columns = [
    'hp.procedures_id',
    'hp.title as title_procedure',
    'hp.type_procedures',
    'hp.description',
    'f.files_id',
    'f.title as file_title',
    'f.title_storage',
  ];

  try {
    const detailsProcedure = await getDetailsProcedureUser(
      procedureId,
      columns,
    );

    const [newValuesProcedure] = buildValuesProcedure(detailsProcedure);

    let procedureDetails = newValuesProcedure;

    if (!procedureDetails) {
      log.info(`nenhum procedimento encontrado para o id #${procedureId}`);
      procedureDetails = {} as IDetailsProcedure;
    }

    return res.json(procedureDetails);
  } catch (error) {
    return res.status(500).json(
      buildMessageFeedback({
        msg: `Ocorreu um erro para obter os detalhes do procedimento #${procedureId}`,
        type: 'error',
      }),
    );
  }
};
