import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faWarehouse, faWaterLadder, faElevator, faDumbbell, faFan, faFire, faHouse, faTreeCity, faShirt } from '@fortawesome/free-solid-svg-icons';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Propiedad } from '../../../services/dom/properties/propiedadModel';
import { PropertiesService } from '../../../services/dom/properties/properties.service';

@Component({
  selector: 'app-form-editar-detalles-vivienda',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule,],
  templateUrl: './form-editar-detalles-vivienda.component.html',
  styleUrl: './form-editar-detalles-vivienda.component.css'
})
export class FormEditarDetallesViviendaComponent implements OnInit {
  @Input() data!:Propiedad;  // Esta propiedad recibirá el valor desde el padre
  @Output() detallesViviendaDataChange = new EventEmitter<string>();
 
// propertiesData!:Propiedad;
viviendaDataDetalles:any = {} ;


constructor(  private http:HttpClient, 
  private library: FaIconLibrary,
  private PropertyService:PropertiesService, 
  private route: ActivatedRoute, 
  private router: Router ) { 
    library.addIcons(faPlus, faWarehouse, faWaterLadder, faElevator, faDumbbell, faFan, faFire, faHouse, faTreeCity, faShirt );
  }

  ngOnInit(): void {
    this.viviendaDataDetalles = this.data.detalles
    this.detallesViviendaDataChange.emit(this.viviendaDataDetalles )
  }

  reiniciarDataCalefaccion(){
    if(this.viviendaDataDetalles.calefaccion == false){
      this.viviendaDataDetalles.combustibleCalefaccion = ''
      this.viviendaDataDetalles.sistemaCalefaccion = ''
    }
  }

  onFormChange(){
    this.reiniciarDataCalefaccion()
    this.detallesViviendaDataChange.emit(this.viviendaDataDetalles )
  }


}
