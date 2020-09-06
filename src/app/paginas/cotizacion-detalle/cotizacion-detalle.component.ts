import { Component, OnInit } from '@angular/core';
import { CotizacionEquiposHttpService } from 'src/app/servicios/http/cotizacion-equipos.service';
import { ActivatedRoute } from '@angular/router';
import { CotizacionMaterialesHttpService } from 'src/app/servicios/http/cotizacion-materiales.service';
import { CotizacionManoDeObraHttpService } from 'src/app/servicios/http/cotizacion-mano-de-obra.service';

@Component({
  selector: 'app-cotizacion-detalle',
  templateUrl: './cotizacion-detalle.component.html',
  styles:[`
      th,td{
               text-align: right;
            }`]
})
export class CotizacionDetalleComponent implements OnInit {

  data : any = {
    equipos: [],
    materiales: [],
    manoDeObra: []
  };

  constructor(
    private cotizacionEquiposService : CotizacionEquiposHttpService,
    private cotizacionMaterialService : CotizacionMaterialesHttpService,
    private cotizacionManoDeObraService : CotizacionManoDeObraHttpService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params =>{

      this.cotizacionEquiposService.details(params.id).subscribe((data : any) => {
        this.data.equipos = data;
      });

      this.cotizacionMaterialService.details(params.id).subscribe((data : any) => {
        this.data.materiales = data;
      });

      this.cotizacionManoDeObraService.get(params.id).subscribe((data : any) => {
        this.data.manodeobra = data;
      });

    });

    
  }

  costoGanancia(coleccion : any[], propiedad : string){
    let costo = 0;

    coleccion.forEach(c => {
      costo += c[propiedad] * 1;
    });

    return costo;
  }

  total(){
    return this.costoGanancia(this.data.equipos,'precioVenta') -
           this.costoGanancia(this.data.equipos,'precioBase') +
           this.costoGanancia(this.data.materiales,'precioVenta') -
           this.costoGanancia(this.data.materiales,'precioBase') +
           this.costoGanancia(this.data.manodeobra,'precio')
           ;
  }
}
