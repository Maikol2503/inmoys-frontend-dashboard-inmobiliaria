import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { faPlus, faWarehouse, faWaterLadder, faElevator, faDumbbell, faFan, faFire, faHouse, faTreeCity, faShirt } from '@fortawesome/free-solid-svg-icons';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormEditarDetallesViviendaComponent } from './form-editar-detalles-vivienda/form-editar-detalles-vivienda.component';
import { FormEditarDetallesOficinaComponent } from './form-editar-detalles-oficina/form-editar-detalles-oficina.component';
import { NavComponent } from '../../navs/nav/nav.component';
import { Propiedad } from '../../services/dom/properties/propiedadModel';
import { PropertiesService } from '../../services/dom/properties/properties.service';




interface ImagePreview {
  id: any | null;
  image: string;
}

@Component({
  selector: 'app-formulario-editar-propiedad',
  standalone: true,
  imports: [FormsModule, NavComponent, CommonModule, FontAwesomeModule, FormEditarDetallesViviendaComponent, FormEditarDetallesOficinaComponent],
  templateUrl: './formulario-editar-propiedad.component.html',
  styleUrl: './formulario-editar-propiedad.component.css'
})
export class FormularioEditarPropiedadComponent implements OnInit {


  
// propertiesData!:Propiedad;
propertiesData: Propiedad = {} as Propiedad;
imagenesNuevasCargadas : File[] = [];
property_sku = ''
imagePreviews: ImagePreview[] = [];
disponibilidad!:string
destacado: boolean = false;
piscina: boolean = false;
trastero: boolean = false;
garaje: boolean = false;
ascensor: boolean = false;
gimnasio: boolean = false;
aire: boolean = false;
calefaccion: boolean= false;
totalImageSizeMB: number = 0
propertyId!:number
imagenesActuales!:any
private baseUrl: string = 'http://127.0.0.1:8000/images/';
mensajeDelPadre: any;

detallesVivienda:any;

constructor(  private http:HttpClient, 
              private location: Location,
              private library: FaIconLibrary,
              private PropertyService:PropertiesService, 
              private route: ActivatedRoute, 
              private router: Router ) { 
                library.addIcons(faPlus, faWarehouse, faWaterLadder, faElevator, faDumbbell, faFan, faFire, faHouse, faTreeCity, faShirt );
              }


ngOnInit(): void {
  
  // Extraer el parámetro 'id' de la URL
  this.propertyId = Number(this.route.snapshot.paramMap.get('id')!);

  // Suscribirse a la lista de propiedades
  this.PropertyService.get_propertie(this.propertyId).subscribe({
    next: (data:any) => {
      const id = Number(this.propertyId); 
      this.propertiesData = data;
      this.property_sku = data.sku
      // Asegúrate de que `this.propertiesData.image` esté definido
      if (this.propertiesData && this.propertiesData.image) {
        this.imagePreviews = this.propertiesData.image.map(img => {
          return {
            id: img.id,  // Asegúrate de que `img.id` esté disponible en tu API
            image: `${img.image}`
          };
        });
      }
    },
    error: (err) => {
      console.error('Error al obtener propiedades', err);
    }
  });
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




detallesDataRecivied(event:any){
  this.detallesVivienda = event
}



// Maneja el envío del formulario
async onSubmit(form: NgForm): Promise<void> {
  if (form.valid) {
    try {
      const base64Images = await Promise.all(
        this.imagenesNuevasCargadas .map(file => this.fileToBase64(file))
      );

      const postData = {
        destacado: form.value.destacado || false,
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        documento: form.value.documento,
        correo: form.value.correo,
        telefono: form.value.telefono,
        descripcion: form.value.descripcion,
        precio: form.value.precio,
        tipo: this.propertiesData.tipo,
        transaccion: form.value.transaccion,
        provincia: form.value.provincia,
        ciudad:form.value.ciudad,
        zona:form.value.zona,
        cp:form.value.cp,
        numeroCalle:form.value.numeroCalle,
        nombreCalle:form.value.nombreCalle,
        planta: form.value.planta,
        puerta:form.value.puerta,
        disponibilidad: form.value.disponibilidad,
        tamano: form.value.tamano,
        detalles: this.detallesVivienda,
        image: this.imageness(this.imagePreviews)
      };
   
      // Enviar los datos y redirigir en caso de éxito
     
      this.PropertyService.updateProperty(this.propertyId, postData).subscribe({
        next: () => {
          // Redirigir a la página de inicio
           this.router.navigate(['/inicio']); // Ajusta la ruta según tu configuración
        },
        error: (err) => {
          console.error('Error al actualizar la propiedad', err);
        }
      });
    } catch (error) {
      console.error('Error al procesar las imágenes', error);
    }
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




// // Función para procesar las imágenes
// imageness(data: ImagePreview[]): void {
//   // Limpiar el array antes de agregar nuevos elementos
//   const a:any = [];
//   // Iterar sobre cada elemento en el array de datos
//   data.forEach((element: ImagePreview) => {
//     a.push({
//       "id":element.id,
//       "image":element.image
//     }); // Agregar el nombre de la imagen al array 'a'
//   });
//   return a
// }



imageness(data: ImagePreview[]): any[] {
  // Limpiar el array antes de agregar nuevos elementos
  const imagenes_nuevas: any[] = [];
  const imagenes_anteriores: any[] = [];
  // Iterar sobre cada elemento en el array de datos
  data.forEach((element: ImagePreview) => {
    // Comprobar si la imagen está en formato base64
    if (element.image.startsWith("data:image/")) {
      imagenes_nuevas.push({
        "id": element.id,
        "image": element.image
      });
    }
    // Agregar solo si no es base64
    else if (!element.image.startsWith("data:image/")) {
      imagenes_anteriores.push({
        "id": element.id,
        "image": element.image
      }); // Agregar solo si no es base64
    }
  });
  return [{'imagenes_nuevas':imagenes_nuevas, 'imagenes_anteriores':imagenes_anteriores}];
}


onFileSelected(event: Event): void {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput && fileInput.files) {
    // Convertir los archivos seleccionados a un array
    const newFiles = Array.from(fileInput.files);

    // Añadir las nuevas imágenes a la lista existente de imágenes
    this.imagenesNuevasCargadas = [...newFiles];
    // this.imagePreviews = []; 
    // Calcular el tamaño total de las imágenes
    // this.totalImageSizeMB = this.imagenes.reduce((total, file) => total + file.size, 0);
    // this.totalImageSizeMB = this.bytesToMB(this.totalImageSizeMB);

    // Previsualizar todas las imágenes
    this.imagenesNuevasCargadas.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as string;
        const imagePreview: ImagePreview = {
          id: this.generateTempId(),  // Generar un ID temporal
          image: base64Data
        };
        this.imagePreviews.push(imagePreview);
      };
      reader.readAsDataURL(file);
    });
  }
}




