import { IDetailsProcedure } from '@interfaces/index';
import { v4 as UUid } from 'uuid';

export const generateUUId = () => {
  return UUid();
};

export const buildValuesProcedure = (valuesProcedure: IDetailsProcedure[]) => {
  const details: IDetailsProcedure[] = [];

  if (valuesProcedure && valuesProcedure.length > 0) {
    valuesProcedure.forEach(
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
  }

  return details;
};
