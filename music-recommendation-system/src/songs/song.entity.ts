import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,OneToMany} from 'typeorm';
import {Artist} from '../artists/artist.entity';
import {Rating} from '../ratings/rating.entity';
@Entity('songs') export class Song {
 @PrimaryGeneratedColumn() id:number;
 @Column({length:180}) title:string;
 @Column({nullable:true,length:80}) genre:string;
 @Column({name:'release_year',type:'int',nullable:true}) releaseYear:number;
 @Column({name:'artist_id'}) artistId:number;
 @ManyToOne(()=>Artist,a=>a.songs,{onDelete:'RESTRICT'}) @JoinColumn({name:'artist_id'}) artist:Artist;
 @OneToMany(()=>Rating,r=>r.song) ratings:Rating[];
}
