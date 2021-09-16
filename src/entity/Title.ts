import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn, BaseEntity } from "typeorm";
import { Author } from "./Author";
import { Format } from "./Format";

@Entity()
export class Title extends BaseEntity{
    @PrimaryGeneratedColumn()
    title_ID:number;

    @Column({unique:true, nullable:false})
    isbn:string;

    @Column()
    title:string;

    @Column()
    description:string;
    
    @Column()
    dateOfPublication:string;

    @ManyToMany((type)=>Author,author=>author.titles,{onDelete:'CASCADE'})
    authors:Author[]

    @ManyToOne(
        () => Format,
        (format) => format.titles
      )
    @JoinColumn({ name: "format_ID" })
    format: Format;
  
}