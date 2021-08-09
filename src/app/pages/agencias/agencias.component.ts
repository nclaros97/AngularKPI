import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agencia } from './models/agencia';
import { AgenciaService } from './services/agencia.service';
import DataGrid from "devextreme/ui/data_grid";

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.scss']
})
export class AgenciasComponent implements OnInit {

  agencias: Agencia[] = []
  constructor(private agenciaService: AgenciaService, private router: Router) { }

  ngOnInit(): void {
    this.getAgencias();
  }
  getAgencias(): void {
    this.agenciaService.getAgencias().subscribe((resp: Agencia[]) => {
      this.agencias = resp;
    });
  }
  addAgencia(agencia: Agencia): void {
    this.agenciaService.addAgencia(agencia).subscribe((resp: Agencia) => {
      agencia.idAgencia = resp.idAgencia;
    });
  }
  updateAgencia(agencia: Agencia): void {
    this.agenciaService.updateAgencia(agencia).subscribe((resp: Agencia) => {
      console.log(agencia);
    });
  }
  deleteAgencia(agenciaId: number): void {
    this.agenciaService.deleteAgencia(agenciaId).subscribe((resp: Agencia) => {
      console.log(resp);
    });
  }
}
