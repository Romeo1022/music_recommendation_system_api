
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Playlist } from './playlist.entity';
import { Song } from '../songs/song.entity';
import { PlaylistController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist, Song]),
  ],
  controllers: [PlaylistController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
