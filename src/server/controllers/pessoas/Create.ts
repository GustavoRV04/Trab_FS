/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { AppDataSource } from "../../data-source";
import { Pessoa } from "../../entity/Pessoa";
import { Cidade } from "../../entity/Cidade";


interface IPessoa {
    nome: string;
    cidade_id: number;
    estado_id: number;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IPessoa>(yup.object().shape({
        nome: yup.string().required().min(3).max(50),
        cidade_id: yup.number().required().integer().moreThan(0),
        estado_id: yup.number().required().integer().moreThan(0),
    })),
}));

export const create = async (req: Request<{}, {}, { nome: string; cidade_id: number }>, res: Response) => {
    try {
        const { nome, cidade_id } = req.body;
        const pessoaRepo = AppDataSource.getRepository(Pessoa);
        const cidadeRepo = AppDataSource.getRepository(Cidade);

        const cidade = await cidadeRepo.findOne({
            where: { id: cidade_id },
            relations: ["estado"]
        });
        if (!cidade) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Cidade não encontrada" });
        }

        const novaPessoa = pessoaRepo.create({ nome, cidade });
        await pessoaRepo.save(novaPessoa);

        return res.status(StatusCodes.CREATED).json(novaPessoa);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro ao criar pessoa');
    }
};