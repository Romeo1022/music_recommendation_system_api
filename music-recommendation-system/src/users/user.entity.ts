import {Entity,PrimaryGeneratedColumn,Column,OneToMany} from 'typeorm';
import {Rating} from '../ratings/rating.entity';
@Entity('users') export class User {
 @PrimaryGeneratedColumn() id:number;
 @Column({length:80}) username:string;
 @Column({unique:true,length:160}) email:string;
 @Column({name:'password_hash',select:false}) passwordHash:string;
 @Column({default:'user'}) role:string;
 @OneToMany(()=>Rating,r=>r.user) ratings:Rating[];
}
