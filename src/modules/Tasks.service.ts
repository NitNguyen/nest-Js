import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks(page, limit) {
    try {
      if (!page || !limit) {
        page = 1;
        limit = 10;
      }
      const items = await this.prismaService.tasks.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });
      const total = await this.prismaService.tasks.count();
      return {
        items,
        page,
        limit,
        total,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
