import { Component, OnInit } from '@angular/core';
import { CotizacionEquiposHttpService } from 'src/app/servicios/http/cotizacion-equipos.service';
import { ActivatedRoute } from '@angular/router';
import { CotizacionMaterialesHttpService } from 'src/app/servicios/http/cotizacion-materiales.service';

@Component({
  selector: 'app-cotizacion-detalle',
  templateUrl: './cotizacion-detalle.component.html'
})
export class CotizacionDetalleComponent implements OnInit {

  data : any= {};

  constructor(
    private cotizacionEquiposService : CotizacionEquiposHttpService,
    private cotizacionMaterialService : CotizacionMaterialesHttpService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params =>{
      this.cotizacionEquiposService.details(params.id).subscribe((data : any) => {
        this.data.equipos = data;
      });

      this.cotizacionMaterialService.details(params.id).subscribe((data : any) => {
        this.data.materiales = data;
      });
    });

    
  }

}
