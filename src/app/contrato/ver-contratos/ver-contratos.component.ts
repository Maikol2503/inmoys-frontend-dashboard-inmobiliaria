import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContratosService } from '../../services/dom/contratos/contratos.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-ver-contratos',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule],
  templateUrl: './ver-contratos.component.html',
  styleUrl: './ver-contratos.component.css'
})
export class VerContratosComponent implements OnInit {


  displayedColumns: string[] = ['sku','id','nombre', 'apellido', 'documento', 'tipo','transaccion' , 'ubicacion', 'acciones' ];
  dataSource = new MatTableDataSource<any>([]);
  tipoInmueble!: string;
  documento: string = ''; // Variable para el documento
  private baseUrl: string = 'http://127.0.0.1:8000/images/';

  constructor(private route: ActivatedRoute, private ContratosService:ContratosService){}


  ngOnInit(): void {
    this.fetchContratos()
  }

  fetchContratos(): void {
    this.ContratosService.get_contratos(this.documento).subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (err) => {
        console.error('Error fetching contratos', err);
      }
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement; // Asegúrate de que event.target es un HTMLInputElement
    this.documento = input?.value.trim() ?? ''; // Asegúrate de manejar null
    this.fetchContratos(); // Fetch contratos based on the search
  }
}
