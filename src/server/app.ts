import express from 'express';
import { server } from './Server';
import { AppDataSource } from "./data-source";



const app = express();
const port = process.env.port || 3000;
app.use(express.json());

server.listen(process.env.port || 3000, () => console.log('Servidor rodando em ', port));
// Exemplo no app.ts ou server.ts

AppDataSource.initialize().then(() => {
  console.log("Banco de dados iniciado!");
}).catch((err) => {
  console.error("Erro ao iniciar o banco:", err);
});