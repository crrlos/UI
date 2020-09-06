import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { MaterialesComponent } from '../../materiales/materiales.component';
import { CotizacionMaterialesHttpService } from 'src/app/servicios/http/cotizacion-materiales.service';

@Component({
  selector: "app-cotizacion-materiales",
  templateUrl: "./cotizacion-materiales.component.html"
})
export class CotizacionMaterialesComponent implements OnInit {
  @Input() materiales: any[];
  timeout: any;

  @ViewChild(MaterialesComponent,{static: true})
  materialesTabla : any;

  display = false;
  cotizacionId : number;

  constructor(
    private route: ActivatedRoute,
    private materialHttp: CotizacionMaterialesHttpService
    ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.cotizacionId = params.id;
    })

    this.materialesTabla.tableConfiguration.extraButtons = [
      {
        tooltip : 'Agregar',
        clickEvent: (material : any) => this.agregarMaterial(material),
        icon: 'pi-plus-circle',
        class: 'p-button-info'
      }
    ];

    this.materialesTabla.tabla.mostrarBotonesBase = false;
  }

  agregarMaterial(material: any){
    console.log(material);
    
    this.materialHttp.add({
      materialId : material.id,
      cotizacionId : this.cotizacionId,
      precioVenta : material.precio
    })
    .subscribe(r => {
        this.materiales.push({
          id : r,
          materialId : material.id,
          codigo : material.codigo,
          nombre : material.nombre,
          precioBase : material.precio,
          precioVenta : material.precio
        });
    });
    
  }

  actualizar(material: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {

      if(isNaN(material.precioVenta) || material.precioVenta <= 0)
        {
          material.precioVenta = material.precioBase;
          return;
        }
      material.cotizacionId = this.cotizacionId;
      material.cargando = true;
      this.materialHttp.update(material).subscribe((r) => {
        material.cargando = false;
      });
    }, 1000);
  }

  sumarPrecioMateriales(materiales :any[]){
    if(!materiales) return;

      let total  = 0;

      materiales.forEach(e => {
        total += e.precioVenta * 1;
      });
      return total;
  }
  delete(id : number){
    this.materialHttp.delete(id).subscribe(r => {
      this.materiales.splice(this.materiales.indexOf(e => e.id == id),1);
    });
    
  }

}
