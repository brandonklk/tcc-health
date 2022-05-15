import { Request, Response } from 'express';

import connection from 'src/database/connection';
import { IFileInsert } from 'src/interfaces';
import { log } from 'src/logger/log';

import { buildDateCurrent } from './DateUtils';

export const insertFileAndGetIdFile = async (
  request: Request,
  response: Response,
) => {
  let fileId = 0;
  const { filename, originalname: title } = request.file as Express.Multer.File;

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

export const insertFile = async (file: IFileInsert) => {
  let insert = { success: false };
  const { filename, originalname: title, procedureId } = file;

  const create_date = buildDateCurrent();

  try {
    await connection('files').insert({
      title_storage: filename,
      title,
      procedures_id: procedureId,
      create_date,
    });

    insert.success = true;
  } catch (error) {
    log.error('Não foi possivel salvar a imagem', error);
    insert.success = false;
  }

  return insert;
};
