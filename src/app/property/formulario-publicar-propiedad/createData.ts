export class CreateData {

    vivienda(data:any){
        const dict = {
            habitaciones: data.habitaciones,
            banos: data.banos,
            orientacion: data.orientacion,
            tamano: data.tamano,
            anoConstruccion: data.anoConstruccion,
            estadoInmueble: data.estadoInmueble,
            consumo: data.consumo,
            emisiones: data.emisiones,
            combustibleCalefaccion: data.combustibleCalefaccion,
            sistemaCalefaccion: data.sistemaCalefaccion,
            ascensor: data.ascensor,
            piscina: data.piscina,
            balcon: data.balcon,
            terraza: data.terraza,
            jardin: data.jardin,
            armarioEmpotrado: data.armarioEmpotrado,
            trastero: data.trastero,
            garaje: data.garaje,
            gimnasio: data.gimnasio,
            aire: data.aire,
            calefaccion: data.calefaccion,
        }
        return dict
    }



    oficina(data:any){
        const dict = {
            banos: data.banos,
            orientacion: data.orientacion,
            tamano: data.tamano,
            anoConstruccion: data.anoConstruccion,
            estadoInmueble: data.estadoInmueble,
            consumo: data.consumo,
            emisiones: data.emisiones,
            combustibleCalefaccion: data.combustibleCalefaccion,
            sistemaCalefaccion: data.sistemaCalefaccion,
            ascensor: data.ascensor,
            garaje: data.garaje,
            gimnasio: data.gimnasio,
            aire: data.aire,
            calefaccion: data.calefaccion,
            certificadoEnergetico: data.certificadoEnergetico,
        }
        return dict
    }




    terreno(data:any){
        return {}
    }

    habitacion(data:any){
        return {}
    }

    edificio(data:any){
        return {}
    }


    garage(data:any){
        return {}
    }

    trastero(data:any){
        return {}
    }





  }