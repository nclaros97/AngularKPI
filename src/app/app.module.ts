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
import { ObjetivosComponent } from './pages/objetivos/objetivos.component';
import {
  DxNumberBoxModule,
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxScrollViewModule,
  DxDataGridModule,
  DxFormModule,
  DxTextAreaModule,
  DxLookupModule,
  DxDropDownBoxModule,
  DxTabPanelModule,
  DxButtonModule,
  DxPopupModule,
  DxTextBoxModule,
  DxCircularGaugeModule
} from 'devextreme-angular';
import { IndicadoresComponent } from './pages/indicadores/indicadores.component';
import { TiemposComponent } from './pages/tiempos/tiempos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AgenciasComponent,
    AreasComponent,
    ObjetivosComponent,
    IndicadoresComponent,
    TiemposComponent,
    UsuariosComponent
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
    DxDataGridModule,
    DxScrollViewModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxFormModule,
    DxTextAreaModule,
    DxLookupModule,
    DxDropDownBoxModule,
    DxTabPanelModule,
    DxButtonModule,
    DxPopupModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxCircularGaugeModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, AgenciaService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
