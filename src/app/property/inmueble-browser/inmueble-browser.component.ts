import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatTableModule } from '@angular/material/table';  // Importa MatTableModule
import { MatTableDataSource } from '@angular/material/table';  // Importa MatTableDataSource
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Propiedad } from '../../services/dom/properties/propiedadModel';
import { PropertiesService } from '../../services/dom/properties/properties.service';
import { Imagen } from '../../services/dom/properties/images/imagenModel';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inmueble-browser',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterModule, FormsModule],  // Asegúrate de importar MatTableModule
  templateUrl: './inmueble-browser.component.html',
  styleUrls: ['./inmueble-browser.component.css'], // Asegúrate de usar styleUrls en lugar de styleUrl
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class InmuebleBrowserComponent implements OnInit {

  tipoInmueble!: string;
  dataPropiedad:any
  dataPropertiesOriginal:any
  newPropertiesData: any
  filteredProperties: Propiedad[] = [];
  private baseUrl: string = 'https://inmoys-backend-inmobiliaria-1.onrender.com/images/';
  private baseUrl2: string = 'https://inmoys-backend-inmobiliaria-1.onrender.com/images-for-web/';
  mainLoadingActive = true
  loadinNewPropertiesgActive = false
  page = 1
  limit = 5
  isLoading = false
  noMoreProperties = false
  modalToggleFilterActive = ''

  filters = {
    tipo: null,
    precioDesde:0,
    precioHasta:0,
    tamanoDesde:0,
    tamanoHasta:0,
    habitaciones: 0,
    transaccion: '',
    banos: 0,
    numeroExactoHabitaciones:false,
    numeroExactoBanos:false,
    zona: null,
    garaje: false,
    piscina: false,
    trastero: false,
    jardin: false,
    ascensor: false,
    gimnasio: false,
    aireAcondicionado: false,
    calefaccion: false,
    terraza: false,
    balcon: false,
    order: 'relevancia',
    estadoInmueble:'',
    limit:this.limit,
    offset:this.page
  };
  

  constructor(private PropertyService: PropertiesService, private route: ActivatedRoute, private location: Location,) {}

async ngOnInit(): Promise<void> {   
  this.route.queryParams.subscribe(params => {
    this.filters.transaccion = params['transaccion'] || '';
    this.applyFilter()
  });
}


async applyFilter(): Promise<void> {
  // Limpiar los filtros antes de enviarlos
  this.noMoreProperties = false
  this.filters.offset = 1
  this.dataPropiedad = []
  this.newPropertiesData = []
  this.mainLoadingActive = true
  const cleanFilters = this.cleanFilters(this.filters);
  await this.loadData(cleanFilters)
}



@HostListener('document:click', ['$event'])
clickOutside(event: MouseEvent) {
      const clickedElement = event.target as HTMLElement;
      const modalElements = document.getElementsByClassName('option'); // Seleccionar todos los modales
      let clickedInsideModal = false;
      
      // Verificar si el clic fue dentro de algún modal
      for (let i = 0; i < modalElements.length; i++) {
          if (modalElements[i].contains(clickedElement)) {
              clickedInsideModal = true;
              break;
          }
      }
  
      // Si no fue dentro de un modal, cerrar todos
      if (!clickedInsideModal) {
          this.closeToggleModal();
      }
}


// Escucha el evento de scroll en la ventana
@HostListener('window:scroll', [])
async onWindowScroll(): Promise<void>  {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
  
    if (scrollTop + clientHeight >= scrollHeight) {
      
      this.loadinNewPropertiesgActive = true
      // Verificar si ya estás cargando datos para evitar llamadas duplicadas
      if (this.isLoading || this.noMoreProperties) {
        this.loadinNewPropertiesgActive = false
        return;
      }
  
      this.isLoading = true; // Indicar que se está cargando más contenido
      this.filters.offset += 1;
      console.log(this.filters.offset)
      const filters = this.cleanFilters(this.filters)

      // const newPropertiesData = await firstValueFrom(this.PropertyService.get_properties(filters));

      // if (newPropertiesData.length === 0) {
      //   this.noMoreProperties = true; // No hay más propiedades para cargar
      //   console.log('No hay más propiedades disponibles');
      //   this.loadinNewPropertiesgActive = false
      // } else {
      //   this.dataPropiedad = [...this.dataPropiedad, ...newPropertiesData];
      //   console.log('Nuevas propiedades cargadas', newPropertiesData);
      //   this.loadinNewPropertiesgActive = false
      // }

      // this.isLoading = false; // Finalizar estado de carga
      // this.loadinNewPropertiesgActive = false

      this.PropertyService.get_properties(filters).subscribe({
        next: (data: Propiedad[]) => {
          this.newPropertiesData = data
          
          if (this.newPropertiesData.length === 0) {
            this.noMoreProperties = true; // No hay más propiedades para cargar
            console.log('No hay más propiedades disponibles');
            this.loadinNewPropertiesgActive = false
          } else {
            this.dataPropiedad = [...this.dataPropiedad, ...this.newPropertiesData];
            console.log('Nuevas propiedades cargadas', this.newPropertiesData);
            this.loadinNewPropertiesgActive = false
          }
        },
        error: (err) => {
          console.error('Error al obtener propiedades', err);
        },
        complete: () => {
          this.isLoading = false; // Finalizar estado de carga
          this.loadinNewPropertiesgActive = false
        }
      });
    }
  }

async checkLoadingState(): Promise<void> {
    if (this.dataPropiedad.length >= 0) {
        this.mainLoadingActive = false;
    } 
}

async loadData(filters:any) : Promise<void>{
  this.dataPropiedad = await firstValueFrom(this.PropertyService.get_properties(filters));
  this.dataPropertiesOriginal = this.dataPropiedad;
  this.checkLoadingState()
  console.log(this.dataPropiedad, 'dataPropiedad')
}


cleanFilters(filters: any): any {
  const cleanedFilters: any = {};
  // Iterar sobre cada clave en los filtros
  for (const key in filters) {
   
    if (filters[key] !== null && filters[key] !== undefined ) {
      cleanedFilters[key] = filters[key]; // Agregar solo si no es null o undefined
    }
  }
  return cleanedFilters; // Retornar el objeto limpio
}

   
editar(id: number): void {
    console.log('Editar propiedad con ID:', id);
}

async eliminar(id: number): Promise<void> {
    if (confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) {
      this.PropertyService.deleteProperty(id)
    }
}

atras(){
  this.location.back();
}

// onSearch(event: Event): void {
//   let input = (event.target as HTMLInputElement).value.toLowerCase();
//   if(input === ''){
//     this.loadData()
//   } else{
//     // Filtrar propiedades basado en el input
//     this.filteredProperties = this.dataPropertiesOriginal.filter((property: Propiedad) =>
//         (property.sku?.toLowerCase().includes(input) || '')
//     );
//     console.log(this.filteredProperties)
//     this.dataPropiedad = this.filteredProperties
//   }
// }

// Función para obtener la URL completa de la imagen
getImageUrl(skuProperty:any, imagen:Imagen): string {
  return `${this.baseUrl}${skuProperty}/${imagen.image}`;
}

getImageUrl2(directory:string, imagen:string): string {
  return `${this.baseUrl2}${directory}/${imagen}`;
}

isMoreThanOneBathroom(property: any): boolean {
  const bano = Number(property?.detalles?.banos);
  return !isNaN(bano) && bano > 1;
}

resetFilters() {
  this.filters = {
    tipo: null,
    precioDesde: 0,
    precioHasta: 0,
    tamanoDesde: 0,
    tamanoHasta: 0,
    habitaciones: 0,
    transaccion: 'venta',
    banos: 0,
    numeroExactoHabitaciones: false,
    numeroExactoBanos: false,
    zona: null,
    garaje: false,
    piscina: false,
    trastero: false,
    jardin: false,
    ascensor: false,
    gimnasio: false,
    aireAcondicionado: false,
    calefaccion: false,
    terraza: false,
    balcon: false,
    order: 'relevancia',
    estadoInmueble:'',
    limit:this.limit,
    offset:this.page
  };
  this.applyFilter()
}


applyAdditionalFilters(){
  this.applyFilter()
    setTimeout(() => {
      this.closeToggleModal();
  }, 10);
}


closeToggleModal(event?: MouseEvent) {
  // Verifica si el clic proviene de dentro del modal y no lo cierra
  const targetElement = event?.target as HTMLElement;
  
  if (targetElement?.closest('.modal') || targetElement?.closest('.modalPrecio') || targetElement?.closest('.modalTamano') || targetElement?.closest('.mas')) {
      return;  // No cierra el modal si el clic fue dentro del mismo
  }

  this.modalToggleFilterActive = '';  // Cierra el modal si el clic fue fuera de él
}


applyFilterTipologia(tipo:any){
  this.filters.tipo = tipo
  this.applyFilter()
  setTimeout(() => {
    this.closeToggleModal();
}, 10); // Espera de 100ms antes de cerrar el modal.
  
}


applyFilterTrasaccion(trasaccion:any){
this.filters.transaccion = trasaccion
  this.applyFilter()
  setTimeout(() => {
    this.closeToggleModal();
}, 10); // Espera de 100ms antes de cerrar el modal.
}


deleteFilterTipologia(event: Event){
event.stopPropagation(); // Detiene la propagación del evento de clic.
this.filters.tipo = null;   // Elimina el filtro de tipología.
this.applyFilter(); 
}



toggleModal(filter: string, event: MouseEvent) {
  // Si el modal activo es el mismo que el clicado, lo cierra
  if (this.modalToggleFilterActive === filter) {
      this.closeToggleModal(event);  // Pasa el evento al cerrar el modal
  } else {
      this.modalToggleFilterActive = filter;  // Abre el nuevo modal
  }
}


numberRoomSelected(numberSelected:number){
  this.filters.habitaciones = numberSelected
  this.applyFilter()
}

numbeBathroomsSelected(numberSelected:number){
  this.filters.banos = numberSelected
  this.applyFilter()
}

}
