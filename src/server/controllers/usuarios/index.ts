import * as create from './Usuarios';
import * as getById from './GetByEmail';
import * as signIn from './Signin';


export const UsuariosController = {
    ...create,
    ...getById,
    ...signIn,

};