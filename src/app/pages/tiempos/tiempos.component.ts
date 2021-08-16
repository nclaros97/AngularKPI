import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { variablesGenerales } from 'src/app/shared/variables/variables';
import { Tiempo } from './models/tiempo';
import { TiemposServicesService } from './services/tiempos-services.service';

@Component({
  selector: 'app-tiempos',
  templateUrl: './tiempos.component.html',
  styleUrls: ['./tiempos.component.scss']
})
export class TiemposComponent implements OnInit {

  tiempos: Tiempo[] = [];
  textoEditarRowGrid : any = variablesGenerales.textoEditarRowGrid;
  constructor(private tiempoService: TiemposServicesService, private router: Router) { }

  ngOnInit() {
    this.getTiempos();
  }

  getTiempos(): void {
    this.tiempoService.getTiempos().subscribe((resp: Tiempo[]) => {
      this.tiempos = resp;
    });
  }
  addTiempo(tiempo: Tiempo): void {
    this.tiempoService.addTiempo(tiempo).subscribe((resp: Tiempo) => {
      tiempo.idTiempo = resp.idTiempo;
    });
  }
  updateTiempo(area: Tiempo): void {
    this.tiempoService.updateTiempo(area).subscribe((resp: Tiempo) => {
      console.log(resp);
    });
  }
  deleteTiempo(areaId: number): void {
    this.tiempoService.deleteTiempo(areaId).subscribe((resp: Tiempo) => {
      console.log(resp);
    });
  }

}
