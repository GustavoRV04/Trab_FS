/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { AppDataSource } from "../../data-source";
import { Usuario } from "../../entity/Usuarios";

interface IBodyProps {
    email: string;
}

export const getByEmailValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email(),
    })),
}));

export const getByEmail = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    try {
        const { email } = req.body;
        const usuarioRepo = AppDataSource.getRepository(Usuario);

        const usuario = await usuarioRepo.findOneBy({ email: String(email) });
        if (!usuario) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Usuário não encontrado" });
        }

        return res.status(StatusCodes.OK).json(usuario);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Erro ao buscar usuário por e-mail");
    }
};