import express from 'express';
import { server } from './Server';




const app = express();
const port = process.env.port || 3333;
app.use(express.json());

server.listen(process.env.port || 3333, () => console.log('Server is running on port', port));