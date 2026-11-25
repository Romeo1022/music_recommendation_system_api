
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Song } from '../songs/song.entity';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id', type: 'int' })
  userId!: number;

  @Column({ name: 'name', length: 150 })
  name!: string;

  @ManyToMany(() => Song)
  @JoinTable({
    name: 'playlist_songs',
    joinColumn: {
      name: 'playlist_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'song_id',
      referencedColumnName: 'id',
    },
  })
  songs!: Song[];
}
