import { Request, Response } from 'express';
import { buildDateCurrent } from '@utils/DateUtils';
import connection from '@db/connection';
import { log } from '@logs/log';

export const insertFileAndGetIdFile = async (
  file: Express.Multer.File,
  response: Response,
) => {
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
