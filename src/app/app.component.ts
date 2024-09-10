import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { CommonModule } from '@angular/common';
import { LoginService } from './services/auth/login.service';

import { NavComponent } from './navs/nav/nav.component';
import { BarraSuperiorComponent } from './navs/barra-superior/barra-superior.component';
import { LoginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  LoginComponent, NavComponent, CommonModule, BarraSuperiorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  
  constructor(private loginServe:LoginService){}


  userLoginOn:boolean = false
  title = 'inmofront';


  ngOnInit(): void {
      // Emitir el estado inicial de autenticación
      this.loginServe.currenUserLoginOn.next(this.loginServe.isAuthenticated())
      // Suscribirse a los cambios en el estado de autenticación
      this.loginServe.currenUserLoginOn.subscribe({
        next:(userLoginOn)=>{
          this.userLoginOn = userLoginOn
        }
      })
  }



  //   checkTokenExists(): boolean {
  //     const token = localStorage.getItem('token');
  //     if(token){
  //       return true
  //     } else{
  //       return false
  //     }

  // }
}