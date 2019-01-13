import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipo, TipoUnidad, Marca, Tecnologia, Gas } from 'src/app/interfaces/interfaces';
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
  gases: Gas[];
  tecnologias: Tecnologia[];
  displayDialog = false;
  nuevoEquipo = false;
  equipoSeleccionado: Equipo;

  @ViewChild('equipos_tabla') equipos_tabla: EquiposTabla;

  voltajes;

  ngOnInit() {
    this.http.tipos_filtro(event).subscribe(data => {
      this.tipos = data.tipos;
    });
    this.http.marcas_filtro().subscribe( marcas => {
      this.marcas = marcas.marcas;
    }
    );
    this.http.gases_get().subscribe(gases => {
      this.gases = gases;
    }
    );
    this.http.tecnologias_get().subscribe(tecnologias => {
      this.tecnologias = tecnologias;
    }
    );
    this.http.voltajes().subscribe(voltajes => {
      this.voltajes = voltajes;
    }
    );
  }
  showDialogToAdd() {
    this.nuevoEquipo = true;
    this.equipo = { tipo: this.tipos[0], marca: this.marcas[0], voltaje: this.voltajes[0] };
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
    if (this.equipo.voltaje) {
      this.equipo.voltaje = this.equipo.voltaje.name;
    } else {
      this.equipo.voltaje = '0';
    }
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

