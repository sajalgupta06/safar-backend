import Keystore, { KeystoreModel } from '../models/KeyStore';
import { Types } from 'mongoose';
import User from '../models/User';
import Admin from '../models/Admin';
import Owner from '../models/Owner';

export default class KeystoreController {
  public static findforKey(client: User|Admin| Owner, key: string): Promise<Keystore | null> {
    return KeystoreModel.findOne({ client: client, primaryKey: key, status: true }).lean<Keystore>()
    .cache({key:key});
  }

  public static remove(id: Types.ObjectId): Promise<Keystore | null> {
    return KeystoreModel.findByIdAndRemove(id).lean<Keystore>().exec();
  }

  public static find(
    client: User | Admin,
    primaryKey: string,
    secondaryKey: string,
  ): Promise<Keystore | null> {
    return KeystoreModel.findOne({
      client: client,
      primaryKey: primaryKey,
      secondaryKey: secondaryKey,
    })
      .lean<Keystore>()
      .exec();
  }

  public static async create(
    client: User | Admin,
    primaryKey: string,
    secondaryKey: string,
  ): Promise<Keystore> {
    const now = new Date();
    const keystore = await KeystoreModel.create({
      client: client,
      primaryKey: primaryKey,
      secondaryKey: secondaryKey,
      createdAt: now,
      updatedAt: now,
    } as Keystore);
    return keystore;
  }
}
