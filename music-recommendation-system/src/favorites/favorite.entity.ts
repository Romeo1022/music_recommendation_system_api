import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm';
@Entity('favorites') export class Favorite { @PrimaryGeneratedColumn() id:number;
 @Column({name:'user_id',type:'int'}) userId:number;
 @Column({name:'song_id',type:'int'}) songId:number;
}
