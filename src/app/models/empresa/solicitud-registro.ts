import { RegistroEmpresa } from './registro-empresa';
import { RepresentanteLegal } from './representante-legal';
import { EstadoSolicitudEnum } from '../enum/estado-solicitud-enum';
export class SolicitudRegistro{
    id:number;
    nombre: string;
    estado: EstadoSolicitudEnum;
    registroDTO: RegistroEmpresa;
    representanteLegalDTO: RepresentanteLegal;
}