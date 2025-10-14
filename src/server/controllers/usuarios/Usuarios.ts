/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { AppDataSource } from "../../data-source";
import { Usuario } from "../../entity/Usuarios";
import { PasswordCrypto } from "../../shared/services/PasswordCrypto";

interface IUsuario {
    nome: string;
    email: string;
    senha: string;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IUsuario>(yup.object().shape({
        nome: yup.string().required().min(3).max(50),
        email: yup.string().required().email().max(100),
        senha: yup.string().required().min(6).max(100),
    })),
}));

export const create = async (req: Request<{}, {}, IUsuario>, res: Response) => {
    try {
        const { nome, email, senha } = req.body;
        const usuarioRepo = AppDataSource.getRepository(Usuario);

        const usuarioExistente = await usuarioRepo.findOneBy({ email });
        if (usuarioExistente) {
            return res.status(StatusCodes.CONFLICT).json({ error: "E-mail já cadastrado" });
        }

        const senhaCriptografada = await PasswordCrypto.hashPassword(senha);

        const novoUsuario = usuarioRepo.create({ nome, email, senha: senhaCriptografada });
        await usuarioRepo.save(novoUsuario);

        return res.status(StatusCodes.CREATED).json(novoUsuario);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Erro ao criar usuário");
    }
};