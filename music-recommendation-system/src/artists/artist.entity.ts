import {Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm';
import {Song} from '../songs/song.entity';
@Entity('artists') export class Artist {
 @PrimaryGeneratedColumn() id:number;
 @Column({length:150}) name:string;
 @Column({nullable:true,length:80}) genre:string;
 @OneToMany(()=>Song,s=>s.artist) songs:Song[];
}
