import { Area } from "../../areas/models/area";
import { Objetivo } from "./objetivo";

export interface SubObjetivo {
  idSubobjetivos: number,
  nombreSubobjetivo: string,
  idArea: number,
  idObjetivo: number,
  subObjetivo: string,
  areaDto: Area,
  objetivosDto: Objetivo
  __KEY__: string
}
