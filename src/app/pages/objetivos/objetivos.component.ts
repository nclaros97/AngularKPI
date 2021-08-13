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
  objetivoId: number = 0;
  constructor(private objetivosService: ObjetivosService, private router: Router, private areasService: AreaService) {
  }

  ngOnInit(): void {
    this.getObjetivos();
    this.getAreas();
  }

  getObjetivos(): void {
    debugger;
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

  handleValueChange(event: any): void {
    debugger;
    this.areaId = event.value;
  }

  handleRowColapsed(event: Objetivo): void {
    this.objetivoId = event.idObjetivo;
  }
  sumaPorcentajeSubObjetivos(id: number): number {
    let subObjetivos = this.objetivos.find(x=>x.idObjetivo == id)?.subobjetivos;
    let totalPorcentaje:number=0;

    subObjetivos?.forEach((x)=>{
      totalPorcentaje += Number(x.subObjetivo);
    });

    return totalPorcentaje;
  }
  removerFila(key: string): void {
    let index = this.objetivos.find(x => x.idObjetivo == this.objetivoId)?.subobjetivos.findIndex(x => x.__KEY__ == key);
    this.objetivos.find(x => x.idObjetivo == this.objetivoId)?.subobjetivos.splice(index!, 1);
  }

  addSubObjetivo(subObjetivo: SubObjetivo): void {
    subObjetivo.idArea = this.areaId;
    subObjetivo.idObjetivo = this.objetivoId;

    let objetivo: Objetivo | undefined = undefined;
    objetivo = this.objetivos.find(x => x.idObjetivo == this.objetivoId);
    debugger;
    if (this.sumaPorcentajeSubObjetivos(this.objetivoId) >= objetivo!.porcentajeObjetivo) {
      alert("El porcentaje del sub objetivo excede el porcentaje del objetivo");

      let key: string;
      let objetivo = this.objetivos.find(x => x.idObjetivo == this.objetivoId);
      objetivo!.subobjetivos.forEach((x) => {
        if (x.__KEY__ != undefined) {
          key = x.__KEY__;
          this.removerFila(key);
        }
      });
    } else {
      this.objetivosService.addSubObjetivo(subObjetivo).subscribe((resp: SubObjetivo) => {
        subObjetivo.idSubobjetivos = resp.idSubobjetivos;
        subObjetivo.idAreaNavigation = this.areas.find(x => x.idArea == resp.idArea) || { idArea: 0, nombreArea: '',idAreaAgencia:0 };
      });
    }
  }
  updateSubObjetivo(subObjetivo: SubObjetivo): void {
    subObjetivo.idArea = this.areaId;
    subObjetivo.idObjetivo = this.objetivoId;
    this.objetivosService.updateSubObjetivo(subObjetivo).subscribe((resp: SubObjetivo) => {
      subObjetivo.idAreaNavigation = this.areas.find(x => x.idArea == resp.idArea) || { idArea: 0, nombreArea: '',idAreaAgencia:0 };
      console.log(subObjetivo);
    });
  }
  deleteSubObjetivo(subObjetivoId: number): void {
    this.objetivosService.deleteSubObjetivo(subObjetivoId).subscribe((resp: SubObjetivo) => {
      console.log(resp);
    });
  }

  addSubObjetivoArea(subObjetivoArea: SubObjetivo): void {
    subObjetivoArea.idArea = this.areaId;
    subObjetivoArea.idObjetivo = this.objetivoId;

    let objetivo: Objetivo | undefined = undefined;
    objetivo = this.objetivos.find(x => x.idObjetivo == this.objetivoId);
    debugger;
    if (this.sumaPorcentajeSubObjetivos(this.objetivoId) >= objetivo!.porcentajeObjetivo) {
      alert("El porcentaje del sub objetivo excede el porcentaje del objetivo");

      let key: string;
      let objetivo = this.objetivos.find(x => x.idObjetivo == this.objetivoId);
      objetivo!.subobjetivos.forEach((x) => {
        if (x.__KEY__ != undefined) {
          key = x.__KEY__;
          this.removerFila(key);
        }
      });
    } else {
      this.objetivosService.addSubObjetivo(subObjetivoArea).subscribe((resp: SubObjetivo) => {
        subObjetivoArea.idSubobjetivos = resp.idSubobjetivos;
        subObjetivoArea.idAreaNavigation = this.areas.find(x => x.idArea == resp.idArea) || { idArea: 0, nombreArea: '',idAreaAgencia:0 };
      });
    }
  }
  updateSubObjetivoArea(subObjetivoArea: SubObjetivo): void {
    subObjetivoArea.idArea = this.areaId;
    subObjetivoArea.idObjetivo = this.objetivoId;
    this.objetivosService.updateSubObjetivo(subObjetivoArea).subscribe((resp: SubObjetivo) => {
      subObjetivoArea.idAreaNavigation = this.areas.find(x => x.idArea == resp.idArea) || { idArea: 0, nombreArea: '',idAreaAgencia:0 };
      console.log(subObjetivoArea);
    });
  }
  deleteSubObjetivoArea(subObjetivoAreaId: number): void {
    this.objetivosService.deleteSubObjetivo(subObjetivoAreaId).subscribe((resp: SubObjetivo) => {
      console.log(resp);
    });
  }

}
