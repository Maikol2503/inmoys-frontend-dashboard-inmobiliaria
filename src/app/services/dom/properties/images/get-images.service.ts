import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadImagesService {

  private apiUrl = 'http://localhost:8000/obtener-imagenes-propiedad'; // Ajusta la URL según sea necesario

  constructor(private http: HttpClient) { }

  getImageUrls(propertyId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}?property_id=${propertyId}`);
  }
}
