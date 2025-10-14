import { Router } from "express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StatusCodes} from 'http-status-codes';
import {CidadesController} from './../controllers';
import { EstadosController } from "../controllers/estados";
import { PessoasController } from "../controllers/pessoas";
import { UsuariosController } from "../controllers/usuarios";

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
router.get("/estados/:id", EstadosController.getByIdValidation, EstadosController.getById);
router.delete("/estados/:id", EstadosController.deleteByIdValidation, EstadosController.deleteById);
router.put("/estados/:id", EstadosController.updateByIdValidation, EstadosController.updateById);

// Rotas de pessoas

router.post("/pessoas", PessoasController.createValidation, PessoasController.create);
router.get("/pessoas/:id", PessoasController.getByIdValidation, PessoasController.getById);
router.delete("/pessoas/:id", PessoasController.deleteByIdValidation, PessoasController.deleteById);
router.put("/pessoas/:id", PessoasController.updateByIdValidation, PessoasController.updateById);

// Rotas de usuários
router.post("/usuarios", UsuariosController.createValidation, UsuariosController.create);
router.post("/usuarios/signin", UsuariosController.signinValidation, UsuariosController.signin);
router.get("/usuarios/:email", UsuariosController.getByEmailValidation, UsuariosController.getByEmail);

export { router };