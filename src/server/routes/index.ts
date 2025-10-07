import { Router } from "express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StatusCodes} from 'http-status-codes';

import {CidadesController} from './../controllers';



const router = Router();

router.get('/', (req, res) => {
    return res.send('Olá, mundo!');
});

router.post('/cidades', CidadesController.create);



export { router };