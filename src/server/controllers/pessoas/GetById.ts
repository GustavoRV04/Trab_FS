import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { AppDataSource } from "../../data-source";
import { Pessoa } from "../../entity/Pessoa";

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
        const pessoaRepo = AppDataSource.getRepository(Pessoa);
        const pessoa = await pessoaRepo.findOne({
            where: { id: Number(id) },
            relations: ["cidade", "cidade.estado"]
        });

        if (!pessoa) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Pessoa não encontrada" });
        }

        return res.status(StatusCodes.OK).json(pessoa);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro ao buscar pessoa');
    }
};