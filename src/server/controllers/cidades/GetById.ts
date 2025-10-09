/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';    
import { validation } from "../../shared/middleware";

interface IParamsProps {
    id?: number;
}


export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps> (yup.object().shape({
    id: yup.number().required().integer().moreThan(0),
    })),
}));



// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const getById = async (req: Request<IParamsProps>, res: Response) => {
    console.log(req.params);


    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('NÃO IMPLEMENTADO!');
};