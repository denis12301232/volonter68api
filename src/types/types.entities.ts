export interface IUser {
  login: string;
  password: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ISession {
  userId: string;
  refresh: string;
}

export interface INews {
  title: string;
  reporter: string;
  content: string;
  date: Date;
  hidden: boolean;
  pinned: boolean;
  deletedAt: Date;
  createdAt: string;
  updatedAt: string;
}

export interface IProject {
  title: string;
  content: string;
  deletedAt: Date;
  createdAt: string;
  updatedAt: string;
}
