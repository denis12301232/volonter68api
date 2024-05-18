import type { IProject } from '@/types';
import { Mongo } from '@/common/mongo/models';
import { ProjectDto } from '@/app/dto';

export default abstract class ProjectService {
  static async index(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [projects, total] = await Promise.all([
      Mongo.Project.find().skip(skip).limit(limit).lean(),
      Mongo.Project.countDocuments(),
    ]);

    return { projects: projects.map((item) => new ProjectDto(item)), total };
  }

  static async show(_id: string) {
    const project = await Mongo.Project.findById(_id).lean();
    return project ? { project: new ProjectDto(project) } : null;
  }

  static async create(data: { title: string; content: string }) {
    const project = await Mongo.Project.create(data);
    return { project: new ProjectDto(project) };
  }

  static update(
    _id: string,
    project: Partial<Omit<IProject, 'updatedAt' | 'createdAt' | 'deletedAt'>>
  ) {
    return Mongo.Project.updateOne({ _id }, project);
  }

  static destroy(_id: string) {
    return Mongo.Project.updateOne({ _id }, { deletedAt: new Date() }).lean();
  }
}
