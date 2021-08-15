import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { apis } from 'src/environments/environment';
import { Indicador } from '../models/indicadores';

const endpoint = apis.kpiApi + "/api/indicadores/";
const endpointTiempos = apis.kpiApi + "/api/tiempos/";
const endpointSubObjetivos = apis.kpiApi + "/api/subObjetivos/";
@Injectable({
  providedIn: 'root'
})
export class IndicadoresServices {

  constructor(private http: HttpClient) { }

  getTiempos(): Observable<any>{
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

  addIndicador(indicador: Indicador): Observable<any> {
    return this.http.post(endpoint + 'add',indicador).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateIndicador(indicador: Indicador): Observable<any> {
    return this.http.put(endpoint + 'edit/'+indicador.idCodigoIndiador,indicador).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteIndicador(indicadorId: number): Observable<any> {
    debugger;
    return this.http.delete(endpoint + 'delete/'+indicadorId).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private extractData(res: any): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
