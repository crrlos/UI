import { Component, OnInit } from '@angular/core';
import { CotizacionEquiposHttpService } from 'src/app/servicios/http/cotizacion-equipos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cotizacion-detalle',
  templateUrl: './cotizacion-detalle.component.html'
})
export class CotizacionDetalleComponent implements OnInit {

  data : any= {};

  constructor(
    private cotizacionEquiposService : CotizacionEquiposHttpService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params =>{
      this.cotizacionEquiposService.getDetails(params.id).subscribe((data : any) => {
        this.data.equipos = data;
      });
    });

    
  }

}
