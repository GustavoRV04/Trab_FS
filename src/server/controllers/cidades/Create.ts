/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';    
import { validation } from "../../shared/middleware";
import { AppDataSource } from "../../data-source";
import { Cidade } from "../../entity/Cidade";
import { Estado } from "../../entity/Estado";

interface ICidade {
    nome: string;
    estado_id: number;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<ICidade>(yup.object().shape({
        nome: yup.string().required().min(3).max(30),
        estado_id: yup.number().required().integer().moreThan(0),
    })),
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
    try {
        const { nome, estado_id } = req.body;
        const cidadeRepo = AppDataSource.getRepository(Cidade);
        const estadoRepo = AppDataSource.getRepository(Estado);

        const estado = await estadoRepo.findOneBy({ id: estado_id });
        if (!estado) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Estado não encontrado" });
        }

        const novaCidade = cidadeRepo.create({ nome, estado });
        await cidadeRepo.save(novaCidade);
        return res.status(StatusCodes.CREATED).json(novaCidade);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro ao criar cidade');
    }
};