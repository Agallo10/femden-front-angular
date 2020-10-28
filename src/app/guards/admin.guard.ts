import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CuentaService } from '../services/cuenta.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private cuentaService: CuentaService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      console.log('Ruta de admin');

     if (this.cuentaService.rol === '5f9738ae40cb934fbccd96d6') {
       return true;
     } else {
       this.router.navigateByUrl('/dashboard');
       return false;
     }
  }
  
}
