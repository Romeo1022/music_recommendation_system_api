
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Recommendation } from './recommendation.entity';
import { RecommendationController } from './recommendations.controller';
import { RecommendationService } from './recommendations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recommendation]),
  ],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommendationsModule {}
