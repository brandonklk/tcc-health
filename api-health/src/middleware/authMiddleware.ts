import { buildMessageFeedback } from '@utils/MessageFeedback';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const requireAuth = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { authorization } = request.headers;

  if (authorization) {
    jwt.verify(
      authorization,
      process.env.SECRET_TOKEN_AUTH,
      (err, decodedToken) => {
        if (err) {
          return response.status(401).json(
            buildMessageFeedback({
              msg: 'Not authorized',
              type: 'error',
            }),
          );
        } else {
          next();
        }
      },
    );
  } else {
    return response.status(401).json(
      buildMessageFeedback({
        msg: 'Not authorized',
        type: 'error',
      }),
    );
  }
};

export default requireAuth;
