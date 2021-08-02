import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Area } from './models/area';
import { AreaService } from './services/area.service';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  areas: Area[] = []

  constructor(private areaService: AreaService, private router: Router) { }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas(): void {
    this.areaService.getAreas().subscribe((resp: Area[]) => {
      this.areas = resp;
    });
  }
  addAgencia(area: Area): void {
    this.areaService.addArea(area).subscribe((resp: Area) => {
      console.log(resp);
    });
  }
  updateAgencia(area: Area): void {
    this.areaService.updateArea(area).subscribe((resp: Area) => {
      console.log(resp);
    });
  }
  deleteAgencia(agenciaId: number): void {
    this.areaService.deleteArea(agenciaId).subscribe((resp: Area) => {
      console.log(resp);
    });
  }

}
