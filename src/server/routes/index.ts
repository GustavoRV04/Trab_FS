import { Router } from "express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StatusCodes} from 'http-status-codes';
import {CidadesController} from './../controllers';
import { EstadosController } from "../controllers/estados";


const router = Router();

router.get('/', (req, res) => {
    return res.send('Olá mundo');
});

router.post('/cidades',CidadesController.createValidation,CidadesController.create);
router.get('/cidades',CidadesController.getAllValidation,CidadesController.getAll);
router.get('/cidades/:id',CidadesController.getByIdValidation,CidadesController.getById);
router.put('/cidades/:id',CidadesController.updateByIdValidation,CidadesController.updateById);
router.delete('/cidades/:id',CidadesController.deleteByIdValidation,CidadesController.deleteById);

// Rotas de estados
router.post("/estados", EstadosController.createValidation, EstadosController.create);


export { router };