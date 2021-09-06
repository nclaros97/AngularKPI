import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Area } from 'src/app/pages/areas/models/area';
import { Usuario } from '../components/user-panel/models/user';
import { Agencia } from '../../pages/agencias/models/agencia';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { apis } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

export interface IUser {
  email: string;
  avatarUrl?: string,
  idArea?: number,
  idAreaNavigation?: Area,
  usuarioTipo?: string,
  idAgencia?: number
  idAgenciaNavigation?: Agencia
}

const defaultPath = '/';
const defaultUser = new Usuario;
const endpoint = apis.kpiApi;
@Injectable()
export class AuthService {
  private _user: IUser | null = defaultUser;
  get loggedIn(): boolean {
    return !!this._user;
  }
  data =
    {
      isSuccess: false,
      message: "Invalid Username And Password",
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

      const promise = new Promise((resolve, reject) => {
        const apiURL = endpoint + '/api/usuarios/login/';
        this.http
          .post<Usuario>(apiURL, {email,password})
          .toPromise()
          .then((res: any) => {
            // Success
            this.data.data = res.data;

            this._user = res;
            this.router.navigate([this._lastAuthenticatedPath]);
            this.data.isSuccess = res.data.isSuccess;
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
        message: "Authentication failed"
      };
    }
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
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
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
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

    return isLoggedIn || isAuthForm;
  }
}
