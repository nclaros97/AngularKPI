import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { apis } from 'src/environments/environment';
import { Tiempo } from '../models/tiempo';

const endpoint = apis.kpiApi +"/api/tiempos/";

@Injectable({
  providedIn: 'root'
})
export class TiemposServicesService {

  constructor(private http: HttpClient) { }

  getTiempos(): Observable<any> {
    return this.http.get(endpoint).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  addTiempo(tiempo: Tiempo): Observable<any> {
    return this.http.post(endpoint + 'add',tiempo).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateTiempo(tiempo: Tiempo): Observable<any> {
    return this.http.put(endpoint + 'edit/'+tiempo.idTiempo,tiempo).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteTiempo(tiempoId: number): Observable<any> {
    return this.http.delete(endpoint + 'delete/'+tiempoId).pipe(
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
