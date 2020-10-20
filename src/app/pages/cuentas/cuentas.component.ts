import { Component, OnInit } from '@angular/core';
import { Cuenta } from 'src/app/models/cuenta.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: []
})
export class CuentasComponent implements OnInit {

  public totalCuentas: number = 0;
  public cuentas: Cuenta[] = [];

  public cuentasTemp: Cuenta[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private cuentaService: CuentaService,
    private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarCuentas();
  }

  cargarCuentas() {
    this.cargando = true
    this.cuentaService.getCuentas(this.desde)
      .subscribe(({ total, cuentas }) => {

        this.totalCuentas = total;
        this.cuentas = cuentas;
        this.cuentasTemp = cuentas;
        this.cargando = false
      });
  }

  cambiarPagina(valor: number) {

    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalCuentas) {
      this.desde -= valor;
    }
    this.cargarCuentas();
  }

  buscar(termino: string) {
    if (termino.length == 0) {
      return this.cuentas = this.cuentasTemp;
    }
    this.busquedasService.buscar('cuentas', termino)
      .subscribe((resp:any) => {
        this.cuentas = resp;
      });
  }

  eliminarCuenta(cuenta: Cuenta) {

    if (cuenta.uid === this.cuentaService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }
    Swal.fire({
      title: 'Borrar cuenta?',
      text: `Esta a punto de borrar a ${cuenta.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'

    }).then((result) => {
      if (result.isConfirmed) {
        this.cuentaService.eliminarCuenta(cuenta)
          .subscribe(resp => {
            this.cargarCuentas();
            Swal.fire(
              'Borrado!',
              'La cuenta ha sido borrada',
              'success'
            );
          });
      }
    })

  }

}
