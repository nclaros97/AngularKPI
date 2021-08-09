import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import DataSource from 'devextreme/data/data_source';
import { Area } from '../areas/models/area';
import { AreaService } from '../areas/services/area.service';
import { Objetivo } from './models/objetivo';
import { SubObjetivo } from './models/subObjetivo';
import { ObjetivosService } from './services/objetivos.service';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.scss']
})
export class ObjetivosComponent implements OnInit {

  objetivos: Objetivo[] = [];
  areas: Area[] = [];
  searchModeOption: string = "contains";
  searchExprOption: any = "nombreArea";
  searchTimeoutOption: number = 200;
  minSearchLengthOption: number = 0;
  showDataBeforeSearchOption: boolean = false;
  areaId: number = 0;
  objetivoId: number = 0
  constructor(private objetivosService: ObjetivosService, private router: Router, private areasService: AreaService) {
   }

  ngOnInit(): void {
    this.getObjetivos();
    this.getAreas();
  }

  getObjetivos(): void {
    this.objetivosService.getObjetivos().subscribe((resp: Objetivo[]) => {
      this.objetivos = resp;
      console.log(this.objetivos);
    });
  }
  getAreas(): void {
    this.areasService.getAreas().subscribe((resp: Area[]) => {
      this.areas = resp;
      console.log(this.areas);
    });
  }
  addObjetivo(objetivo: Objetivo): void {
    this.objetivosService.addObjetivo(objetivo).subscribe((resp: Objetivo) => {
      objetivo.idObjetivo = resp.idObjetivo;
    });
  }
  updateObjetivo(objetivo: Objetivo): void {
    this.objetivosService.updateObjetivo(objetivo).subscribe((resp: Objetivo) => {
      console.log(objetivo);
    });
  }
  deleteObjetivo(agenciaId: number): void {
    this.objetivosService.deleteObjetivo(agenciaId).subscribe((resp: Objetivo) => {
      console.log(resp);
    });
  }

  handleValueChange(event: any): void{
    debugger;
    this.areaId = event.value;
  }

  handleRowColapsed(event: Objetivo): void{
    debugger;
    this.objetivoId = event.idObjetivo;
  }

  addSubObjetivo(subObjetivo: SubObjetivo): void {
    debugger;
    subObjetivo.idArea = this.areaId;
    subObjetivo.idObjetivo = this.objetivoId;
    this.objetivosService.addSubObjetivo(subObjetivo).subscribe((resp: SubObjetivo) => {
      subObjetivo.idSubobjetivos = resp.idSubobjetivos;
      subObjetivo.idAreaNavigation = this.areas.find(x=>x.idArea == resp.idArea) || {idArea:0,nombreArea:''};
    });
  }
  updateSubObjetivo(subObjetivo: SubObjetivo): void {
    subObjetivo.idArea = this.areaId;
    subObjetivo.idObjetivo = this.objetivoId;
    this.objetivosService.updateSubObjetivo(subObjetivo).subscribe((resp: SubObjetivo) => {
      subObjetivo.idAreaNavigation = this.areas.find(x=>x.idArea == resp.idArea) || {idArea:0,nombreArea:''};
      console.log(subObjetivo);
    });
  }
  deleteSubObjetivo(subObjetivoId: number): void {
    this.objetivosService.deleteSubObjetivo(subObjetivoId).subscribe((resp: SubObjetivo) => {
      console.log(resp);
    });
  }

}
