import { Module } from '@nestjs/common';
import { TasksService } from './Tasks.service';
import { TasksController } from './Tasks.controller';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
