import { Area } from "../../areas/models/area";

export interface Agencia{
  idAgencia: number,
  nombreAgencia: string,
  areas: Area[]
}
