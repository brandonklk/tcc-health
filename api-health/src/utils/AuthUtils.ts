import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = Math.floor(Math.random() * 12);
const SIX_HOURS = 21600000;

export const encryptedPwd = async (pwd: string) => {
  return await hash(pwd, saltRounds);
};

export const comparePwd = async (
  passwordUser: string,
  passwordRequest: string,
) => {
  return await compare(passwordUser, passwordRequest);
};

export const buildKeyUserLoggedInForCache = (
  userId: number,
  keyCache: string,
) => {
  return `${keyCache}-${userId}`;
};

export const generateTokenOfAuthentication = (userId: number) => {
  // 21600000: 6 horas, 3600000: 1 hora
  return jwt.sign({ tui: userId }, process.env.SECRET_TOKEN_AUTH, {
    expiresIn: SIX_HOURS,
  });
};
