import connection from '@db/connection';
import { log } from '@logs/log';
import { IEditUser, INewUser, IUsers } from '@interfaces/index';

const UserConnection = <T>() => connection<T>('users as u');

export const findOneUserByMail = async (mail: string) => {
  const [user]: IUsers[] = await UserConnection<IUsers[]>()
    .select('u.*', 'f.title_storage')
    .where('u.email', '=', mail)
    .leftJoin('files as f', 'u.avatar_id', 'f.files_id');

  return user;
};

export const findManyUserByMail = async (mail: string) => {
  const user: IUsers[] = await UserConnection<IUsers[]>()
    .select('u.*', 'f.title_storage')
    .where('u.email', '=', mail)
    .leftJoin('files as f', 'u.avatar_id', 'f.files_id');

  return user;
};

export const findOneUserById = async (userId: number, columns?: string[]) => {
  const [user]: IUsers[] = await UserConnection<IUsers[]>()
    .select(columns)
    .where('u.user_id', '=', userId)
    .leftJoin('files as f', 'u.avatar_id', 'f.files_id');

  return user;
};

export const insertNewUser = async (valuesNewUser: INewUser) => {
  let success = false;

  await connection.transaction(async trx => {
    try {
      await UserConnection()
        .transacting(trx)
        .insert({ ...valuesNewUser });

      await trx.commit();

      log.info('Usuário criado com sucesso!');

      success = true;
    } catch (error) {
      await trx.rollback();

      log.error(error, 'Erro para salvar usuário');

      success = false;
    }
  });

  return success;
};

export const getAllUsers = async (): Promise<IUsers[]> => {
  return await UserConnection()
    .select(
      'u.user_id as userId',
      'u.name',
      'u.email',
      'u.phone',
      'u.avatar_id as avatarId',
      'u.create_date',
      'f.title_storage',
    )
    .leftJoin('files as f', 'u.avatar_id', 'f.files_id');
};

export const updateUser = async (valuesUserUpdate: IEditUser) => {
  let success = false;

  await connection.transaction(async trx => {
    const { user_id, ...othersValues } = valuesUserUpdate;
    try {
      await UserConnection()
        .transacting(trx)
        .where({ 'u.user_id': user_id })
        .update({ ...othersValues });

      await trx.commit();

      log.info('Usuário editado com sucesso!');

      success = true;
    } catch (error) {
      success = false;

      log.info(`Erro para editar o usuario #${user_id} `, error);

      await trx.rollback();
    }
  });

  return success;
};
