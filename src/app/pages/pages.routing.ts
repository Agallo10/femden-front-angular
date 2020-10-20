import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { PersonasComponent } from './personas/personas.component';
import { DenunciasComponent } from './denuncias/denuncias.component';
import { DenunciaComponent } from './denuncias/denuncia.component';
import { CrearCuentaComponent } from './cuentas/crear-cuenta.component';


const routes: Routes = [

    {
        path: 'dashboard',  
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          {path: '',  component: DashboardComponent},
          {path: 'grafica1',  component: Grafica1Component, data: {titulo: 'Grafica'}},
          {path: 'perfil',  component: PerfilComponent, data: {titulo: 'Perfil'}},
          {path: 'cuentas',  component: CuentasComponent, data: {titulo: 'Cuentas'}},
          {path: 'crear-cuenta',  component: CrearCuentaComponent, data: {titulo: 'Crear cuenta'}},
          {path: 'personas',  component: PersonasComponent, data: {titulo: 'Personas'}},
          {path: 'denuncias',  component: DenunciasComponent, data: {titulo: 'Denuncias'}},
          {path: 'denuncia/:id',  component: DenunciaComponent, data: {titulo: 'Denuncia'}},
        ]
      },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
