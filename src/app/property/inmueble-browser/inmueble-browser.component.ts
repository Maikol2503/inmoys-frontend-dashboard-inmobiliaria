import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatTableModule } from '@angular/material/table';  // Importa MatTableModule
import { MatTableDataSource } from '@angular/material/table';  // Importa MatTableDataSource
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Propiedad } from '../../services/dom/properties/propiedadModel';
import { PropertiesService } from '../../services/dom/properties/properties.service';
import { Imagen } from '../../services/dom/properties/images/imagenModel';

@Component({
  selector: 'app-inmueble-browser',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterModule],  // Asegúrate de importar MatTableModule
  templateUrl: './inmueble-browser.component.html',
  styleUrls: ['./inmueble-browser.component.css'], // Asegúrate de usar styleUrls en lugar de styleUrl
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class InmuebleBrowserComponent implements OnInit {

  // displayedColumns: string[] = ['sku','nombre', 'apellido', 'documento', 'tipo','transaccion' ,'precio', 'ubicacion', 'disponibilidad', 'acciones' ];
  // dataSource = new MatTableDataSource<Propiedad>([]);
  tipoInmueble!: string;
  dataPropiedad:any
  dataPropertiesOriginal:any
  filteredProperties: Propiedad[] = [];
  private baseUrl: string = 'http://127.0.0.1:8000/images/';

  constructor(private PropertyService: PropertiesService, private route: ActivatedRoute, private location: Location,) {}

  ngOnInit(): void {    
   this.loadData()
  }


  loadData(){
    this.route.paramMap.subscribe(params => {
      this.tipoInmueble = params.get('tipoTransaccion') || 'todos-disponibles';
      // Lógica para manejar los diferentes tipos de inmuebles
      if (this.tipoInmueble === 'alquiler') {
        this.cargarInmueblesAlquilados();
        console.log(this.tipoInmueble)
      } else if (this.tipoInmueble === 'venta') {
        this.cargarInmueblesEnVenta();
        console.log(this.tipoInmueble)
      } else if (this.tipoInmueble === 'todos-disponibles') {
        this.cargarTodosLosInmueblesDisponibles();
        console.log(this.tipoInmueble)
      } else {
        this.cargarTodosLasPropiedades();
        console.log(this.tipoInmueble)
      }
    });

    
  }





  cargarTodosLosInmueblesDisponibles() {
    this.PropertyService.properties$.subscribe({
      next: (data: Propiedad[]) => {
        this.dataPropiedad = data;
        console.log(this.tipoInmueble)
      },
      error: (err) => {
        console.error('Error al obtener propiedades', err);
      }
    });
  }





  cargarInmueblesEnVenta() {
    this.PropertyService.get_properties_by_transaction('venta').subscribe({
      next: (data:Propiedad[]) =>{
        this.dataPropiedad = data;
        console.log(this.tipoInmueble)
      },
      error: (err) => {
        console.error('Error al obtener propiedades', err);
      }
    })
  }




  
  cargarInmueblesAlquilados() {
    this.PropertyService.get_properties_by_transaction('alquiler').subscribe({
      next: (data:Propiedad[]) =>{
        this.dataPropiedad = data;
      },
      error: (err) => {
        console.error('Error al obtener propiedades', err);
      }
    })
  }





  cargarTodosLasPropiedades() {
    this.PropertyService.get_properties().subscribe({
      next:(data:Propiedad[])=>{
        this.dataPropiedad = data;
        this.dataPropertiesOriginal = data;
        console.log(this.dataPropiedad)
      }
    })
  }



  editar(id: number): void {
    // Implementar la lógica para editar una propiedad
    console.log('Editar propiedad con ID:', id);
    // Puedes abrir un diálogo o redirigir a una página de edición
  }




  eliminar(id: number): void {
    // Confirmar eliminación
    if (confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) {
      this.PropertyService.deleteProperty(id)
    }
  }




  atras(){
    this.location.back();
  }





  onSearch(event: Event): void {
    
    let input = (event.target as HTMLInputElement).value.toLowerCase();
    if(input === ''){
      this.loadData()
    } else{
      // Filtrar propiedades basado en el input
      this.filteredProperties = this.dataPropertiesOriginal.filter((property: Propiedad) =>
         (property.sku?.toLowerCase().includes(input) || '')
      );
      console.log(this.filteredProperties)
      this.dataPropiedad = this.filteredProperties
    }

    
  }




  
  // Función para obtener la URL completa de la imagen
  getImageUrl(idProperty:any, imagen:Imagen): string {
    return `${this.baseUrl}${idProperty}/${imagen.image_name}`;
  }
}
