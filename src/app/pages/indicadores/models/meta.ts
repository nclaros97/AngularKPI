import { AreaAgencia } from '../../agencias/models/areaAgencia';
import { Logrado } from './logrado';
export class Meta {
  idCodigoIndiador: number =0;
  idAreaAgencia: number = 0;
  areaAgenciaDto: AreaAgencia | undefined;
  logradoDto: Logrado | undefined
}
