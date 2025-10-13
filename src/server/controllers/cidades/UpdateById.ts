/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';    
import { validation } from "../../shared/middleware";
import { AppDataSource } from "../../data-source";
import { Cidade } from "../../entity/Cidade";
import { Estado } from "../../entity/Estado";

interface IParamsProps {
    id?: number;
}

interface IBodyProps {
    nome: string;
    estado_id: number;
}

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3),
        estado_id: yup.number().required().integer().moreThan(0),
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().required().integer().moreThan(0),
    })),
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
    try {
        const { id } = req.params;
        const { nome, estado_id } = req.body;
        const cidadeRepo = AppDataSource.getRepository(Cidade);
        const estadoRepo = AppDataSource.getRepository(Estado);

        const cidade = await cidadeRepo.findOneBy({ id: Number(id) });
        if (!cidade) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Cidade não encontrada" });
        }

        const estado = await estadoRepo.findOneBy({ id: estado_id });
        if (!estado) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Estado não encontrado" });
        }

        cidade.nome = nome;
        cidade.estado = estado;
        await cidadeRepo.save(cidade);

        return res.status(StatusCodes.OK).json(cidade);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro ao atualizar cidade');
    }
};