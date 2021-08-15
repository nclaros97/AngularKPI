import { SubObjetivo } from "../../objetivos/models/subObjetivo";

export interface Indicador {
  idCodigoIndiador: number,
  idSubobjetivos: number,
  nombreIndicador: string,
  proceso: string,
  formula: string,
  detalle: string,
  idTiempo: number,
  estado: string,
  responsables: string
  idSubobjetivosNavigation: SubObjetivo,
  idTiempoNavigation: any
}
