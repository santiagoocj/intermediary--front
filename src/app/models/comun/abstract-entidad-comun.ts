import { EstadoEntidad } from '../enum/estado-entidad-enum';
export class AbstractEntidadComun{
    versionEntidad: number;
    estado: EstadoEntidad;
    createAt: Date;
    updateAt: Date;
}