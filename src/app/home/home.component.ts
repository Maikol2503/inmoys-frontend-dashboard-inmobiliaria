import { afterNextRender, AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { User } from '../services/auth/user';
import { LoginService } from '../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { RouterModule, Routes } from '@angular/router';

import { PropertiesService } from '../services/dom/properties/properties.service';
import Splide from '@splidejs/splide';


// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { Propiedad } from '../services/dom/properties/propiedadModel';
import { Imagen } from '../services/dom/properties/images/imagenModel';
import { NavComponent } from '../navs/nav/nav.component';
import { BarraSuperiorComponent } from '../navs/barra-superior/barra-superior.component';
import { NavmobileComponent } from '../navs/navmobile/navmobile.component';
import { FormularioPublicarPropiedadComponent } from '../property/formulario-publicar-propiedad/formulario-publicar-propiedad.component';
import { firstValueFrom } from 'rxjs';


// register Swiper custom elements
register();



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule,  NavmobileComponent, FormularioPublicarPropiedadComponent, RouterModule, BarraSuperiorComponent, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})


export class InicioComponent implements OnInit{

  userLoginOn:boolean = false
  userData?:User
  propertiesData:Propiedad[] = [];
  propertiesDataCopy:Propiedad[] = [];
  propertiesDataFinal:Propiedad[] = [];
  private baseUrl: string = 'http://127.0.0.1:8000/images/';
  private baseUrl2: string = 'http://127.0.0.1:8000/images-for-web/';
  totalEnAlquilerDisponibles: number = 0;
  totalEnVentaDisponibles: number = 0;
  totalPropiedades: number = 0;
  mainLoadingActive = true
  // loadinNewPropertiesgActive = false
  page = 1
  limit = 6
  isLoading = false
  // noMoreProperties = false
  
  constructor(private loginServe:LoginService, private cdr: ChangeDetectorRef, private PropertyService:PropertiesService){
    
  }

async getUserData(): Promise<void>{
    this.loginServe.getUserData().subscribe({
      next:(data)=>{
        // console.log(data)
      }
    });
  }

async ngOnInit(): Promise<void> {    
    await  this.getUserData();
    await this.getProperties();
    await this.contarPropiedadesDisponibles();
    // si ya llegaron los datos desactivo el loading
    this.checkLoadingState()
 }

checkLoadingState(): void {
  if (this.propertiesData.length > 0) {
      this.mainLoadingActive = false;
  }
}

async getProperties(): Promise<void> {
    try {
        const data = await firstValueFrom(this.PropertyService.get_properties_disponibles(this.page, this.limit));
        this.propertiesData = data.filter(propiedad => propiedad.disponibilidad === "disponible");
        
    } catch (err) {
        console.error('Error al obtener propiedades', err);
    }
}

getImageUrl2(directory:string, imagen:string): string {
  return `${this.baseUrl2}${directory}/${imagen}`;
}


isMoreThanOneBathroom(property: any): boolean {
  const bano = Number(property?.detalles?.banos);
  console.log(bano) 
  return !isNaN(bano) && bano > 1;
}

// // Escucha el evento de scroll en la ventana
// @HostListener('window:scroll', [])
// onWindowScroll(): void {
//     const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//     const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
//     const clientHeight = document.documentElement.clientHeight || window.innerHeight;
  
//     if (scrollTop + clientHeight >= scrollHeight) {
      
//       this.loadinNewPropertiesgActive = true
//       // Verificar si ya estás cargando datos para evitar llamadas duplicadas
//       if (this.isLoading || this.noMoreProperties) {
//         this.loadinNewPropertiesgActive = false
//         return;
//       }
  
//       this.isLoading = true; // Indicar que se está cargando más contenido
//       this.page += 1;
  
//       this.PropertyService.get_properties_disponibles(this.page, this.limit).subscribe({
//         next: (data: Propiedad[]) => {
//           const newPropertiesData = data.filter(propiedad => propiedad.disponibilidad === "disponible");
  
//           if (newPropertiesData.length === 0) {
//             this.noMoreProperties = true; // No hay más propiedades para cargar
//             console.log('No hay más propiedades disponibles');
//             this.loadinNewPropertiesgActive = false
//           } else {
//             this.propertiesData = [...this.propertiesData, ...newPropertiesData];
//             console.log('Nuevas propiedades cargadas', newPropertiesData);
//             this.loadinNewPropertiesgActive = false
//           }
//         },
//         error: (err) => {
//           console.error('Error al obtener propiedades', err);
//         },
//         complete: () => {
//           this.isLoading = false; // Finalizar estado de carga
//           this.loadinNewPropertiesgActive = false
//         }
//       });
//     }
//   }


 async contarPropiedadesDisponibles(): Promise<void>{
    this.PropertyService.properties_count().subscribe({
      next:(data:any)=>{
        this.totalEnAlquilerDisponibles = data['total_properties_alquiler_disponibles']
        this.totalEnVentaDisponibles = data['total_properties_venta_disponibles']
        this.totalPropiedades = data['total_properties_disponibles']
      }
    })
  }



  

  // Función para obtener la URL completa de la imagen
  getImageUrl(skuProperty:any, imagen:Imagen): string {
    return `${this.baseUrl}${skuProperty}/${imagen.image}`;
  }



  delete(id:any){
    // Desplegar la alerta de confirmación
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta propiedad?');

    if(confirmDelete){
      this.propertiesData = this.propertiesData.filter(property => property.id_property !== id);
      this.PropertyService.deleteProperty(id)
    }
    
  }


  logout(){
      this.loginServe.logout()
      this.loginServe.currenUserLoginOn.next(false)
  }



  //  ngOnDestroy(): void {
  //  this.loginServe.currenUserData.unsubscribe()
  //  this.loginServe.currenUserLoginOn.unsubscribe()
  // }
}



// @HostListener('window:scroll', [])
// onWindowScroll(): void {
//   const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//   const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
//   const clientHeight = document.documentElement.clientHeight || window.innerHeight;

//   if (scrollTop + clientHeight >= scrollHeight) {
//     console.log('Has llegado al final del scroll');
//     this.page = this.page + 1
    
//     this.PropertyService.get_properties_disponibles(this.page, this.limit).subscribe({
//       next: (data: Propiedad[]) => {
        
//         let newPropertiesData = data.filter(propiedad => propiedad.disponibilidad === "disponible");
//         this.propertiesData = [...newPropertiesData, ...this.propertiesData]
//         console.log(this.propertiesData)
//       },
//       error: (err) => {
//         console.error('Error al obtener propiedades', err);
//       }
//     });
//   }
// }