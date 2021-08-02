import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { AgenciasComponent } from './pages/agencias/agencias.component';
import { AgenciaService } from './pages/agencias/services/agencia.service';
import { HttpClientModule } from '@angular/common/http';
import { AreasComponent } from './pages/areas/areas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DxDataGridModule } from 'devextreme-angular';
import { ObjetivosComponent } from './pages/objetivos/objetivos.component';

@NgModule({
  declarations: [
    AppComponent,
    AgenciasComponent,
    AreasComponent,
    ObjetivosComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    DxDataGridModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, AgenciaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
