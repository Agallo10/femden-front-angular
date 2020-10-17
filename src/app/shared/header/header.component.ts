import { Component } from '@angular/core';
import { Cuenta } from 'src/app/models/cuenta.model';
import { CuentaService } from 'src/app/services/cuenta.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public cuenta: Cuenta;
  
  constructor(private cuentaService: CuentaService) {
    this.cuenta = cuentaService.cuenta
   }

  logout(){
    this.cuentaService.logout();
  }

}
