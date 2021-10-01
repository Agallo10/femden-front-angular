import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { PersonasComponent } from './personas/personas.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { DenunciaComponent } from './denuncias/denuncia.component';
import { CrearCuentaComponent } from './cuentas/crear-cuenta.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';


const childRoutes: Routes = [
  {path: '',  component: DashboardComponent},
  {path: 'grafica1',  component: Grafica1Component, data: {titulo: 'Grafica'}},
  {path: 'perfil',  component: PerfilComponent, data: {titulo: 'Perfil'}},
  {path: 'personas',  component: PersonasComponent, data: {titulo: 'Personas'}},
  {path: 'denuncias',  component: DenunciasComponent, data: {titulo: 'Denuncias'}},
  {path: 'denuncias/denuncia/:id',  component: DenunciaComponent, data: {titulo: 'Denuncia'}},

  //Rutas de admin
  {path: 'cuentas', canActivate: [AdminGuard], component: CuentasComponent, data: {titulo: 'Cuentas'}},
  {path: 'crear-cuenta', canActivate: [AdminGuard], component: CrearCuentaComponent, data: {titulo: 'Crear cuenta'}},
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
