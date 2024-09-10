import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ContratosService } from '../../services/dom/contratos/contratos.service';
import { CommonModule } from '@angular/common';







@Component({
  selector: 'app-ver-contrato',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ver-contrato.component.html',
  styleUrl: './ver-contrato.component.css'
})
export class VerContratoComponent implements OnInit {

  constructor( private route: ActivatedRoute, private contratoServices:ContratosService){}
  contrato_id!:number
  contrato:any
  ngOnInit(): void {
    // Extraer el parámetro 'id' de la URL
    this.contrato_id = Number(this.route.snapshot.paramMap.get('id')!);

    this.contratoServices.getContratoById(this.contrato_id).subscribe({
      next:(response=>{
        console.log(response)
        this.contrato = response
      })
    })
  }

  

}
