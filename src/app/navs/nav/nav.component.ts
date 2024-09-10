import { Component, OnInit } from '@angular/core';
// import { FormularioPublicarPropiedadComponent } from '../../formulario-publicar-propiedad/formulario-publicar-propiedad.component';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTh, faPlus, faWarehouse, faFileContract, faList } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../../services/auth/login.service';
// import { LoginService } from '../services/auth/login.service';



@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule, FontAwesomeModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  rutaActiva: string = '/inicio';
  userData = ''

  constructor(private router: Router, library: FaIconLibrary, private loginServe:LoginService) {
    library.addIcons(faTh, faFileContract, faList);
    library.addIcons(faPlus);
    // Suscribe a los eventos de navegación para rastrear la ruta activa
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.rutaActiva = event.url;
        // Obtiene la ruta activa actual
      }
    });
  }

  ngOnInit(): void {
    
    this.loginServe.getUserData().subscribe({
      next:(data)=>{
        this.userData = data
      }
    });
  }
}
