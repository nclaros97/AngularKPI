import { Agencia } from "src/app/pages/agencias/models/agencia";
import { Area } from "src/app/pages/areas/models/area";

export class Usuario {
  idUsuario: number;
  email: string;
  contraseña: string;
  idArea: number;
  idAreaNavigation:Area;
  usuarioTipo: string;
  idAgencia: number;
  idAgenciaNavigation: Agencia;
  constructor() {
   this.idUsuario = 0;
   this.email = "";
   this.contraseña = "";
   this.idArea = 0;
   this.idAreaNavigation = new Area;
   this.usuarioTipo = "";
   this.idAgencia = 0;
   this.idAgenciaNavigation = new Agencia
  }
}
