import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Area } from 'src/app/pages/areas/models/area';
import { Usuario } from '../components/user-panel/models/user';
import { Agencia } from '../../pages/agencias/models/agencia';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { apis } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { navigation } from 'src/app/app-navigation';
import notify from 'devextreme/ui/notify';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const jwt = new JwtHelperService();

export interface IUser {
  userId?: number
  email: string;
  avatarUrl?: string,
  idArea?: number,
  idAreaNavigation?: Area,
  tipo?: string,
  idAgencia?: number
  idAgenciaNavigation?: Agencia
}

const defaultPath = '/';
const defaultUser = new Usuario;
const endpoint = apis.kpiApi;
@Injectable()
export class AuthService {
  private _user: IUser | null = defaultUser;
  private decodedToken: any;
  get loggedIn(): boolean {
    return !!this._user;
  }
  data =
    {
      isSuccess: false,
      message: "",
      data: {}
    };

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient) { }

  async logIn(email: string, password: string) {
    try {
      // Send request
      console.log(email, password);

      const promise = await new Promise((resolve, reject) => {
        const apiURL = endpoint + '/api/usuarios/login/';
        this.http
          .post<Usuario>(apiURL, { email, password })
          .toPromise()
          .then((res: any) => {
            // Success
            this.data.data = res.data;
            this.router.navigate([this._lastAuthenticatedPath]);
            this.data.isSuccess = res.isSuccess;
            this.data.message = res.message;
            if (res.isSuccess) {
              this.saveToken(res.data.token);
            }
            resolve(this.data);

          },
            err => {
              // Error
              this.data.isSuccess = false;
              reject(err);
            }
          );
      });
      return this.data;
    }
    catch {
      return {
        isSuccess: false,
        message: "Error de conexión"
      };
    }
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    this._user = this.decodedToken;
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  async getUser() {
    try {
      // Send request
      this._user = JSON.parse(localStorage.getItem('auth_meta')!);
      if (this._user == undefined) {
        return {
          isOk: false,
          data: this._user
        };
      }
      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false,
        data: this._user
      };
    }
  }

  getUserById(id: number){
    return this.http.get(apis.kpiApi + '/api/usuarios/' + id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  async createAccount(email: string, password: string) {
    try {
      // Send request
      console.log(email, password);

      this.router.navigate(['/create-account']);
      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to create account"
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request
      console.log(email, recoveryCode);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to change password"
      }
    };
  }

  async resetPassword(email: string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this._user = null;
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
    localStorage.removeItem('menuData');
    this.router.navigate(['/login-form']);
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

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const accesos = navigation;
    const isLoggedIn = this.authService.loggedIn;
    let userRol = "";
    if (isLoggedIn) {
      let userData = JSON.parse(localStorage.getItem('auth_meta')!);
      userRol = userData.tipo;
    }

    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }
    let pag = route.routeConfig?.path;
    let tieneAcceso = true;
    accesos.forEach(acceso => {
      acceso.items!.forEach(item => {
        if (item.path == "/" + pag) {
          if (item.roles.find(x => x.rol == userRol) == undefined) {
            this.authService.lastAuthenticatedPath = defaultPath;
            this.router.navigate([defaultPath]);
            notify("No tiene acceso a esta página", 'error', 2000);
            tieneAcceso = false;
          }
        }
      });
    });

    return isLoggedIn || isAuthForm /* || tieneAcceso */;
  }
}
