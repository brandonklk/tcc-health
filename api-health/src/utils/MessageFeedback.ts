import { IMessageFeedback } from 'src/interfaces';

export const buildMessageFeedback = ({ msg, type }: IMessageFeedback) => {
  return { msg, type };
}
