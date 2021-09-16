import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from "typeorm";
import { Title } from "./Title";


@Entity()
export class Author extends BaseEntity{
    @PrimaryGeneratedColumn()
    author_ID:number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;
    
    @Column()
    email:string;

    @Column()
    phoneNumber:string;

    @ManyToMany(()=>Title,title=>title.authors,{
        cascade:true,
    })
    @JoinTable()
    titles:Title[];

}