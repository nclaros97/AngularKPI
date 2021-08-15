import { SubObjetivo } from "./subObjetivo";

export interface Objetivo{
  idObjetivo: number,
  nombreObjetivo: string,
  porcentajeObjetivo: number
  subObjetivoDto: SubObjetivo[]
}
