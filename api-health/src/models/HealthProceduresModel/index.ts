import connection from '@db/connection';

import { IHealthProcedures } from '@interfaces/index';
import { log } from '@logs/log';

const HealthProceduresConnection = <T>() =>
  connection<T>('health_procedures as hp');

export const findAllProceduresUser = async (userId: number) => {
  const procedures = await HealthProceduresConnection()
    .select(
      'hp.procedures_id',
      'hp.title',
      'hp.type_procedures',
      'hp.description',
    )
    .where('hp.user_id', '=', userId);

  return procedures;
};

export const saveHealthProcedure = async (
  valuesNewHealthProcedure: IHealthProcedures,
) => {
  let success = false;

  await connection.transaction(async trx => {
    try {
      await HealthProceduresConnection()
        .transacting(trx)
        .insert({
          ...valuesNewHealthProcedure,
        });

      await trx.commit();

      log.info('Procedimento salvo com sucesso!');

      success = true;
    } catch (e) {
      log.error(e, 'Erro ao salvar procedimento, rollback realizado.', e);

      success = false;

      await trx.rollback();
    }
  });

  return success;
};

export const getProcedureUser = async <T>(
  procedureId: string,
  columns: any[],
) => {
  const procedure = await HealthProceduresConnection<T>()
    .select(columns)
    .where('hp.procedures_uuid', '=', procedureId)
    .first();

  return procedure;
};

export const getDetailsProcedureUser = async (
  procedureId: number,
  columns: string[],
) => {
  const procedure = await HealthProceduresConnection()
    .select(columns)
    .leftJoin('documents_health as dh', 'hp.procedures_id', 'dh.procedures_id')
    .leftJoin('files as f', 'dh.files_id', 'f.files_id')
    .where({ 'hp.procedures_id': procedureId });

  return procedure;
};
