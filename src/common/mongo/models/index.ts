import UserModel from './model.user';
import SessionModel from './model.session';
import NewsModel from './model.news';
import ProjectModel from './model.project';

export namespace Mongo {
  export const User = UserModel;
  export const Session = SessionModel;
  export const News = NewsModel;
  export const Project = ProjectModel;
}