downloadImage(url: string): void {
  this.http.get(url, { responseType: 'blob' }).subscribe(blob => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = url.split('/').pop()!;
    link.click();
  });
}

// Función para obtener la URL completa de la imagen
getImageUrl(imagen: any): string {
  // Verificar si la imagen es una cadena en Base64
  if (imagen.startsWith("data:image")) {
    return imagen; // Retornar directamente la imagen en Base64
  } else {
    // Retornar la URL completa construida con la base URL y el ID de la propiedad
    return `${this.baseUrl}${this.propertiesData.sku}/${imagen}`;
  }
}

 


isBase64Image(data: string): boolean {
  return data.startsWith("data:image/");
}

delete(id: number, image:string, skuProperty: string): void {
  
  if(this.isBase64Image(image)){
    this.imagePreviews = this.imagePreviews.filter(image => image.id !== id);
    return
  }
  
  // Llama al servicio para eliminar la imagen en el backend
  this.PropertyService.deleteImage(id, skuProperty).subscribe({
    next: () => {
      // Si la eliminación es exitosa, elimina la imagen de la vista previa
      this.imagePreviews = this.imagePreviews.filter(image => image.id !== id);
      
      // Actualizar el estado del botón de envío
      // this.isSubmitButtonDisabled = this.imagePreviews.length === 0;

      console.log(`Imagen con id ${id} eliminada exitosamente.`);
    },
    error: (err: any) => {
      console.error('Error al eliminar la imagen:', err);
    }
  });
}


atras(){
  this.location.back();
}




}
