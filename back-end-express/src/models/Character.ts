import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ICharJSON } from "../interfaces/characters.intertfaces";
import User from "./User";

@Entity("characters")
class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  species: string;

  @Column()
  type: string;

  @Column()
  gender: string;

  @Column("text")
  origin: ICharJSON;

  @Column("text")
  location: ICharJSON;

  @Column()
  image: string;

  @Column("varchar", { array: true })
  episode: string[];

  @Column()
  url: string;

  @Column()
  created: Date;

  @ManyToOne(() => User)
  user: User;
}

export default Character;
