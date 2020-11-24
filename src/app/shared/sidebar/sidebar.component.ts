import { Component } from '@angular/core';
import { Cuenta } from 'src/app/models/cuenta.model';
import { CuentaService } from 'src/app/services/cuenta.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent  {

  public cuenta: Cuenta;

  constructor(public sidebarService: SidebarService, private cuentaService: CuentaService) {

    this.cuenta = cuentaService.cuenta;

   }

   logout(){
    this.cuentaService.logout();
  }

}
