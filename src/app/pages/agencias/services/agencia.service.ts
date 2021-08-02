import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { apis } from 'src/environments/environment';
import { Agencia } from '../models/agencia';

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
