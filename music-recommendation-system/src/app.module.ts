
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';
import { RatingsModule } from './ratings/ratings.module';
import { GenreModule } from './genres/genres.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { FavoriteModule } from './favorites/favorites.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'music_recommendation_db',
      autoLoadEntities: true,
      synchronize: false,
    }),

    AuthModule,
    UsersModule,
    ArtistsModule,
    SongsModule,
    RatingsModule,
    GenreModule,
    PlaylistsModule,
    FavoriteModule,
    RecommendationsModule,
  ],
})
export class AppModule {}
