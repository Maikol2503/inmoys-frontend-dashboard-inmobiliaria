import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faWarehouse, faWaterLadder, faElevator, faDumbbell, faFan, faFire, faHouse, faTreeCity, faShirt } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormViviendaComponent } from './form-vivienda/form-vivienda.component';
import { CreateData } from './createData'; 
import { FormOficinaComponent } from './form-oficina/form-oficina.component';
import { NavComponent } from '../../navs/nav/nav.component';
import { PropertiesService } from '../../services/dom/properties/properties.service';
// import { faWarehouse  } from '@fortawesome/free-solid-svg-icons';


interface ImagePreview {
  id_image: any | null;
  image_name: string;
}

@Component({
  selector: 'app-formulario-publicar-propiedad',
  standalone: true,
  imports: [FormsModule, NavComponent, CommonModule, FontAwesomeModule, FormViviendaComponent, FormOficinaComponent],
  templateUrl: './formulario-publicar-propiedad.component.html',
  styleUrl: './formulario-publicar-propiedad.component.css'
})
export class FormularioPublicarPropiedadComponent {
  // Propiedad para almacenar las imágenes seleccionadas
  imagenes: File[] = [];
  imagePreviews: ImagePreview[] = [];
  createData = new CreateData()
  viviendaDataReceived: any;
  dataPropiedad:any = {}
  disponibilad: string = 'disponible'
  tipoPropiedad = ''
  totalImageSizeMB: number = 0
  
  constructor(private library: FaIconLibrary, 
              private http:HttpClient, 
              private PropertyService:PropertiesService,  
              private route: ActivatedRoute, 
              private router: Router ) {

                library.addIcons(faPlus, faWarehouse, faWaterLadder, faElevator, faDumbbell, faFan, faFire, faHouse, faTreeCity, faShirt );
              }

  // Convierte bytes a megabytes
  private bytesToMB(bytes: number): number {
    return bytes / (1024 * 1024);
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }


  actualizarDatosDetallesPropiedad(event: any) {
    this.viviendaDataReceived = event
    console.log(this.viviendaDataReceived)
  }

  // Maneja el envío del formulario
  async onSubmit(form: NgForm): Promise<void> {
    if (form.valid) {

      const base64Images = await Promise.all(
        this.imagenes.map(file => this.fileToBase64(file))
      );
      
      const dataGeneral = {
          nombre: form.value.nombre,
          apellido: form.value.apellido,
          documento: form.value.documento,
          correo: form.value.correo,
          telefono: form.value.telefono,
          tipo: this.tipoPropiedad,
          transaccion: form.value.transaccion,
          precio: form.value.precio,
          provincia: form.value.provincia,
          ciudad: form.value.ciudad,
          zona: form.value.zona,
          cp: form.value.cp,
          numeroCalle: form.value.numeroCalle,
          nombreCalle: form.value.nombreCalle,
          puerta: form.value.puerta || '',
          planta: form.value.planta || null,
          disponibilidad: this.disponibilad,
          // tamano: form.value.tamano,
          descripcion: form.value.descripcion,
          image: this.imageness(this.imagePreviews),
          
      };

      if (dataGeneral.tipo === 'vivienda'){
        const viviendaData = this.createData.vivienda(this.viviendaDataReceived)
        this.dataPropiedad = {...dataGeneral, 'detalles':viviendaData}
      } else if (dataGeneral.tipo === 'oficina'){
        const oficinaData = this.createData.oficina(this.viviendaDataReceived)
        this.dataPropiedad = {...dataGeneral, 'detalles':oficinaData}
      } else if (dataGeneral.tipo === 'habitacion'){
        const habitacionData = this.createData.habitacion(this.viviendaDataReceived)
        this.dataPropiedad = {...dataGeneral, 'detalles':habitacionData}
      } else if (dataGeneral.tipo === 'terreno'){
        const terrenoData = this.createData.terreno(this.viviendaDataReceived)
        this.dataPropiedad = {...dataGeneral, 'detalles':terrenoData}
      } else if (dataGeneral.tipo === 'edificio'){
        const edificioData = this.createData.edificio(this.viviendaDataReceived)
        this.dataPropiedad = {...dataGeneral, 'detalles':edificioData}
      } else if (dataGeneral.tipo === 'garage'){
        const garageData = this.createData.trastero(this.viviendaDataReceived)
        this.dataPropiedad = {...dataGeneral, 'detalles':garageData}
      } else if (dataGeneral.tipo === 'trastero'){
        const trasteroData = this.createData.trastero(this.viviendaDataReceived)
        this.dataPropiedad = {...dataGeneral, 'detalles':trasteroData}
      }

      this.PropertyService.addProperty(this.dataPropiedad).subscribe({
        next: () => {
          // Redirigir a la página de inicio
          this.router.navigate(['/inicio']); // Ajusta la ruta según tu configuración
        },
        error: (err) => {
          console.error('Error al actualizar la propiedad', err);
        }
      });
    }
  }


generateTempId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let tempId = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      tempId += characters[randomIndex];
    }
    return tempId;
}


  // Función para procesar las imágenes
imageness(data: ImagePreview[]): void {
  // Limpiar el array antes de agregar nuevos elementos
  const a:any = [];
  // Iterar sobre cada elemento en el array de datos
  data.forEach((element: ImagePreview) => {
    a.push({
      "id_image": element.id_image,
      "image_name": element.image_name
    }); // Agregar el nombre de la imagen al array 'a'
  });
  return a
}


onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files) {
      // Convertir los archivos seleccionados a un array
      const newFiles = Array.from(fileInput.files);
  
      // Añadir las nuevas imágenes a la lista existente de imágenes
      this.imagenes = [ ...newFiles];
  
      // Calcular el tamaño total de las imágenes
      this.totalImageSizeMB = this.imagenes.reduce((total, file) => total + file.size, 0);
      this.totalImageSizeMB = this.bytesToMB(this.totalImageSizeMB);
  
      // Previsualizar todas las imágenes
      this.imagenes.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Data = reader.result as string;
          const imagePreview: ImagePreview = {
            id_image: this.generateTempId(),  // Generar un ID temporal
            image_name: base64Data
          };
          this.imagePreviews.push(imagePreview);
        };
        reader.readAsDataURL(file);
      });
    }
  }


delete(id:any){
  this.imagePreviews = this.imagePreviews.filter(image => image.id_image !== id);
}


}
