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

  menuItems: any[];

  public cuenta: Cuenta;

  constructor(private sidebarService: SidebarService, private cuentaService: CuentaService) {

    this.menuItems = sidebarService.menu;

    console.log(this.menuItems);

    this.cuenta = cuentaService.cuenta;

   }

}
