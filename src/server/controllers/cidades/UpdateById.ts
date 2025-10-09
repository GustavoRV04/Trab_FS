/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';    
import { validation } from "../../shared/middleware";

interface IParamsProps {
    id?: number;
}

interface IBodyProps {
    nome: string;
}


export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps> (yup.object().shape({
    nome: yup.string().required().min(3),
    })),
    params: getSchema<IParamsProps> (yup.object().shape({
    id: yup.number().required().integer().moreThan(0),
    })),
}));



// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
    console.log(req.params);
    console.log(req.body);


    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('NÃO IMPLEMENTADO!');
};