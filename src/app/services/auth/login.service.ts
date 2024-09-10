import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router:Router) { }
  
  currenUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdministrador:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  currenUserData:BehaviorSubject<User> = new BehaviorSubject<User>({id:0, correo:''})
 
  private url = 'http://127.0.0.1:8000'; // Ajusta la ruta según la ubicación del archivo
  email: string = '';
  token_key = 'token'



  login(credenciales:LoginRequest):Observable<any>{
    const body = new HttpParams()
      .set('username', credenciales.email)
      .set('password', credenciales.password);
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    return this.http.post<any>(`${this.url}/token`, body.toString(), { headers }).pipe(
      tap(response =>{
        if (response.access_token){
          this.currenUserLoginOn.next(true)
          this.setToken(response.access_token) // guardo en localstorage
          this.getUserData().subscribe(userData => {
            this.currenUserData.next(userData);
            if(userData.rol != 'admisnistrador'){
              this.isAdministrador.next(false)
            } else{
              this.isAdministrador.next(true)
            }
          });
        }
      }),
      catchError(this.handleError)
    )
  }


  private setToken(token:string){
    localStorage.setItem(this.token_key, JSON.stringify(token));
  }


  private getToken(): string | null{
    return localStorage.getItem(this.token_key)
  }

  
  //Valido si el token del usuario sigue siendo valido
  //y se si sigue logueado o no
  isAuthenticated():boolean{
    const token = this.getToken()
    if(!token){
      return false
    }
    const paylod = JSON.parse(atob(token.split(".")[1]))
    const exp = paylod.exp * 1000
    return Date.now() < exp;
  }


  logout():void{
    localStorage.removeItem(this.token_key)
    this.router.navigate(["/login"])
  }



  getUserData(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token.replace(/^"|"$/g, '')}`
      });

      return this.http.get(`${this.url}/users/me`, { headers }).pipe(
        catchError(error => {
          console.error('Error fetching user data', error);
          return throwError('Error fetching user data');
        })
      );
    } else {
      return throwError('No token found');
    }
  }



  private handleError (error:HttpErrorResponse){

    if(error.status === 0){
      console.error("Se a producido un error",error.error)
    } else{
      console.error("Se retorno el codigo de error", error.status, error.error)
    }

    return throwError(()=> new Error('Algo falló, por favor intente nuevamente'))
  }


   get userData():Observable<User>{
      return this.currenUserData.asObservable();
   }

   get userLoginOn():Observable<boolean>{
      return this.currenUserLoginOn.asObservable();
   }

   get isAdministradorFun():Observable<boolean>{
    return this.isAdministrador.asObservable();
 }



}
