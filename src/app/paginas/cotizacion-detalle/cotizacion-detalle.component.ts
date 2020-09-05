import { Component, OnInit } from '@angular/core';
import { CotizacionEquiposHttpService } from 'src/app/servicios/http/cotizacion-equipos.service';

@Component({
  selector: 'app-cotizacion-detalle',
  templateUrl: './cotizacion-detalle.component.html'
})
export class CotizacionDetalleComponent implements OnInit {

  data : any= {};

  constructor(private cotizacionEquiposService : CotizacionEquiposHttpService) { }

  ngOnInit(): void {
    this.cotizacionEquiposService.getDetails(17).subscribe((data : any) => {
      this.data.equipos = data;
    });
  }

}
