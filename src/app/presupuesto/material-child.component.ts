import { Component, OnInit, Input } from '@angular/core';
import {Equipo,Ubicacion,EquipoUbicacion,EquipoUbicacionMaterial,Material} from './clases';
@Component({
  selector: 'app-material-child',
  templateUrl: './material-child.component.html'
})
export class MaterialChildComponent implements OnInit {
  @Input() equipos:Equipo[];
  @Input() ubicaciones:Ubicacion[];
  @Input() equipo_ubicacion:EquipoUbicacion[];

  equipo_ubicacion_material:EquipoUbicacionMaterial[];
  materiales:Material[] = [];
  ubicacionSeleccionada:Ubicacion = {};

  equipos_ubicacion:Equipo[] = [];

  actualizarEquipos(){
    this.equipos_ubicacion = [];
    this.equipo_ubicacion.forEach(eu=>{
      if(eu.ubicacion == this.ubicacionSeleccionada.codigo){
        this.equipos_ubicacion.push(this.equipos.find(e=>{return e.codigo == eu.equipo;}));
      }
    });
  }
  ngOnInit(){
    this.materiales.push({
      codigo:1,nombre:"material 1",precio:10
    });
  }
}
