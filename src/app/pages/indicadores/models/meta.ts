import { AreaAgencia } from '../../agencias/models/areaAgencia';
import { Logrado } from './logrado';
export interface Meta {
  idCodigoIndiador: number,
  idAreaAgencia: number,
  areaAgenciaDto: AreaAgencia
  logradoDto: Logrado
}
