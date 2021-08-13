import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { apis } from 'src/environments/environment';
import { Agencia } from '../models/agencia';
import { AreaAgencia } from '../models/areaAgencia';

const endpoint = apis.kpiApi;

@Injectable({
  providedIn: 'root'
})
export class AgenciaService {

  constructor(private http: HttpClient) { }

  getAgencias(): Observable<any> {
    return this.http.get(endpoint + '/api/agencias').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getIndicadores(): Observable<any> {
    return this.http.get(endpoint + '/api/indicadores').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addAgencia(agencia: Agencia): Observable<any> {
    return this.http.post(endpoint + '/api/agencias/add',agencia).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateAgencia(agencia: Agencia): Observable<any> {
    return this.http.put(endpoint + '/api/agencias/edit/'+agencia.idAgencia,agencia).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteAgencia(agenciaId: number): Observable<any> {
    debugger;
    return this.http.delete(endpoint + '/api/agencias/delete/'+agenciaId).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addAgenciaArea(areaAgencia: AreaAgencia): Observable<any> {
    return this.http.post(endpoint + '/api/areaAgencias/add',areaAgencia).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateAgenciaArea(areaAgencia: AreaAgencia): Observable<any> {
    debugger;
    return this.http.put(endpoint + '/api/areaAgencias/edit/'+areaAgencia.idAreaAgencia,areaAgencia).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteAgenciaArea(areaAgenciaId: number): Observable<any> {
    debugger;
    return this.http.delete(endpoint + '/api/areaAgencias/delete/'+areaAgenciaId).pipe(
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
