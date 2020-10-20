import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[]= [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu:[
        {titulo: 'Main', url: '/'},
        {titulo: 'Cuentas', url: 'cuentas'},
        {titulo: 'Crear cuenta', url: 'crear-cuenta'},
        {titulo: 'Personas', url: 'personas'},
        {titulo: 'Denuncias', url: 'denuncias'},
        {titulo: 'Graficas', url: 'grafica1'},
      ]
    }
  ];

  constructor() { }
}
