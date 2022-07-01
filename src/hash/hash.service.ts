import { Injectable } from '@nestjs/common';
import { pbkdf2, randomBytes } from 'crypto';

@Injectable()
export class HashService {
    async hashPassword(password: string): Promise<Hash> {
        const salt = randomBytes(128).toString('base64');
        return new Promise((resolve, reject) => {
          // hash password with pbkdf2 method
          pbkdf2(password, salt, 100000, 64, 'sha512', async (err, derivedKey) => {
            if (err) reject(err);
    
            const hash = derivedKey.toString('hex');
    
            resolve({ hash, salt });
          });
        });
      }
    
      async hashWithProvidedSalt(password: string, salt: string): Promise<Hash> {
        return new Promise((resolve, reject) => {
          // hash password with pbkdf2 method
          pbkdf2(password, salt, 100000, 64, 'sha512', async (err, derivedKey) => {
            if (err) reject(err);
    
            const hash = derivedKey.toString('hex');
    
            resolve({ hash });
          });
        });
      }
}
