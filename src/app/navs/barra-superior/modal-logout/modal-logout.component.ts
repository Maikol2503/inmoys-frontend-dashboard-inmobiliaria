import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-logout.component.html',
  styleUrl: './modal-logout.component.css'
})
export class ModalLogoutComponent implements OnInit {

  constructor(private loginServe:LoginService) {}

  isAdministrador?:boolean

  ngOnInit(): void {
    this.loginServe.isAdministradorFun.subscribe({
      next:(data) =>{
        this.isAdministrador = data
      }
    });
  }

  logout(){
    this.loginServe.logout()
    this.loginServe.currenUserLoginOn.next(false)
}

}
