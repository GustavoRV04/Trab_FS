/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';    
import { validation } from "../../shared/middleware";
import { AppDataSource } from "../../data-source";
import { Cidade } from "../../entity/Cidade";
import { ILike } from "typeorm";

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
    })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    try {
        const cidadeRepo = AppDataSource.getRepository(Cidade);

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const filter = req.query.filter || "";
        const [cidades, total] = await cidadeRepo.findAndCount({
            where: filter
                ? { nome: ILike(`%${filter}%`) }
                : {},
            skip: (page - 1) * limit,
            take: limit,
        });

        res.setHeader("x-total-count", total);
        return res.status(StatusCodes.OK).json(cidades);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro ao buscar cidades');
    }
};