import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Objetivo } from './models/objetivo';
import { ObjetivosService } from './services/objetivos.service';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.scss']
})
export class ObjetivosComponent implements OnInit {

  objetivos: Objetivo[] = []

  constructor(private objetivosService: ObjetivosService, private router: Router) { }

  ngOnInit(): void {
    this.getObjetivos();
  }

  getObjetivos(): void {
    this.objetivosService.getObjetivos().subscribe((resp: Objetivo[]) => {
      this.objetivos = resp;
    });
  }
  addObjetivo(objetivo: Objetivo): void {
    this.objetivosService.addObjetivo(objetivo).subscribe((resp: Objetivo) => {
      console.log(objetivo);
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

}
