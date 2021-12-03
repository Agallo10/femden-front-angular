import { Component } from '@angular/core';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Grafica } from 'src/app/models/graficas.model';
import { DenunciasService } from 'src/app/services/denuncias.service';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

  private grafica: Grafica;
  public barChartData:  ChartDataSets[]=[];

  constructor(private denunciasService: DenunciasService) { }


  ngOnInit(): void {
    this.cargarGraficas();
    
  }

  cargarGraficas() {
    this.denunciasService.getGraficas()
      .subscribe((graficas ) => {

        this.grafica = graficas;
        console.log(this.grafica);
        this.barChartData = [{data: [
          this.grafica[0], 
          this.grafica[1], 
          this.grafica[2], 
          this.grafica[3], 
          this.grafica[4],
        0],
 
          label: 'Cantidad de denuncias realizadas'}]
      });
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = [

    'Violencia Física ', 
    'Violencia Psicológica', 
    'Violencia Patrimonial',
    'Violencia Económica', 
    'Violencia Sexual',
    
];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  //public barChartPlugins = [pluginDataLabels];


  // public barChartData: ChartDataSets[] = [
  //   { data: [2, 4, 4, 1, 8], label: 'Cantidad de denuncias realizadas' }
  // ];


}
