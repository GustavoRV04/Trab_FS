import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Estado } from "./Estado";

@Entity('cidades')
export class Cidade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 30 })
  nome!: string;

  @ManyToOne(() => Estado, estado => estado.cidades, { eager: true })
  @JoinColumn({ name: "estado_id" })
  estado!: Estado;
}