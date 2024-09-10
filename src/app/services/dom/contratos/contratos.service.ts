import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  id_property!:number
  private url = 'http://127.0.0.1:8000';


  constructor(private http:HttpClient) { }


  addContrato(newContrato: any):Observable<any> {
    return this.http.post<any>(`${this.url}/agregar-contrato`, newContrato).pipe(
      tap(response =>{
        console.log(response)
      })
    )
  }


   // Método para obtener todos los contratos
   get_contratos(documento: string = ''): Observable<any[]> {
    const url = documento
      ? `${this.url}/contratos?documento=${encodeURIComponent(documento)}`
      : `${this.url}/contratos`;
    return this.http.get<any[]>(url);
  }


  searchContratosByDocumento(documento: string): Observable<any> {
    return this.http.get<any>(`${this.url}/contratos?documento=${documento}`);
  }


  // Método para obtener un contrato por su ID
  getContratoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/contratos/${id}`);
  }
  



}
