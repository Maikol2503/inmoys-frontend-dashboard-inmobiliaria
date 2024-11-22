import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { Propiedad } from './propiedadModel';


@Injectable({
  providedIn: 'root'
})



export class PropertiesService {

  private propertiesSubject: BehaviorSubject<Propiedad[]> = new BehaviorSubject<Propiedad[]>([]);
  public properties$: Observable<Propiedad[]> = this.propertiesSubject.asObservable();
  
  constructor(private http:HttpClient) { 
    // this.loadProperties();
  }
  private url = 'http://127.0.0.1:8000';

  // private loadProperties(): void {
  //   this.get_properties_disponibles().subscribe(data => {
  //     this.propertiesSubject.next(data);
  //     console.log('entro en loadproperties')
  //   });
  // }


  get_propertie(id:number): Observable<Propiedad> {
    return this.http.get<Propiedad>(`${this.url}/get-property/${id}`).pipe(
      tap(response => {
        // console.log(response)
      }),
      catchError(this.handleError)
    );
  }

  
  get_properties_disponibles(page:number, limit:number): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(`${this.url}/get-properties-disponibles`, {params:{page:page.toString(), limit:limit.toString()}}).pipe(
      tap(response => {
        // this.propertiesSubject.next(response);
      }),
      catchError(this.handleError)
    );
  }


  get_properties(params:any): Observable<Propiedad[]> {
    console.log(params, 'paranms')
    return this.http.get<Propiedad[]>(`${this.url}/get-properties-filter`,{params}).pipe(
      tap(response => {
        // this.propertiesSubject.next(response);
      }),
      catchError(this.handleError)
    );
  }

  properties_count():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/properties-count`).pipe(
      tap(response =>{
        console.log(response)
      }),
      catchError(this.handleError)
    )
  }


    // Nueva función para obtener propiedades filtradas por tipo de transacción
    get_properties_by_transaction(tipo: string): Observable<Propiedad[]> {
      return this.http.get<Propiedad[]>(`${this.url}/get-properties-tipo?tipoTransaccion=${tipo}`).pipe(
        tap(response => {
          console.log(response, 'response tipo')
        }),
        catchError(this.handleError)
      );
    }


  addProperty(newProperty: any):Observable<any> {
    console.log(newProperty, 'newpropiedad')
    return this.http.post<any>('http://localhost:8000/api/publicar-propiedad/', newProperty).pipe(
      tap(response => {
          // console.log(response, 'response add properties')
          // const currentProperties = this.propertiesSubject.value;
          // this.propertiesSubject.next([...currentProperties, response]);
      }),
      catchError(this.handleError)
    );
 
    
  }




// Método para editar una propiedad
updateProperty(id: number, updatedProperty: any): Observable<Propiedad> {
  return this.http.put<Propiedad>(`${this.url}/editar-propiedad/${id}`, updatedProperty).pipe(
    tap((response: Propiedad) => {
      // console.log(response, 'response');

      // // Obtengo las propiedades almacenadas
      // const currentProperties = this.propertiesSubject.value;

      // // Obtengo su índice (id_property es el campo en la propiedad)
      // const index = currentProperties.findIndex(property => property.id_property === id);

      // if (index > -1) {
      //   // Si encuentra la propiedad, la actualiza
      //   currentProperties[index] = response;
      //   console.log(currentProperties, 'Propiedad actualizada');
      // } else {
      //   // Si no encuentra la propiedad, la agrega al final
      //   currentProperties.push(response);
      //   console.log(currentProperties, 'Nueva propiedad agregada');
      // }

      // // Actualizo el observable con las propiedades modificadas
      // this.propertiesSubject.next(currentProperties);
    }),
    catchError(this.handleError)
  );
}


   // Método para eliminar una propiedad
   deleteProperty(id: number): void {
    this.http.delete(`${this.url}/delete-properties/${id}`).pipe(
      tap(() => {
        const updatedProperties = this.propertiesSubject.value.filter(property => property.id_property !== id);
        this.propertiesSubject.next(updatedProperties);
      }),
      catchError(this.handleError)
    ).subscribe();
  }

  // Método para establecer las propiedades
  setProperties(properties: Propiedad[]): void {
    this.propertiesSubject.next(properties);
  }

  // Método para obtener las propiedades
  getProperties(): Observable<Propiedad[]> {
    return this.properties$;
  }

  deleteImage(idImagen: number, skuProperty: string): Observable<any> {
    const url = `${this.url}/eliminar-imagen/${idImagen}/${skuProperty}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }
  

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something bad happened; please try again later.');
  }
  
}

