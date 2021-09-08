import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/shared/components/user-panel/models/user';
import { variablesGenerales } from 'src/app/shared/variables/variables';
import { AgenciaService } from '../agencias/services/agencia.service';
import { AreaService } from '../areas/services/area.service';
import { UsuariosService } from './services/usuarios.service';
import { Area } from '../areas/models/area';
import { Agencia } from '../agencias/models/agencia';
import { TipoUsuario } from './models/tipoUsuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  areas: Area[] = [];
  agencias: Agencia[] = [];
  tiposUsuario: TipoUsuario[] = [];
  textoEditarRowGrid : any = variablesGenerales.textoEditarRowGrid;
  constructor(private usuariosService: UsuariosService, private areasService: AreaService, private agenciaServices: AgenciaService) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.getAreas();
    this.getAgencias();
    this.tiposUsuario = this.usuariosService.getTiposUsuarios();
  }

  getAreas(): void {
    this.areasService.getAreas().subscribe((resp: Area[]) => {
      this.areas = resp;
    });
  }

  getAgencias(): void {
    this.agenciaServices.getAgencias().subscribe((resp: Agencia[]) => {
      this.agencias = resp;
    });
  }

  getUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe((resp: Usuario[]) => {
      this.usuarios = resp;
    });
  }
  addUsuario(usuario: Usuario): void {
    this.usuariosService.addUsuario(usuario).subscribe((resp: Usuario) => {
      usuario.idUsuario = resp.idUsuario;
    });
  }
  updateUsuario(usuario: Usuario): void {
    this.usuariosService.updateUsuario(usuario).subscribe((resp: Usuario) => {
      console.log(resp);
    });
  }
  deleteUsuario(areaId: number): void {
    this.usuariosService.deleteUsuario(areaId).subscribe((resp: Usuario) => {
      console.log(resp);
    });
  }
}
