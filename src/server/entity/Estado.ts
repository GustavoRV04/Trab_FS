import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cidade } from "./Cidade";

@Entity('estados')
export class Estado {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 2, unique: true })
  sigla!: string;

  @Column({ length: 30 })
  nome!: string;

  @OneToMany(() => Cidade, cidade => cidade.estado)
  cidades!: Cidade[];
}