import { error } from 'elysia';
import { Mongo } from '@/common/mongo/models';
import { Scrypt } from '@/utils';
import { UserDto } from '@/app/dto';

export default abstract class AuthService {
  static async registration(login: string, password: string) {
    const candidate = await Mongo.User.findOne({ login });

    if (candidate) {
      throw error(400, { message: 'Login already taken', field: 'login' });
    }

    const hash = await Scrypt.hash(password);
    const user = await Mongo.User.create({ login, password: hash });

    return new UserDto(user);
  }

  static async login(login: string, password: string) {
    const user = await Mongo.User.findOne({ login }).lean();

    if (!user) {
      throw error(400, { message: 'Incorrect login', field: 'login' });
    }

    const isPasswordsEqual = await Scrypt.verify(password, user.password);

    if (!isPasswordsEqual) {
      throw error(400, { message: 'Incorrect password', field: 'password' });
    }

    return new UserDto(user);
  }

  static async refresh(decoded: false | Record<string, string | number>, session: boolean) {
    if (!decoded || !session) {
      throw error(401);
    }

    const user = await Mongo.User.findOne({ _id: decoded.id }).lean();

    if (!user) {
      throw error(404);
    }

    return new UserDto(user);
  }

  static async logout(decoded: false | Record<string, string | number>) {
    if (!decoded) {
      throw error(401);
    }

    const user = await Mongo.User.findOne({ _id: decoded.id }).lean();

    if (!user) {
      throw error(404);
    }

    return new UserDto(user);
  }
}
