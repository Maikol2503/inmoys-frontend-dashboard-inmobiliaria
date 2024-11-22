import { Imagen } from "./images/imagenModel";

export interface Propiedad {
    id_property?: number;
    sku?:string
    destacado:string
    fecha_creacion?:string;
    titulo: string;
    tipo: string;
    descripcion: string;
    precio: number;
    transaccion:string;
    cliente_id: number;
    // nombre:string;
    // apellido:string;
    // correo:string;
    // documento:string;
    // telefono:string;
    provincia:string,
    ciudad:string,
    zona:string,
    cp:number,
    puerta:string,
    numeroCalle:number,
    nombreCalle:string,
    planta:number,
    disponibilidad: string;
    detalles:any
    image: Imagen[];
}