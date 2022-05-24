import { IMessageFeedback } from '@interfaces/index';

export const buildMessageFeedback = ({ msg, type }: IMessageFeedback) => {
  return { msg, type };
};
