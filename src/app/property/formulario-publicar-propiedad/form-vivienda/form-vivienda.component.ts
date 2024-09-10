import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faWarehouse, faWaterLadder, faElevator, faDumbbell, faFan, faFire, faHouse, faTreeCity, faShirt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-vivienda',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './form-vivienda.component.html',
  styleUrl: './form-vivienda.component.css'
})
export class FormViviendaComponent {

  // Aquí defines el evento que emitirá los datos
  
  piscina: boolean = false;
  trastero: boolean = false;
  garaje: boolean = false;
  ascensor: boolean = false;
  gimnasio: boolean = false;
  aire:boolean = false;
  calefaccion: boolean = false;
  balcon: boolean = false;
  terraza: boolean = false;
  jardin: boolean = false;
  armarioEmpotrado: boolean = false;

  constructor(private library: FaIconLibrary, ) {
      library.addIcons(faPlus, faWarehouse, faWaterLadder, faElevator, faDumbbell, faFan, faFire, faHouse, faTreeCity, faShirt );
  }

  // Este es el objeto que contiene los datos del formulario
  @Output() viviendaDataChange = new EventEmitter<any>();

  viviendaData = {
    orientacion: '',
    habitaciones: '',
    tamano: '',
    banos: '',
    planta: '',
    anoConstruccion: '',
    estadoInmueble: '',
    consumo: '',
    emisiones: '',
    ascensor: false,
    piscina: false,
    trastero: false,
    garaje: false,
    gimnasio: false,
    aire: false,
    calefaccion: false,
    balcon: false,
    terraza: false,
    jardin: false,
    armarioEmpotrado: false,
    sistemaCalefaccion: '',
    combustibleCalefaccion: ''
  };

  reiniciarDataCalefaccion(){
    if(this.viviendaData.calefaccion == false){
      this.viviendaData.combustibleCalefaccion = ''
      this.viviendaData.sistemaCalefaccion = ''
    }
  }

  onFormChange() {
    this.reiniciarDataCalefaccion()
    this.viviendaDataChange.emit(this.viviendaData);
  }

  

  

}
