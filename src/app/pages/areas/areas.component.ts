import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { variablesGenerales } from 'src/app/shared/variables/variables';
import { Area } from './models/area';
import { AreaService } from './services/area.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  areas: Area[] = []
  textoEditarRowGrid : any = variablesGenerales.textoEditarRowGrid;
  constructor(private areaService: AreaService, private router: Router) { }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(): void {
    this.areaService.getAreas().subscribe((resp: Area[]) => {
      this.areas = resp;
    });
  }
  addArea(area: Area): void {
    this.areaService.addArea(area).subscribe((resp: Area) => {
      area.idArea = resp.idArea;
    });
  }
  updateArea(area: Area): void {
    this.areaService.updateArea(area).subscribe((resp: Area) => {
      console.log(resp);
    });
  }
  deleteArea(areaId: number): void {
    this.areaService.deleteArea(areaId).subscribe((resp: Area) => {
      console.log(resp);
    });
  }

}
