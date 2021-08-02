import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { apis } from 'src/environments/environment';
import { Objetivo } from '../models/objetivo';

const endpoint = apis.kpiApi;

@Injectable({
  providedIn: 'root'
})
export class ObjetivosService {

  constructor(private http: HttpClient) { }

  getObjetivos(): Observable<any> {
    return this.http.get(endpoint + '/api/objetivoes').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  addObjetivo(objetivo: Objetivo): Observable<any> {
    return this.http.post(endpoint + '/api/objetivoes/add',objetivo).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateObjetivo(objetivo: Objetivo): Observable<any> {
    return this.http.put(endpoint + '/api/objetivoes/edit/'+objetivo.idObjetivo,objetivo).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteObjetivo(objetivoId: number): Observable<any> {
    debugger;
    return this.http.delete(endpoint + '/api/objetivoes/delete/'+objetivoId).pipe(
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
