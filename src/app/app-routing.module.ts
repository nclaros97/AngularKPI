import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { AgenciasComponent } from './pages/agencias/agencias.component';
import { AreasComponent } from './pages/areas/areas.component';
import { ObjetivosComponent } from './pages/objetivos/objetivos.component';
import { IndicadoresComponent } from './pages/indicadores/indicadores.component';
import { TiemposComponent } from './pages/tiempos/tiempos.component';

const routes: Routes = [
  {
    path: 'agencias',
    component: AgenciasComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'areas',
    component: AreasComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'objetivos',
    component: ObjetivosComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'indicadores',
    component: IndicadoresComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'tiempos',
    component: TiemposComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'inicio',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, TasksComponent]
})
export class AppRoutingModule { }
