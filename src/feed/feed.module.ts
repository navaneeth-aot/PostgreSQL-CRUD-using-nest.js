import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedService } from './services/feed.service';
import { FeedController } from './controller/feed.controller';
import { studentEntity } from './models/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([studentEntity])],
  providers: [FeedService],
  controllers: [FeedController]
})
export class FeedModule {}
