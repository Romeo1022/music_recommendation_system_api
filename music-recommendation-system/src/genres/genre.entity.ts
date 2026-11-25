import {Entity,PrimaryGeneratedColumn,Column} from 'typeorm';
@Entity('genres') export class Genre { @PrimaryGeneratedColumn() id:number;
 @Column({name:'name',length:120}) name:string;
}
