import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterState, ActivatedRoute } from '@angular/router';
import {CostoHttpService} from 'src/app/servicios/http/costos.service';

@Component({
  selector: 'app-costo',
  templateUrl: './costo.component.html'
})
export class CostoComponent implements OnInit {
  
  costos:any = [];
  costosIndividual:any =[];

  costoSeleccionado:any;
  cantidad:number;

  id;


  agregar(){
    if(this.cantidad <= 0) return;

    let costo = this.costos.find(c => c.detalle == this.costoSeleccionado.detalle);
    
    
    this.http.agregar(this.cantidad, this.costoSeleccionado.id,this.id)
    .subscribe(r=> {

        if(costo){
          costo.cantidad += this.cantidad;
          costo.total = costo.cantidad * costo.costo;
          return;
        }
      let clone = JSON.parse( JSON.stringify(this.costoSeleccionado));
      clone.total = this.cantidad * this.costoSeleccionado.costo;
      clone.cantidad = this.cantidad;
      clone.id = r;
      this.costos.push(clone);
    });
    
  }
 
  constructor(private route: ActivatedRoute, private http: CostoHttpService){
    route.params.subscribe(p=>{
      this.cargarDatos(p.id);
      this.id = p.id;
    });

  }
  eliminar(id){
    this.http.eliminar(id).subscribe(r =>{

      this.costos.splice(this.costos.findIndex(c => c.id == id),1);

    });
  }

  ngOnInit(){
    this.cargarCostos();
  }

 sumarCostos(){
   return this.costos.reduce((i,j) => i + j.total,0);
 }
  cargarDatos(id:number){
      this.http.datos(id).subscribe((r:any) => {
        this.costos = r.detalle;
        

      });
  }
  cargarCostos(){
    this.http.costos().subscribe((costos:any) => {
     this.costosIndividual = costos
    });
  }
  

}