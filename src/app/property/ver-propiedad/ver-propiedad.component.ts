import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Propiedad } from '../../services/dom/properties/propiedadModel';
import { PropertiesService } from '../../services/dom/properties/properties.service';


interface ImagePreview {
  id: any | null;
  image: string;
}

@Component({
  selector: 'app-ver-propiedad',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ver-propiedad.component.html',
  styleUrl: './ver-propiedad.component.css'
})
export class VerPropiedadComponent implements OnInit{
  
propertyId!:any
propertiesData: Propiedad = {} as Propiedad;
imagePreviews: ImagePreview[] = [];
private baseUrl: string = 'https://inmoys-backend-inmobiliaria-1.onrender.com/images/';

constructor(private route: ActivatedRoute, private PropertyService:PropertiesService){}

ngOnInit(): void {
  // Obtengo el ID de la URL
  const idParam = this.route.snapshot.paramMap.get('id');
  this.propertyId = idParam ? Number(idParam) : null;

  if (this.propertyId) {
    this.PropertyService.get_propertie(this.propertyId).subscribe({
      next: (data: Propiedad) => {
          this.propertiesData = data; // Asigna el primer objeto del array
          console.log(this.propertiesData)
          // Imagenes de la propiedad
          if (this.propertiesData.image) {
            this.imagePreviews = this.propertiesData.image.map(img => {
              return {
                id: img.id,
                image: `${img.image}`
              };
            });
          }
        
      },
      error: (err) => {
        console.error('Error al obtener la propiedad', err);
      }
    });
  } else {
    console.error('ID de propiedad no válido');
  }
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
}
