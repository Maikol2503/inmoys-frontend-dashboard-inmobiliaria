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
  selector: 'app-form-editar-detalles-oficina',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule,],
  templateUrl: './form-editar-detalles-oficina.component.html',
  styleUrl: './form-editar-detalles-oficina.component.css'
})
export class FormEditarDetallesOficinaComponent {

  @Input() data!:Propiedad;  // Esta propiedad recibirá el valor desde el padre
  @Output() detallesOficinaDataChange = new EventEmitter<string>();
 
// propertiesData!:Propiedad;
oficinaDataDetalles:any = {} ;


constructor(  private http:HttpClient, 
  private library: FaIconLibrary,
  private PropertyService:PropertiesService, 
  private route: ActivatedRoute, 
  private router: Router ) { 
    library.addIcons(faPlus, faWarehouse, faWaterLadder, faElevator, faDumbbell, faFan, faFire, faHouse, faTreeCity, faShirt );
  }

  ngOnInit(): void {
    this.oficinaDataDetalles = this.data.detalles
    this.detallesOficinaDataChange.emit(this.oficinaDataDetalles )
  }

  reiniciarDataCalefaccion(){
    if(this.oficinaDataDetalles.calefaccion == false){
      this.oficinaDataDetalles.combustibleCalefaccion = ''
      this.oficinaDataDetalles.sistemaCalefaccion = ''
    }
  }

  onFormChange(){
    this.reiniciarDataCalefaccion()
    this.detallesOficinaDataChange.emit(this.oficinaDataDetalles )
  }


}
