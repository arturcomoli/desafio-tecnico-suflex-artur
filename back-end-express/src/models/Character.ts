import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ICharJSON } from "../interfaces/characters.interfaces";
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

  @Column("simple-json")
  origin: ICharJSON;

  @Column("simple-json")
  location: ICharJSON;

  @Column()
  image: string;

  @Column("varchar", { array: true })
  episode: string[];

  @Column()
  url: string;

  @Column()
  created: Date;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  user: User;
}

export default Character;
