import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from "@angular/router";

import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CuentasComponent } from './cuentas/cuentas.component';
import { PersonasComponent } from './personas/personas.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { DenunciaComponent } from './denuncias/denuncia.component';
import { CrearCuentaComponent } from './cuentas/crear-cuenta.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    PerfilComponent,
    CuentasComponent,
    PersonasComponent,
    DenunciasComponent,
    DenunciaComponent,
    CrearCuentaComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    PerfilComponent,
    CuentasComponent,
    PersonasComponent,
    DenunciasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
