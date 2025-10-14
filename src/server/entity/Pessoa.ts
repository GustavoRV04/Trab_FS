import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cidade } from "./Cidade";


@Entity('pessoas')
export class Pessoa {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  nome!: string;

  @ManyToOne(() => Cidade, { eager: true })
  @JoinColumn({ name: "cidade_id" })
  cidade!: Cidade;

}