import { Request, Response } from 'express';
import { buildDateCurrent } from '@utils/DateUtils';
import connection from '@db/connection';
import { log } from '@logs/log';
import { IDocumentsProcedureSave } from '@interfaces/index';

const DocumentsProceduresConnection = <T>() =>
  connection<T>('documents_health as dh');

export const insertFileAndGetIdFile = async (file: Express.Multer.File) => {
  let fileId = 0;
  const { filename, originalname: title } = file;

  const create_date = buildDateCurrent();
  const safeFileName = filename;

  try {
    await connection('files').insert({
      title_storage: safeFileName,
      title,
      create_date,
    });

    const { files_id } = await connection('files')
      .select('files_id')
      .where({ title_storage: safeFileName })
      .first();

    fileId = files_id;
  } catch (error) {
    log.error('Não foi possivel salvar a imagem', error);
  }

  return fileId;
};

export const insertDocumentProcedure = async (
  documentsProcedures: IDocumentsProcedureSave,
) => {
  let success = false;

  await connection.transaction(async trx => {
    try {
      await DocumentsProceduresConnection()
        .transacting(trx)
        .insert({
          ...documentsProcedures,
        });

      await trx.commit();

      success = true;
    } catch (e) {
      log.error(
        e,
        'Erro ao salvar imagens do procedimento, rollback realizado.',
        e,
      );

      success = false;

      await trx.rollback();
    }
  });

  return success;
};
