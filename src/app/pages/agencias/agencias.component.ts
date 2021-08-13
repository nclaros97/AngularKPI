import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Agencia } from './models/agencia';
import { AgenciaService } from './services/agencia.service';
import DataGrid from "devextreme/ui/data_grid";
import { Area } from '../areas/models/area';
import { AreaService } from '../areas/services/area.service';
import { AreaAgencia } from './models/areaAgencia';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.scss']
})
export class AgenciasComponent implements OnInit {

  agencias: Agencia[] = [];
  agenciaId: number = 0;
  areaId: number = 0;
  areas: Area[] = [];
  indicadorId: number = 0;
  indicadores: any[] = [];

  constructor(private agenciaService: AgenciaService, private router: Router, private areasService: AreaService) { }

  ngOnInit(): void {
    this.getAgencias();
    this.getAreas();
    this.getIndicadores();
  }
  getAreas(): void {
    this.areasService.getAreas().subscribe((resp: Area[]) => {
      this.areas = resp;
      console.log(this.areas);
    });
  }
  getAgencias(): void {
    this.agenciaService.getAgencias().subscribe((resp: Agencia[]) => {
      this.agencias = resp;
    });
  }
  getIndicadores(): void {
    this.agenciaService.getIndicadores().subscribe((resp: Area[]) => {
      this.indicadores = resp;
      console.log(this.areas);
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

  addAgenciaArea(areaAgencia: AreaAgencia): void {
    areaAgencia.idAgencia = this.agenciaId;
    areaAgencia.idArea = this.areaId;
    areaAgencia.idCodigoIndiador = this.indicadorId;
    this.agenciaService.addAgenciaArea(areaAgencia).subscribe((resp: Agencia) => {
      areaAgencia.idAgencia = resp.idAgencia;
      areaAgencia.area = this.areas.find(x => x.idArea == this.areaId) || { idArea: 0, nombreArea: '',idAreaAgencia:0 };
      areaAgencia.nombreArea = areaAgencia.area.nombreArea;
    });
  }
  updateAgenciaArea(areaAgencia: AreaAgencia): void {
    debugger;
    this.agenciaService.updateAgenciaArea(areaAgencia).subscribe((resp: Agencia) => {
      console.log(areaAgencia);
    });
  }
  deleteAgenciaArea(agenciaAreaId: number): void {
    this.agenciaService.deleteAgenciaArea(agenciaAreaId).subscribe((resp: Agencia) => {
      console.log(resp);
    });
  }

  handleValueChange(event: any): void {
    debugger;
    this.areaId = event.value;
  }
  handleValueIndicadoresChange(event: any): void {
    debugger;
    this.indicadorId = event.value;
  }
  handleRowColapsed(event: Agencia): void {
    this.agenciaId = event.idAgencia;
  }
}
