import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { apis } from 'src/environments/environment';
import { Area } from '../models/area';

const endpoint = apis.kpiApi;

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }

  getAreas(): Observable<any> {
    return this.http.get(endpoint + '/api/areas').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  addArea(area: Area): Observable<any> {
    return this.http.post(endpoint + '/api/areas/add',area).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateArea(area: Area): Observable<any> {
    return this.http.put(endpoint + '/api/areas/edit/'+area.idArea,area).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteArea(areaId: number): Observable<any> {
    return this.http.delete(endpoint + '/api/areas/delete/'+areaId).pipe(
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
