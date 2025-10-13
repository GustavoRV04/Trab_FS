/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';    
import { validation } from "../../shared/middleware";
import { AppDataSource } from "../../data-source";
import { Cidade } from "../../entity/Cidade";

interface IParamsProps {
    id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().required().integer().moreThan(0),
    })),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {
    try {
        const { id } = req.params;
        const cidadeRepo = AppDataSource.getRepository(Cidade);
        const cidade = await cidadeRepo.findOneBy({ id: Number(id) });

        if (!cidade) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Cidade não encontrada" });
        }

        return res.status(StatusCodes.OK).json(cidade);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro ao buscar cidade');
    }
};