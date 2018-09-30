import { Component, OnInit, Input } from '@angular/core';
import { Equipo, Ubicacion, EquipoUbicacion } from '../interfaces';
@Component({
  selector: 'app-equipo-child',
  templateUrl: './equipo-child.component.html',
  styleUrls: ['./equipo-child.component.css']
})
export class EquipoChildComponent implements OnInit {

  @Input() ubicaciones: Ubicacion[] = [];
  @Input() equipos: Equipo[];
  @Input() equiposUbicacion: EquipoUbicacion[] = [];

  txtBuscar: String;
  equipoSeleccionado: Equipo = {};
  equipos_filtro: Equipo[] = [];
  checked = false;
  ubicacionSeleccionada: Ubicacion;
  cambioUbicacion: Ubicacion = {};
  detalle_equipo_ubi: any[] = [];
  equipoUbicacionSeleccionado: EquipoUbicacion;



  editaEquipo = false;
  actualizar() {
    this.equipos_filtro = this.equipos.filter(f => {
      return f.nombre.toLowerCase().includes(this.txtBuscar.toLowerCase());
    });
  }
  detalle_equipo_ubicacion() {
    this.detalle_equipo_ubi = [];
    this.equiposUbicacion.forEach(e => {
      this.detalle_equipo_ubi.push({
        codigo: e.codigo,
        equipo: this.equipos.find(f => f.codigo === e.equipo),
        ubicacion: this.ubicaciones.find(u => u.codigo === e.ubicacion),
        editable: false
      });
    });
    return this.detalle_equipo_ubi;
  }


  equipos_ubicacion(codigo) {
    return this.equipos.filter(e => e.ubicacion === codigo);
  }
  editarEquipo(codigo) {
    this.equipoUbicacionSeleccionado = this.equiposUbicacion.find(e => e.codigo === codigo);
    const codigo_equipo = this.equipoUbicacionSeleccionado.equipo;
    const codigo_ubicacion = this.equipoUbicacionSeleccionado.ubicacion;
    this.equipoSeleccionado = this.equipos.find(e => e.codigo === codigo_equipo);
    this.ubicacionSeleccionada = this.ubicaciones.find(u => u.codigo === codigo_ubicacion);
    this.editaEquipo = true;
    this.detalle_equipo_ubi.forEach(u => { u.editable = false; });
    this.detalle_equipo_ubi.find(d => d.codigo === codigo).editable = true;
  }
  cancelarEdicionEquipo(codigo) {
    this.editaEquipo = false;
    this.detalle_equipo_ubi.find(d => d.codigo === codigo).editable = false;
  }
  actualizarEquipoUbicacion() {
    this.editaEquipo = false;
    this.detalle_equipo_ubi.forEach(d => { d.editable = false; });
    this.equipoUbicacionSeleccionado.ubicacion = this.ubicacionSeleccionada.codigo;
    this.detalle_equipo_ubi.find(d => d.codigo === this.equipoUbicacionSeleccionado.codigo)
    .ubicacion = this.ubicacionSeleccionada;
  }
  agregarEquipoUbicacion() {
    this.equiposUbicacion.push({
      codigo: this.equiposUbicacion.length === 0 ? 1 : this.equiposUbicacion[this.equiposUbicacion.length - 1].codigo + 1,
      equipo: this.equipoSeleccionado.codigo,
      ubicacion: this.ubicacionSeleccionada.codigo
    });
    this.detalle_equipo_ubicacion();
  }
  constructor() { }

  ngOnInit() {

    this.data().forEach(d => {
      this.equipos.push(d);
    });
    this.equipos_filtro = this.equipos;
    this.equiposUbicacion.push({
      codigo: 1,
      equipo: 1,
      ubicacion: 1
    });
    this.detalle_equipo_ubicacion();
  }
  obtener(equipo) {
    this.equipoSeleccionado = equipo;
  }
  data(): any[] {
    const arreglo = [{
      'codigo': 1,
      'nombre': 'Equipo 1',
      'precio': 500
    },
    {
      'codigo': 2,
      'nombre': 'Equipo 2',
      'precio': 1000
    }];
    return JSON.parse(JSON.stringify(arreglo));
  }

}
