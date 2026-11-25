
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Playlist } from './playlist.entity';
import { Song } from '../songs/song.entity';
import {
  CreatePlaylistDto,
  UpdatePlaylistDto,
} from './playlists.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly repo: Repository<Playlist>,

    @InjectRepository(Song)
    private readonly songRepo: Repository<Song>,
  ) {}

  // GET ALL PLAYLISTS
  list() {
    return this.repo.find();
  }

  // GET ONE PLAYLIST
  async get(id: number) {
    const playlist = await this.repo.findOneBy({ id });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    return playlist;
  }

  // CREATE PLAYLIST
  create(dto: CreatePlaylistDto) {
    return this.repo.save(this.repo.create(dto));
  }

  // UPDATE PLAYLIST
  async update(id: number, dto: UpdatePlaylistDto) {
    const playlist = await this.get(id);
    Object.assign(playlist, dto);

    return this.repo.save(playlist);
  }

  // DELETE PLAYLIST
  async remove(id: number) {
    const playlist = await this.get(id);
    await this.repo.remove(playlist);

    return { deleted: true };
  }

  // ADD SONG TO PLAYLIST
  async addSong(playlistId: number, songId: number) {
    const playlist = await this.repo.findOne({
      where: { id: playlistId },
      relations: ['songs'],
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    const song = await this.songRepo.findOneBy({
      id: songId,
    });

    if (!song) {
      throw new NotFoundException('Song not found');
    }

    if (!playlist.songs.some(s => s.id === songId)) {
      playlist.songs.push(song);
      await this.repo.save(playlist);
    }

    return playlist;
  }

  // GET PLAYLIST SONGS
  async getSongs(playlistId: number) {
    const playlist = await this.repo.findOne({
      where: { id: playlistId },
      relations: ['songs'],
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    return playlist.songs;
  }

  // REMOVE SONG FROM PLAYLIST
  async removeSong(playlistId: number, songId: number) {
    const playlist = await this.repo.findOne({
      where: { id: playlistId },
      relations: ['songs'],
    });

    if (!playlist) {
      throw new NotFoundException('Playlist not found');
    }

    const exists = playlist.songs.some(
      song => song.id === songId,
    );

    if (!exists) {
      throw new NotFoundException(
        'Song not found in playlist',
      );
    }

    playlist.songs = playlist.songs.filter(
      song => song.id !== songId,
    );

    await this.repo.save(playlist);

    return { deleted: true };
  }
}
