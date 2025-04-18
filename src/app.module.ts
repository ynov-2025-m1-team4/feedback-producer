import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    FeedbacksModule,
  ],
})
export class AppModule {}
