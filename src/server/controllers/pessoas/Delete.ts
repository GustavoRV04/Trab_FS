import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { AppDataSource } from "../../data-source";
import { Pessoa } from "../../entity/Pessoa";

interface IParamsProps {
    id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().required().integer().moreThan(0),
    })),
}));

export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
    try {
        const { id } = req.params;
        const pessoaRepo = AppDataSource.getRepository(Pessoa);

        const pessoa = await pessoaRepo.findOneBy({ id: Number(id) });
        if (!pessoa) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Pessoa não encontrada" });
        }

        await pessoaRepo.remove(pessoa);
        return res.status(StatusCodes.NO_CONTENT).send('Pessoa deletada com sucesso');
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Erro ao deletar pessoa');
    }
};