import { Logger, Module } from '@nestjs/common';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { TasksModule } from './modules/Tasks.module';

@Module({
  imports: [
    TasksModule,
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),
  ],
})
export class AppModule {}
