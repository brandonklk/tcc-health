import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = Math.floor(Math.random() * 12);
const SIX_HOURS = 21600000;

export const encryptedPwd = async (pwd: string) => {
  if (pwd) {
    pwd = await hash(pwd, saltRounds);
  }

  return pwd;
};

export const comparePwd = async (
  passwordUser: string,
  passwordRequest: string,
) => {
  let passwordIsEquals = false;

  if (passwordUser && passwordRequest) {
    passwordIsEquals = await compare(passwordUser, passwordRequest);
  }

  return passwordIsEquals;
};

export const buildKeyUserLoggedInForCache = (
  userId: number,
  keyCache: string,
) => {
  let keyUser = '';

  if (userId && keyCache) {
    keyUser = `${keyCache}-${userId}`;
  }

  return keyUser;
};

export const generateTokenOfAuthentication = (userId: number) => {
  // 21600000: 6 horas, 3600000: 1 hora
  return jwt.sign({ tui: userId }, process.env.SECRET_TOKEN_AUTH, {
    expiresIn: SIX_HOURS,
  });
};
