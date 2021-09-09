import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { apis } from 'src/environments/environment';
import { Indicador } from '../models/indicadores';
import { Meta } from '../models/meta';
import { Estados } from '../models/estado';
import { IndicadorLogrado } from '../models/indicadorLogrado';
import { Logrado } from '../models/logrado';

const endpoint = apis.kpiApi + "/api/indicadores/";
const endpointTiempos = apis.kpiApi + "/api/tiempos/";
const endpointSubObjetivos = apis.kpiApi + "/api/subObjetivos/";


@Injectable({
  providedIn: 'root'
})
export class IndicadoresServices {
  estados: Estados[] = [{
    estado: 1,
    nombreEstado: "Activo",

  },
  {
    estado: 2,
    nombreEstado: "Inactivo"
  },
  {
    estado: 3,
    nombreEstado: "Evaluado"
  },
  {
    estado: 4,
    nombreEstado: "Sin Evaluar"
  }
  ];
  logrados: IndicadorLogrado[] = [
    {
      id: 1,
      logrado: "Sí"
    },
    {
      id: 2,
      logrado: "No"
    }
  ]

  constructor(private http: HttpClient) { }

  getTiempos(): Observable<any> {
    return this.http.get(endpointTiempos).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getSubObjetivos(): Observable<any> {
    return this.http.get(endpointSubObjetivos).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getIndicadores(): Observable<any> {
    return this.http.get(endpoint).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getEstados(): Estados[] {
    return this.estados;
  }

  getLogrados(): IndicadorLogrado[] {
    return this.logrados;
  }

  getAreasAgencias(): Observable<any> {
    return this.http.get(apis.kpiApi + "/api/areaAgencias/selectBox").pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addIndicador(indicador: Indicador): Observable<any> {
    return this.http.post(endpoint + 'add', indicador).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateIndicador(indicador: Indicador): Observable<any> {
    return this.http.put(endpoint + 'edit/' + indicador.idCodigoIndiador, indicador).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteIndicador(indicadorId: number): Observable<any> {
    debugger;
    return this.http.delete(endpoint + 'delete/' + indicadorId).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }


  addMeta(meta: Meta): Observable<any> {
    return this.http.post(apis.kpiApi + '/api/metas/add', meta).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateMeta(meta: Meta): Observable<any> {
    return this.http.put(apis.kpiApi + '/api/metas/edit/' + meta.idCodigoIndiador, meta).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteMeta(meta: Meta): Observable<any> {
    debugger;

    return this.http.request('DELETE', apis.kpiApi + '/api/metas/delete/', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }), body: meta
    }).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addMetaLogrado(logrado: Logrado): Observable<any> {
    return this.http.post(apis.kpiApi + '/api/logrados/add', logrado).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getMetaLogrado(indicadorId:Number): Observable<any> {
    return this.http.get(apis.kpiApi + "/api/logrados/metaLogrado/indicador/"+indicadorId).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateMetaLogrado(logrado: Logrado): Observable<any> {
    return this.http.put(apis.kpiApi + '/api/logrados/edit/' + logrado.idCodigoIndiador, logrado).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteMetaLogrado(logrado: Logrado): Observable<any> {
    return this.http.request('DELETE', apis.kpiApi + '/api/logrados/delete/', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }), body: logrado
    }).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      console.log(error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
