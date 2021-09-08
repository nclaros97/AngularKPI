import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { apis } from 'src/environments/environment';
import { Usuario } from 'src/app/shared/components/user-panel/models/user';
import { TipoUsuario } from '../models/tipoUsuario';

const endpoint = apis.kpiApi;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  tiposUsuario: TipoUsuario[] = [{
    id: 1,
    tipo: "Admin",

  },
  {
    id: 2,
    tipo: "User"
  }
  ];
  constructor(private http: HttpClient) { }

  getTiposUsuarios(): TipoUsuario[] {
    return this.tiposUsuario;
  }

  getUsuarios(): Observable<any> {
    return this.http.get(endpoint + '/api/usuarios').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  addUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(endpoint + '/api/usuarios/add',usuario).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(endpoint + '/api/usuarios/edit/'+usuario.idUsuario,usuario).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  deleteUsuario(areaId: number): Observable<any> {
    debugger;
    return this.http.delete(endpoint + '/api/usuarios/delete/'+areaId).pipe(
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
