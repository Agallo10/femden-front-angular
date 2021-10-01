import { Component, OnInit } from '@angular/core';
import { Denuncia } from 'src/app/models/denuncia.model';
import { Persona } from 'src/app/models/persona.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { DenunciasService } from 'src/app/services/denuncias.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styles: [
  ]
})
export class DenunciasComponent implements OnInit {

  public totalDenuncias: number = 0;
  public denuncias: Denuncia[] = [];
  public personas: Persona[] = [];

  public denunciasTemp: Denuncia[] = [];
  public personasTemp: Persona[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private denunciasService: DenunciasService,
    private busquedasService: BusquedasService, 
    private cuentaService: CuentaService,
    private personasService: PersonasService) { }


  ngOnInit(): void {
    this.cargarDenuncias();
    this.cargarPersonas();
    //console.log(this.cuentaService.tipoEntidad);
  }
  //admin@gmail.com

  cargarDenuncias() {
    this.cargando = true
    this.denunciasService.getDenunciasTipo(this.desde,this.cuentaService.tipoEntidad)
      .subscribe(({ total, denuncias }) => {

        this.totalDenuncias = total;
        this.denuncias = denuncias;
        this.denunciasTemp = denuncias;
        this.cargando = false
      });
  }

  cargarPersonas() {
    this.cargando = true
    this.personasService.getPersonass(this.desde)
      .subscribe(({ total, personas }) => {

        this.personas = personas;
        this.personasTemp = personas;
        this.cargando = false
      });
  }

  buscar(termino: string) {
    if (termino.length == 0) {
      return this.denuncias = this.denunciasTemp;
    }
    this.busquedasService.buscar('personas', termino)
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
