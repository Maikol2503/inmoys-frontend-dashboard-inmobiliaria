import { afterNextRender, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { User } from '../services/auth/user';
import { LoginService } from '../services/auth/login.service';
import { CommonModule } from '@angular/common';


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


// register Swiper custom elements
register();



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule,  NavmobileComponent, FormularioPublicarPropiedadComponent, RouterModule, BarraSuperiorComponent, NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})


export class InicioComponent implements OnInit{

  userLoginOn:boolean = false
  userData?:User
  propertiesData:Propiedad[] = [];
  private baseUrl: string = 'http://127.0.0.1:8000/images/';
  totalEnAlquilerDisponibles: number = 0;
  totalEnVentaDisponibles: number = 0;
  totalPropiedades: number = 0;
  
  constructor(private loginServe:LoginService, private cdr: ChangeDetectorRef, private PropertyService:PropertiesService){
    
  }


  ngOnInit(): void {    
    this.loginServe.getUserData().subscribe({
      next:(data)=>{
        // console.log(data)
      }
    });

    this.PropertyService.properties$.subscribe({
      next: (data: Propiedad[]) => {
        this.propertiesData = data.filter(propiedad => propiedad.disponibilidad === "disponible");
        this.contarPropiedadesDisponibles()
        console.log(this.propertiesData)
      },
      error: (err) => {
        console.error('Error al obtener propiedades', err);
      }
    });

    
  }


  contarPropiedadesDisponibles(): void {
    this.totalEnAlquilerDisponibles = this.propertiesData.filter(propiedad =>
      propiedad.transaccion === 'alquiler' && propiedad.disponibilidad === 'disponible'
    ).length;

    this.totalEnVentaDisponibles = this.propertiesData.filter(propiedad =>
      propiedad.transaccion === 'venta' && propiedad.disponibilidad === 'disponible'
    ).length;

    this.totalPropiedades = this.propertiesData.filter(propiedad => propiedad.disponibilidad === 'disponible'
    ).length;

  }



  

  // Función para obtener la URL completa de la imagen
  getImageUrl(idProperty:any, imagen:Imagen): string {
    return `${this.baseUrl}${idProperty}/${imagen.image_name}`;
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
