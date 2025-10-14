import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  nome!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column({ length: 100 })
  senha!: string;
}