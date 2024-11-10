import jwt from 'jsonwebtoken';

/**
 * Generate JWT
 * @param {any} userId
 * @returns {Promise<any>}
 */
export const generateJWT = async (userId: any, role: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const payload = { 
      userId,
      scopes: [role]
    };

    jwt.sign(
      payload,
      process.env.JWT_TOKEN_SECRET || '',
      { expiresIn: '4h' },
      (err: any, token: any) => {
        if (err) {
          return reject(new Error("Error while generating token"));
        }
        resolve(token);
      }
    );
  });
};
