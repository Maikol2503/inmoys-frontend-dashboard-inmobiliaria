import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-form-oficina',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './form-oficina.component.html',
  styleUrl: './form-oficina.component.css'
})
export class FormOficinaComponent {

  constructor(private library: FaIconLibrary, ) {
    // library.addIcons();
}


// Este es el objeto que contiene los datos del formulario
@Output() oficinaDataChange = new EventEmitter<any>();

oficinaData = {
  orientacion: '',
  banos: '',
  planta: '',
  anoConstruccion: '',
  estadoInmueble: '',
  consumo: '',
  emisiones: '',
  tamano: '',
  ascensor: false,
  garaje: false,
  gimnasio: false,
  piscina:false,
  aire: false,
  calefaccion: false,
  sistemaCalefaccion: '',
  combustibleCalefaccion: '',
  certificadoEnergetico:'',
};

reiniciarDataCalefaccion(){
  if(this.oficinaData.calefaccion == false){
    this.oficinaData.combustibleCalefaccion = ''
    this.oficinaData.sistemaCalefaccion = ''
  }
}

onFormChange() {
  this.reiniciarDataCalefaccion()
  this.oficinaDataChange.emit(this.oficinaData);
}

}
