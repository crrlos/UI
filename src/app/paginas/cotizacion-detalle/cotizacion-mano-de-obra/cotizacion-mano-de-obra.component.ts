import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { ManoDeObraComponent } from '../../mano-de-obra/mano-de-obra.component';
import { CotizacionManoDeObraHttpService } from 'src/app/servicios/http/cotizacion-mano-de-obra.service';

@Component({
  selector: "app-cotizacion-mano-de-obra",
  templateUrl: "./cotizacion-mano-de-obra.component.html"
})
export class CotizacionManoDeObraComponent implements OnInit {
  @Input() manodeobra: any[];
  timeout: any;

  @ViewChild(ManoDeObraComponent,{static: true})
  manoDeObraTabla : any;

  display = false;
  cotizacionId : number;

  constructor(
    private route: ActivatedRoute,
    private manoDeObraHttp: CotizacionManoDeObraHttpService
    ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.cotizacionId = params.id;
    })

    this.manoDeObraTabla.tableConfiguration.extraButtons = [
      {
        tooltip : 'Agregar',
        clickEvent: (manodeobra : any) => this.agregarManoDeObra(manodeobra),
        icon: 'pi-plus-circle',
        class: 'p-button-info'
      }
    ];

    this.manoDeObraTabla.tabla.mostrarBotonesBase = false;
  }

  agregarManoDeObra(manodeobra: any){
    console.log(manodeobra);
    
    this.manoDeObraHttp.add({
      manodeobraId : manodeobra.id,
      cotizacionId : this.cotizacionId,
      precio : manodeobra.precio
    })
    .subscribe(r => {
        this.manodeobra.push({
          id : r,
          manodeobraId : manodeobra.id,
          codigo : manodeobra.codigo,
          descripcion : manodeobra.descripcion,
          precio : manodeobra.precio
        });
    });
    
  }


  sumarPrecioManoDeObra(manodeobra :any[]){
    if(!manodeobra) return;

      let total  = 0;

      manodeobra.forEach(e => {
        total += e.precio * 1;
      });
      return total;
  }

  delete(id : number){
    this.manoDeObraHttp.delete(id).subscribe(r => {
      this.manodeobra.splice(this.manodeobra.indexOf(e => e.id == id),1);
    });
    
  }

}
