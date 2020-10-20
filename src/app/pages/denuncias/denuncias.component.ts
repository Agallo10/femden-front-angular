import { Component, OnInit } from '@angular/core';
import { Denuncia } from 'src/app/models/denuncia.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { DenunciasService } from 'src/app/services/denuncias.service';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styles: [
  ]
})
export class DenunciasComponent implements OnInit {

  public totalDenuncias: number = 0;
  public denuncias: Denuncia[] = [];

  public denunciasTemp: Denuncia[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private denunciasService: DenunciasService,
    private busquedasService: BusquedasService) { }


  ngOnInit(): void {
    this.cargarDenuncias();
  }

  cargarDenuncias() {
    this.cargando = true
    this.denunciasService.getDenuncias(this.desde)
      .subscribe(({ total, denuncias }) => {

        this.totalDenuncias = total;
        this.denuncias = denuncias;
        this.denunciasTemp = denuncias;
        this.cargando = false
      });
  }

  buscar(termino: string) {
    if (termino.length == 0) {
      return this.denuncias = this.denunciasTemp;
    }
    this.busquedasService.buscar('denuncias', termino)
      .subscribe((resp: any) => {
        this.denuncias = resp;
      });
  }

  cambiarPagina(valor: number) {

    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalDenuncias) {
      this.desde -= valor;
    }
    this.cargarDenuncias();
  }

}
