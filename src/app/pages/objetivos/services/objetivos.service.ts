import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { apis } from 'src/environments/environment';
import { Objetivo } from '../models/objetivo';
import { SubObjetivo } from '../models/subObjetivo';

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
    return this.http.delete(endpoint + '/api/objetivoes/delete/'+objetivoId).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addSubObjetivo(subObjetivo: SubObjetivo): Observable<any> {
    return this.http.post(endpoint + '/api/subObjetivos/add',subObjetivo).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateSubObjetivo(subObjetivo: SubObjetivo): Observable<any> {
    return this.http.put(endpoint + '/api/subObjetivos/edit/'+subObjetivo.idSubobjetivos,subObjetivo).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteSubObjetivo(objetivoId: number): Observable<any> {
    return this.http.delete(endpoint + '/api/subObjetivos/delete/'+objetivoId).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addSubObjetivoArea(subObjetivoArea: SubObjetivo): Observable<any> {
    return this.http.post(endpoint + '/api/subobjetivosAreas/add',subObjetivoArea).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateSubObjetivoArea(subObjetivoArea: SubObjetivo): Observable<any> {
    return this.http.put(endpoint + '/api/subobjetivosAreas/edit/'+subObjetivoArea.idSubobjetivos,subObjetivoArea).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteSubObjetivoArea(subObjetivoAreaId: number): Observable<any> {
    return this.http.delete(endpoint + '/api/subobjetivosAreas/delete/'+subObjetivoAreaId).pipe(
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
