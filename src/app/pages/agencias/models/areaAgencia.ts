import { Area } from "../../areas/models/area";

export interface AreaAgencia {
  idAreaAgencia: number,
  idArea: number,
  idAgencia: number,
  idCodigoIndiador: number,
  indicadorDto: any;
  areaDto:Area,
  nombreArea: string
}
