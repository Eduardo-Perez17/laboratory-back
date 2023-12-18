// LIBRERIES
import * as bcrypt from 'bcrypt';

// INTERFACES
import { Password } from '../interfaces/password.interface';

export const encryptedPassword = async ({
  password: password,
}: Password): Promise<string> => {
  const passwordEncrypted: string = await bcrypt.hash(
    password,
    Number(process.env.HASH_SALT),
  );

  return passwordEncrypted;
};
