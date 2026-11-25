import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,Unique} from 'typeorm';
import {User} from '../users/user.entity';
import {Song} from '../songs/song.entity';
@Entity('ratings') @Unique(['userId','songId']) export class Rating {
 @PrimaryGeneratedColumn() id:number;
 @Column({name:'user_id'}) userId:number;
 @Column({name:'song_id'}) songId:number;
 @Column({type:'int'}) score:number;
 @Column({type:'text',nullable:true}) review:string;
 @ManyToOne(()=>User,u=>u.ratings,{onDelete:'CASCADE'}) @JoinColumn({name:'user_id'}) user:User;
 @ManyToOne(()=>Song,s=>s.ratings,{onDelete:'CASCADE'}) @JoinColumn({name:'song_id'}) song:Song;
}
