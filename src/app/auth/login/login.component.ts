import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginError=''

  constructor(private loginService:LoginService,private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value).subscribe({
        next:(token)=>{
          console.log(token)
        },
        error:(errorData) =>{
          console.error(errorData);
          this.loginError=errorData;
          
        },
        complete:()=>{
          console.info("login completo")
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }
      })

    } else {
      this.loginForm.markAllAsTouched()
      console.log('Formulario no válido');
    }
  }


}
