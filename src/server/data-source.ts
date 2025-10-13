import { DataSource } from "typeorm";
import { Cidade } from "./entity/Cidade";
import { Estado } from "./entity/Estado";

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
    entities: ["./entity/*.ts", Cidade, Estado],
    subscribers: [],
    migrations: [],
})