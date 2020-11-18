import { sign } from 'jsonwebtoken';

export const createToken = (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    sign({ id }, process.env.SECRET as string, { expiresIn: '24h' }, (error, token) => {
      if (error) return reject(new Error('Something went wrong generating the token...'));
      resolve(token);
    });
  });
};
