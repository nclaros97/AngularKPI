import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Indicador } from './models/indicadores';
import { IndicadoresServices } from './services/indicadoresServices';
import { SubObjetivo } from '../objetivos/models/subObjetivo';
import { variablesGenerales } from 'src/app/shared/variables/variables';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.scss']
})
export class IndicadoresComponent implements OnInit {

  constructor(private indicadoresServices: IndicadoresServices, private router: Router) { }

  indicadores: Indicador[] = [];
  tiempos: any[] = [];
  tiempoId: number = 0;
  subObjetivoId: number = 0;
  subObjetivos: SubObjetivo[] = [];
  textoEditarRowGrid : any = variablesGenerales.textoEditarRowGrid;

  ngOnInit(): void {
    this.getIndicadores();
    this.getTiempos();
    this.getSubObjetivos();
  }

  getIndicadores(): void {
    this.indicadoresServices.getIndicadores().subscribe((resp: Indicador[]) => {
      this.indicadores = resp;
    });
  }

  getSubObjetivos(): void {
    this.indicadoresServices.getSubObjetivos().subscribe((resp: SubObjetivo[]) => {
      this.subObjetivos = resp;
    });
  }

  getTiempos(): void {
    this.indicadoresServices.getTiempos().subscribe((resp: any[]) => {
      this.tiempos = resp;
    });
  }

  addIndicador(indicador: Indicador): void {
    indicador.idTiempo = this.tiempoId;
    indicador.idSubobjetivos = this.subObjetivoId;
    this.indicadoresServices.addIndicador(indicador).subscribe((resp: Indicador) => {
      indicador.idCodigoIndiador = resp.idCodigoIndiador;
    });
  }
  updateIndicador(indicador: Indicador): void {
    this.indicadoresServices.updateIndicador(indicador).subscribe((resp: Indicador) => {
      console.log(resp);
    });
  }
  deleteIndicador(indicadorId: number): void {
    this.indicadoresServices.deleteIndicador(indicadorId).subscribe((resp: Indicador) => {
      console.log(resp);
    });
  }

  handleValueChange(event: any): void {
    this.tiempoId = event.value;
  }
  handleValueSubObjetivoChange(event: any): void {
    this.subObjetivoId = event.value;
  }

}
