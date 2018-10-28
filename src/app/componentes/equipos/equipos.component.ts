import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipo, TipoUnidad, Marca } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html'
})
export class EquiposComponent implements OnInit {

  constructor(private http: HttpService) { }
  equipo: Equipo;
  tipos: TipoUnidad[] = [];
  marcas: Marca[] = [];
  displayDialog = false;
  nuevoEquipo = false;
  equipoSeleccionado: Equipo;

  @ViewChild('equipos_tabla') equipos_tabla: EquiposTabla;

  voltajes = [
    { name: '0', code: '0' },
    { name: '120V', code: '120V' },
    { name: '240V', code: '240V' },
    { name: '480V', code: '480V' }
  ];

  ngOnInit() {
    this.http.tipos().subscribe(tipos => {
      this.tipos = tipos;
    }
    );
    this.http.marcas().subscribe(marcas => {
      this.marcas = marcas;
    }
    );
  }
  showDialogToAdd() {
    this.nuevoEquipo = true;
    this.equipo = { equipo_activo: true, tipo: this.tipos[0], marca: this.marcas[0], voltaje: this.voltajes[0] };
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.nuevoEquipo = false;
    this.equipo = JSON.parse(JSON.stringify(event));
    console.log(this.equipo);
    this.equipo.voltaje = this.voltajes.find(v => v.code === this.equipo.voltaje);
    this.displayDialog = true;
  }
  save() {
    this.equipo.voltaje = this.equipo.voltaje.name;
    if (this.nuevoEquipo) {
      this.http.equipos_agregar(this.equipo).subscribe((res) => {
        this.equipo.equipo_id = JSON.parse(JSON.stringify(res)).id;
        this.equipos_tabla.equipos.push(this.equipo);
      });
    } else {
      this.http.equipos_actualizar(this.equipo).subscribe(() => {
        const i = this.equipos_tabla.equipos.findIndex(et => et.equipo_id === this.equipo.equipo_id);
        this.equipos_tabla.equipos[i] = this.equipo;
      });
    }
    this.displayDialog = false;
  }

  delete() {
    /* const index = this.equipos.indexOf(this.equipoSeleccionado);
    this.equipos = this.equipos.filter((val, i) => i !== index);
    this.equipo = null;
    this.displayDialog = false; */
  }

}
export interface EquiposTabla {
  equipos: Equipo[];
}

