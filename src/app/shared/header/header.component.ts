import { Component } from '@angular/core';
import { CuentaService } from 'src/app/services/cuenta.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(private cuentaService: CuentaService) { }

  logout(){
    this.cuentaService.logout();
  }

}
