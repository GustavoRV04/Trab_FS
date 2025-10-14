/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { AppDataSource } from "../../data-source";
import { Pessoa } from "../../entity/Pessoa";
import { Cidade } from "../../entity/Cidade";


interface IParamsProps {
    id?: number;
}

interface IBodyProps {
    nome: string;
    cidade_id: number;
    estado_id: number;
}

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        nome: yup.string().required().min(3).max(50),
        cidade_id: yup.number().required().integer().moreThan(0),
        estado_id: yup.number().required().integer().moreThan(0),
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().required().integer().moreThan(0),
    })),
}));

export const updateById = async (req: Request<{ id: string }, {}, { nome: string; cidade_id: number }>,res: Response) => {
    try {
        const id = Number(req.params.id);
        const { nome, cidade_id } = req.body;
        const pessoaRepo = AppDataSource.getRepository(Pessoa);
        const cidadeRepo = AppDataSource.getRepository(Cidade);

        const pessoa = await pessoaRepo.findOneBy({ id: Number(id) });
        if (!pessoa) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Pessoa não encontrada" });
        }

        const cidade = await cidadeRepo.findOne({
            where: { id: cidade_id },
            relations: ["estado"]
        });
        if (!cidade) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Cidade não encontrada" });
        }

        pessoa.nome = nome;
        pessoa.cidade = cidade;
        await pessoaRepo.save(pessoa);

        return res.status(StatusCodes.OK).json(pessoa);
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro ao atualizar pessoa');
    }
};