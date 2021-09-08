import { Component } from '@angular/core';
import { Usuario } from 'src/app/shared/components/user-panel/models/user';
import { AuthService } from 'src/app/shared/services';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: [ './profile.component.scss' ]
})

export class ProfileComponent {
  usuario: Usuario;
  colCountByScreen: object;

  constructor(private authService: AuthService) {
    this.usuario = new Usuario();
    this.getUsuarioLogeado();
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }
  async getUsuarioLogeado(): Promise<void>{
    let userData = await this.authService.getUser();
    this.authService.getUserById(userData.data!.userId||0).subscribe(user => {
      this.usuario = user as Usuario;
    });
  }
}
