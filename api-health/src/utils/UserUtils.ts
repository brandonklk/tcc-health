import { keyUserCache } from '@constante/index';
import { IUsers } from '@interfaces/index';
import { getCache } from '@modules/cache';

export const emailUserExist = (user: IUsers[], emailRequest: string) => {
  const emailExist = user.some(({ email: mail }: IUsers) => {
    return mail === emailRequest;
  });

  return emailExist;
};

export const getValuesUserCache = (userId: number) => {
  let valueUser: IUsers = {} as IUsers;
  const users: IUsers[] = getCache(keyUserCache);

  if (users && users.length) {
    [valueUser] = users.filter(({ userId: userUUID }) => {
      return userUUID === userId;
    });
  }

  return valueUser;
};
