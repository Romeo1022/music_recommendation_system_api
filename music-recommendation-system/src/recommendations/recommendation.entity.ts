import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm';
@Entity('recommendations') export class Recommendation { @PrimaryGeneratedColumn() id:number;
 @Column({name:'user_id',type:'int'}) userId:number;
 @Column({name:'song_id',type:'int'}) songId:number;
 @Column({name:'score',type:'int'}) score:number;
 @Column({name:'reason',length:255}) reason:string;
}
