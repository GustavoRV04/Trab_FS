/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { AppDataSource } from "../../data-source";
import { Estado } from "../../entity/Estado";

interface IParamsProps {
    id?: number;
}

interface IBodyProps {
    nome: string;
    sigla: string;
}

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3).max(30),
        sigla: yup.string().required().length(2),
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().required().integer().moreThan(0),
    })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
    try {
        const { id } = req.params;
        const { nome, sigla } = req.body;
        const estadoRepo = AppDataSource.getRepository(Estado);

        const estado = await estadoRepo.findOneBy({ id: Number(id) });
        if (!estado) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Estado não encontrado" });
        }

        await estadoRepo.update({ id: Number(id) }, { nome, sigla });
        const estadoAtualizado = await estadoRepo.findOneBy({ id: Number(id) });

        return res.status(StatusCodes.OK).json(estadoAtualizado);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro ao atualizar estado');
    }
};