import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AuthService, IUser } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
import { Usuario } from '../user-panel/models/user';
import { UsuariosService } from 'src/app/pages/usuarios/services/usuarios.service';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  user: IUser | null = { email: '' };

  userMenuItems = [{
    text: 'Profile',
    icon: 'user',
    onClick: () => {
      this.router.navigate(['/profile']);
    }
  },
  {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    }
  }];

  constructor(private authService: AuthService, private router: Router,private datePipe: DatePipe,private userService: UsuariosService) { }

  ngOnInit() {
    this.authService.getUser().then((e) =>{
      this.user = e.data
      this.authService.getUserById(this.user!.userId||0).subscribe((res:Usuario)=>{
        let fechaActual = this.datePipe.transform(new Date,"yyyy-MM-dd");
        let fechaUser = this.datePipe.transform(res.fechaNuevoPassword,"yyyy-MM-dd");
      if(res.nuevoPassword && fechaActual == fechaUser){
        this.authService.logOut();
        res.nuevoPassword = false;
        this.userService.updateUsuario(res).subscribe((res=>{

        }));
      }
    });
    });

  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
