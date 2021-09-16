import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Title } from "./Title";


@Entity()
export class Format extends BaseEntity{
    @PrimaryGeneratedColumn()
    format_ID:number;

    @Column()
    format_Code:string;

    @Column()
    description:string;

    @OneToMany(
      () => Title,
      (title) => title.format
	)
	titles: Title[];


}