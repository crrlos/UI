import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { CotizacionEquiposHttpService } from "src/app/servicios/http/cotizacion-equipos.service";
import { EquiposComponent } from '../../equipos/equipos.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-cotizacion-equipos",
  templateUrl: "./cotizacion-equipos.component.html"
})
export class CotizacionEquiposComponent implements OnInit {
  @Input() equipos: any[];
  timeout: any;

  @ViewChild(EquiposComponent,{static: true})
  equiposTabla : any;

  display = false;
  cotizacionId : number;

  constructor(
    private route: ActivatedRoute,
    private equipoHttp: CotizacionEquiposHttpService
    ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.cotizacionId = params.id;
    })

    this.equiposTabla.tableConfiguration.extraButtons = [
      {
        tooltip : 'Agregar',
        clickEvent: (equipo : any) => this.agregarEquipo(equipo),
        icon: 'pi-plus-circle',
        class: 'p-button-info'
      }
    ];

    this.equiposTabla.tabla.mostrarBotonesBase = false;
  }

  agregarEquipo(equipo: any){

    this.equipoHttp.add({
      equipoId : equipo.id,
      cotizacionId : this.cotizacionId,
      precioVenta : equipo.precio
    })
    .subscribe(r => {
        this.equipos.push({
          id : r,
          equipoId : equipo.id,
          codigo : equipo.codigo,
          nombreEquipo : equipo.nombre,
          capacidad : equipo.capacidad,
          tecnologia : equipo.tecnologia,
          precioBase : equipo.precio,
          precioVenta : equipo.precio
        });
    });
    
  }

  actualizar(equipo: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {

      if(isNaN(equipo.precioVenta) || equipo.precioVenta <= 0)
        {
          equipo.precioVenta = equipo.precioBase;
          return;
        }

      equipo.cargando = true;
      this.equipoHttp.update(equipo).subscribe((r) => {
        equipo.cargando = false;
      });
    }, 1000);
  }

  sumarPrecioEquipos(equipos :any[]){
    if(!equipos) return;

      let total  = 0;

      equipos.forEach(e => {
        total += e.precioVenta * 1;
      });
      return total;
  }

}
