/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { AppDataSource } from "../../data-source";
import { Usuario } from "../../entity/Usuarios";
import { PasswordCrypto } from "../../shared/services/PasswordCrypto";
import { JWTService } from "../../shared/services/JWTService";

interface ISignin {
    email: string;
    senha: string;
}

export const signinValidation = validation((getSchema) => ({
    body: getSchema<ISignin>(yup.object().shape({
        email: yup.string().required().email(),
        senha: yup.string().required(),
    })),
}));

export const signin = async (req: Request<{}, {}, ISignin>, res: Response) => {
    try {
        const { email, senha } = req.body;
        const usuarioRepo = AppDataSource.getRepository(Usuario);

        const usuario = await usuarioRepo.findOneBy({ email });
        if (!usuario) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ mensagem: "E-mail ou senha inválidos" });
        }

        const senhaValida = await PasswordCrypto.verifyPassword(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ mensagem: "E-mail ou senha inválidos" });
        }

        // Gera o token JWT
        const accessToken = JWTService.sign({ uid: usuario.id });
        if (accessToken === "JWT_SECRET_NOT_FOUND") {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ mensagem: "Erro interno de autenticação" });
        }

        return res.status(StatusCodes.OK).json({
            mensagem: "Autenticação realizada com sucesso",
            accessToken,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Erro ao autenticar usuário");
    }
};