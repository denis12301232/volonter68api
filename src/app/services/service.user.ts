import { error } from 'elysia';
import { Mongo } from '@/common/mongo/models';
import { UserRole } from '@/enums';
import { Scrypt } from '@/utils';
import { UserDto } from '@/app/dto';

export default abstract class UserService {
  static async me(id: string | null) {
    const result = await Mongo.User.findById(id).lean();
    return result ? { user: new UserDto(result) } : null;
  }

  static async password(id: string | null, password: { old: string; new: string }) {
    const user = await Mongo.User.findById(id).lean();

    if (!user) {
      throw error(400);
    }

    const isPasswordEqual = await Scrypt.verify(password.old, user.password);

    if (!isPasswordEqual) {
      throw error(400, { message: 'Wrong password' });
    }

    const hash = await Scrypt.hash(password.new);
    const result = await Mongo.User.updateOne({ _id: id }, { password: hash }).lean();

    return result;
  }

  static async role(id: string, role: UserRole) {
    const result = await Mongo.User.updateOne({ _id: id }, { $addToSet: { roles: role } });
    return result;
  }
}
