import { Component, OnInit, Input } from '@angular/core';
import {Equipo,Ubicacion,EquipoUbicacion} from './clases';
@Component({
  selector: 'app-equipo-child',
  templateUrl: './equipo-child.component.html',
  styleUrls: ['./equipo-child.component.css']
})
export class EquipoChildComponent implements OnInit {

  @Input() ubicaciones: Ubicacion[] = [];
  @Input() equipos:Equipo[];
  @Input() equiposUbicacion:EquipoUbicacion[] = [];

  txtBuscar: String;
  equipoSeleccionado: Equipo = {};
  equipos_filtro: Equipo[] = [];
  checked = false;
  ubicacionSeleccionada: Ubicacion;
  //equiposUbicacion: EquipoUbicacion[] = [];
  cambioUbicacion: Ubicacion = {};
  detalle_equipo_ubi: any[] = [];
  equipoUbicacionSeleccionado: EquipoUbicacion;



  editaEquipo: boolean = false;
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
        equipo: this.equipos.find(f => { return f.codigo == e.equipo; }),
        ubicacion: this.ubicaciones.find(u => { return u.codigo == e.ubicacion }),
        editable: false
      });
    });
    return this.detalle_equipo_ubi;
  }


  equipos_ubicacion(codigo) {
    return this.equipos.filter(e => { return e.ubicacion == codigo; });
  }
  editarEquipo(codigo) {
    this.equipoUbicacionSeleccionado = this.equiposUbicacion.find(e => { return e.codigo == codigo; });
    let codigo_equipo = this.equipoUbicacionSeleccionado.equipo;
    let codigo_ubicacion = this.equipoUbicacionSeleccionado.ubicacion;
    this.equipoSeleccionado = this.equipos.find(e => { return e.codigo == codigo_equipo; });
    this.ubicacionSeleccionada = this.ubicaciones.find(u => { return u.codigo == codigo_ubicacion; });
    this.editaEquipo = true;
    this.detalle_equipo_ubi.forEach(u => { u.editable = false; });
    this.detalle_equipo_ubi.find(d => { return d.codigo == codigo; }).editable = true;
  }
  cancelarEdicionEquipo(codigo) {
    this.editaEquipo = false;
    this.detalle_equipo_ubi.find(d => { return d.codigo == codigo; }).editable = false;
  }
  actualizarEquipoUbicacion() {
    this.editaEquipo = false;
    this.detalle_equipo_ubi.forEach(d => { d.editable = false; });
    this.equipoUbicacionSeleccionado.ubicacion = this.ubicacionSeleccionada.codigo;
    this.detalle_equipo_ubi.find(d => { return d.codigo == this.equipoUbicacionSeleccionado.codigo; }).ubicacion = this.ubicacionSeleccionada;
  }
  agregarEquipoUbicacion() {
    this.equiposUbicacion.push({
      codigo: this.equiposUbicacion.length == 0 ? 1 : this.equiposUbicacion[this.equiposUbicacion.length - 1].codigo + 1,
      equipo: this.equipoSeleccionado.codigo,
      ubicacion: this.ubicacionSeleccionada.codigo
    });
    this.detalle_equipo_ubicacion();
  }
  constructor() { }

  ngOnInit() {

     this.data().forEach(d=>{
       this.equipos.push(d);
     });
    this.equipos_filtro = this.equipos;
    this.equiposUbicacion.push({
      codigo:1,
      equipo:1,
      ubicacion:1
    });
    this.detalle_equipo_ubicacion();
    //console.log(this.equipo_ubicacion)
  }
  obtener(equipo){
    this.equipoSeleccionado = equipo;
  }
  data():any[] {
    let arreglo = [{
      "codigo": 1,
      "ubicacion": "quis",
      "nombre": "In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat.",
      "cantidad": 11,
      "precio": 59.11
    }, {
      "codigo": 2,
      "ubicacion": "in",
      "nombre": "Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
      "cantidad": 77,
      "precio": 81.03
    }, {
      "codigo": 3,
      "ubicacion": "venenatis",
      "nombre": "Proin risus. Praesent lectus.",
      "cantidad": 63,
      "precio": 92.17
    }, {
      "codigo": 4,
      "ubicacion": "porttitor",
      "nombre": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien.",
      "cantidad": 35,
      "precio": 92.28
    }, {
      "codigo": 5,
      "ubicacion": "quis",
      "nombre": "Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
      "cantidad": 30,
      "precio": 87.0
    }, {
      "codigo": 6,
      "ubicacion": "arcu",
      "nombre": "Proin eu mi. Nulla ac enim.",
      "cantidad": 35,
      "precio": 48.06
    }, {
      "codigo": 7,
      "ubicacion": "rhoncus",
      "nombre": "Praesent blandit. Nam nulla.",
      "cantidad": 48,
      "precio": 87.23
    }, {
      "codigo": 8,
      "ubicacion": "nulla",
      "nombre": "Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
      "cantidad": 73,
      "precio": 64.36
    }, {
      "codigo": 9,
      "ubicacion": "erat",
      "nombre": "Vestibulum sed magna at nunc commodo placerat. Praesent blandit.",
      "cantidad": 50,
      "precio": 54.13
    }, {
      "codigo": 10,
      "ubicacion": "amet",
      "nombre": "Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.",
      "cantidad": 65,
      "precio": 90.41
    }, {
      "codigo": 11,
      "ubicacion": "ultrices",
      "nombre": "Nulla tellus. In sagittis dui vel nisl.",
      "cantidad": 97,
      "precio": 30.74
    }, {
      "codigo": 12,
      "ubicacion": "magna",
      "nombre": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.",
      "cantidad": 65,
      "precio": 68.94
    }, {
      "codigo": 13,
      "ubicacion": "blandit",
      "nombre": "Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.",
      "cantidad": 24,
      "precio": 37.27
    }, {
      "codigo": 14,
      "ubicacion": "lacus",
      "nombre": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.",
      "cantidad": 23,
      "precio": 20.09
    }, {
      "codigo": 15,
      "ubicacion": "semper",
      "nombre": "In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
      "cantidad": 32,
      "precio": 23.2
    }, {
      "codigo": 16,
      "ubicacion": "ac",
      "nombre": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.",
      "cantidad": 75,
      "precio": 98.98
    }, {
      "codigo": 17,
      "ubicacion": "quis",
      "nombre": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
      "cantidad": 51,
      "precio": 70.51
    }, {
      "codigo": 18,
      "ubicacion": "justo",
      "nombre": "Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.",
      "cantidad": 93,
      "precio": 51.02
    }];
    return JSON.parse(JSON.stringify(arreglo));
  }

}
