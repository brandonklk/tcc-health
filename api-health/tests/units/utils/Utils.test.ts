import { buildValuesProcedure } from '../../../src/utils/Utils';
import { IDetailsProcedure } from '../../../src/interfaces';

const createProceduresWithDocuments = (
  initialLoop: number,
  finishLoop: number,
) => {
  const details: IDetailsProcedure[] = [];

  for (let i = initialLoop; i <= finishLoop; i++) {
    details.push({
      description: `description 0`,
      procedures_id: 1,
      title_procedure: `title 0`,
      files_id: i,
      type_procedures: 1,
      file_title: `documento (${i}).png`,
      title_storage: `documento (${i}).png`,
    });
  }

  return details;
};

/**
 * Testes para a função que cria os valores
 * para o detalhe do procedimento
 */
test('details with documents', () => {
  const details: IDetailsProcedure = {
    description: `description 0`,
    procedures_id: 1,
    title_procedure: `title 0`,
    type_procedures: 1,
    files: [
      {
        file_title: `documento (1).png`,
        title_storage: `documento (1).png`,
        files_id: 1,
      },

      {
        file_title: `documento (2).png`,
        title_storage: `documento (2).png`,
        files_id: 2,
      },
    ],
  };

  const allProcedures = createProceduresWithDocuments(1, 2);

  const [procedure] = buildValuesProcedure(allProcedures);

  expect(procedure).toEqual(details);
});

test('details with documents empty', () => {
  const details: IDetailsProcedure = {
    description: `description 0`,
    procedures_id: 1,
    title_procedure: `title 0`,
    type_procedures: 1,
    files: [],
  };

  const allProcedures = createProceduresWithDocuments(0, 0);

  const [procedure] = buildValuesProcedure(allProcedures);

  expect(procedure).toEqual(details);
});

test('details with description incorrect', () => {
  const details: IDetailsProcedure = {
    description: `description 1`,
    procedures_id: 1,
    title_procedure: `title 0`,
    type_procedures: 1,
    files: [],
  };

  const allProcedures = createProceduresWithDocuments(0, 0);

  const [procedure] = buildValuesProcedure(allProcedures);

  expect(procedure).not.toEqual(details);
});

test('procedures for create details is empty', () => {
  const proceduresNotFound: IDetailsProcedure[] = [];

  const [procedure] = buildValuesProcedure(proceduresNotFound);

  expect(procedure).toBeUndefined();
});
