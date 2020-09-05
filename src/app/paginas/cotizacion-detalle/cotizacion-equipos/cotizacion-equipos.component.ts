import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { CotizacionEquiposHttpService } from "src/app/servicios/http/cotizacion-equipos.service";
import { EquiposComponent } from '../../equipos/equipos.component';

@Component({
  selector: "app-cotizacion-equipos",
  templateUrl: "./cotizacion-equipos.component.html"
})
export class CotizacionEquiposComponent implements OnInit {
  @Input() equipos: any;
  timeout: any;

  @ViewChild(EquiposComponent,{static: true})
  equiposTabla : any;

  display = false;

  constructor(
    private equipoHttp: CotizacionEquiposHttpService
    ) {}

  ngOnInit(): void {
    this.equiposTabla.tableConfiguration.extraButtons = [
      {
        tooltip : 'Agregar',
        clickEvent: this.agregarEquipo,
        icon: 'pi-plus-circle',
        class: 'p-button-info'
      }
    ];

    this.equiposTabla.tabla.mostrarBotonesBase = false;
  }

  agregarEquipo(equipo: any){
    console.log(equipo);
    
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
