import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { NavComponent } from '../../navs/nav/nav.component';
import { ContratosService } from '../../services/dom/contratos/contratos.service';


@Component({
  selector: 'app-formulario-nuevo-contrato',
  standalone: true,
  imports: [FormsModule, NavComponent, CommonModule],
  templateUrl: './formulario-nuevo-contrato.component.html',
  styleUrl: './formulario-nuevo-contrato.component.css'
})
export class FormularioNuevoContratoComponent {

  alertSkuNoValido = ''

  constructor( 
              private route: ActivatedRoute, 
              private router: Router,
              private contratoServices:ContratosService
              ){}

  


  onSubmit(form: NgForm) {
    alert('Opcion desabilitada')
    // this.contratoServices.addContrato(form.value).subscribe({
    //   next:(response =>{
    //     console.log(response)
    //   }),
    //   error:(error =>{
    //     if (error.status === 404) {
    //       this.alertSkuNoValido = 'El SKU proporcionado no es válido.';  // Asignar el mensaje de error
    //     } else {
    //       // Manejar otros tipos de errores si es necesario
    //       console.error('Ocurrió un error:', error);
    //     }
    //   })
    // })
   
  }



  
}
