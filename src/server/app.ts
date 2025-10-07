import express from 'express';
import { server } from './Server';




const app = express();
const port = process.env.port || 3000;
app.use(express.json());

server.listen(process.env.port || 3000, () => console.log('Server is running on port', port));