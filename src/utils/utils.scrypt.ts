import { scrypt, randomBytes } from 'crypto';

export default abstract class Scrypt {
  static hash(password: string) {
    return new Promise<string>((resolve, reject) => {
      const salt = randomBytes(8).toString('hex');
      scrypt(password, salt, 64, (err, buffer) =>
        err ? reject(err) : resolve(salt + ':' + buffer.toString('hex'))
      );
    });
  }

  static verify(password: string, hash: string) {
    return new Promise<boolean>((resolve, reject) => {
      const [salt, key] = hash.split(':');
      salt
        ? scrypt(password, salt, 64, (err, buffer) =>
            err ? reject(err) : resolve(key === buffer.toString('hex'))
          )
        : reject();
    });
  }
}
