import { Controller, Get, Query } from '@nestjs/common';
import { TasksService } from './Tasks.service';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getTasks(@Query('page') page: number, @Query('limit') limit: number) {
    return this.taskService.getTasks(page, limit);
  }
}
