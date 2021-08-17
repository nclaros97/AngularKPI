import { SubObjetivo } from "../../objetivos/models/subObjetivo";
import { Tiempo } from "../../tiempos/models/tiempo";
import { Meta } from './meta';

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
  subObjetivoDto: SubObjetivo,
  tiempoDto: Tiempo
  metaDto: Meta
}
