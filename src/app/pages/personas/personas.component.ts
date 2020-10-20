import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { PersonasService } from 'src/app/services/personas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: []
})
export class PersonasComponent implements OnInit {

  public totalPersonas: number = 0;
  public personas: Persona[] = [];

  public personasTemp: Persona[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private personasService: PersonasService,
               private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarPersonas();
  }

  cargarPersonas() {
    this.cargando = true
    this.personasService.getPersonass(this.desde)
      .subscribe(({ total, personas }) => {

        this.totalPersonas = total;
        this.personas = personas;
        this.personasTemp = personas;
        this.cargando = false
      });
  }

  cambiarPagina(valor: number) {

    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalPersonas) {
      this.desde -= valor;
    }
    this.cargarPersonas();
  }

  buscar(termino: string) {
    if (termino.length == 0) {
      return this.personas = this.personasTemp;
    }
    this.busquedasService.buscar('personas', termino)
      .subscribe((resp:any) => {
        this.personas = resp;
      });
  }

  eliminarPersona(persona: Persona) {

    if (persona.uid === this.personasService.uid) {
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }
    Swal.fire({
      title: 'Borrar persona?',
      text: `Esta a punto de borrar a ${persona.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarla!'

    }).then((result) => {
      if (result.isConfirmed) {
        this.personasService.eliminarPersona(persona)
          .subscribe(resp => {
            this.cargarPersonas();
            Swal.fire(
              'Borrado!',
              'La persona ha sido borrada',
              'success'
            );
          });
      }
    })

  }

}
