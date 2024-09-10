import { Component, HostListener } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';
import { CommonModule } from '@angular/common';
import { ModalLogoutComponent } from './modal-logout/modal-logout.component';

@Component({
  selector: 'app-barra-superior',
  standalone: true,
  imports: [CommonModule, ModalLogoutComponent],
  templateUrl: './barra-superior.component.html',
  styleUrl: './barra-superior.component.css'
})
export class BarraSuperiorComponent {

  constructor(private loginServe:LoginService){}

  userData?:User
  isModalLogoutVisible:boolean = false
  isAdministrador?:boolean

  // Método para cerrar el modal cuando se hace clic fuera de él
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    // Comprueba si el clic se ha hecho fuera del modal
    const targetElement = event.target as HTMLElement;
    const modalElement = document.querySelector('.container-modal-logout');

    if (this.isModalLogoutVisible && modalElement && !modalElement.contains(targetElement)) {
      this.closeModalLogout();
    }
  }


  ngOnInit(): void {


    this.loginServe.getUserData().subscribe({
      next:(data)=>{
        this.userData = data
        
      }
    });
  }

  openModalLogout(){
    this.isModalLogoutVisible = true
  }

  closeModalLogout(){
    this.isModalLogoutVisible = false
  }



}
