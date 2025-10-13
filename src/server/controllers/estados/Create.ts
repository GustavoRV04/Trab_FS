/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { AppDataSource } from "../../data-source";
import { Estado } from "../../entity/Estado";

interface IEstado {
    nome: string;
    sigla: string;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IEstado>(yup.object().shape({
        nome: yup.string().required().min(3).max(30),
        sigla: yup.string().required().length(2),
    })),
}));

export const create = async (req: Request<{}, {}, IEstado>, res: Response) => {
    try {
        const { nome, sigla } = req.body;
        const estadoRepo = AppDataSource.getRepository(Estado);

        // Verifica se já existe um estado com a mesma sigla
        const estadoExistente = await estadoRepo.findOneBy({ sigla });
        if (estadoExistente) {
            return res.status(StatusCodes.CONFLICT).json({ error: "Sigla já cadastrada" });
        }

        const novoEstado = estadoRepo.create({ nome, sigla });
        await estadoRepo.save(novoEstado);
        return res.status(StatusCodes.CREATED).json(novoEstado);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro ao criar estado');
    }
};