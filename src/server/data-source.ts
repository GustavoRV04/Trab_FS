import { DataSource } from "typeorm";
import { Cidade } from "./entity/Cidade";
import { Estado } from "./entity/Estado";
import { Pessoa } from "./entity/Pessoa";
import { Usuario } from "./entity/Usuarios";

export const AppDataSource = new DataSource({
    type: "postgres",    
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "dcs-pgadmin",
    synchronize: true,
    logging: true,
    // dropSchema: true, //adicionar se quiser limpar o banco
    entities: ["./entity/*.ts", Cidade, Estado, Pessoa, Usuario],
    subscribers: [],
    migrations: [],
})