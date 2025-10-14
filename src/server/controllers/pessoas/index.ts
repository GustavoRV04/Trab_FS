import * as create from './Create';
import * as deleteById  from './Delete';
import * as getById  from './GetById';
import * as updateById  from './UpdateById';

export const PessoasController = {
    ...create,
    ...deleteById,
    ...getById,
    ...updateById,

};