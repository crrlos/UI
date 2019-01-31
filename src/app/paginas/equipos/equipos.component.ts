import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipo, TipoUnidad, Marca, Tecnologia, Gas } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import { FormGroup } from '@angular/forms';

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

  errores: boolean;

  @ViewChild('equipos_tabla') equipos_tabla: EquiposTabla;

  voltajes;

  ngOnInit() {
    this.http.tipos_filtro(event).subscribe(data => {
      this.tipos = data.tipos;
    });
    this.http.marcas_filtro().subscribe(marcas => {
      this.marcas = marcas.marcas;
    }
    );
    this.http.gases_filtro().subscribe(gases => {
      this.gases = gases.gases;
    }
    );
    this.http.tecnologias_filtro().subscribe(tecnologias => {
      this.tecnologias = tecnologias.tecnologias;
    }
    );
    this.http.voltajes().subscribe(voltajes => {
      this.voltajes = voltajes;
    }
    );
  }
  showDialogToAdd() {
    this.nuevoEquipo = true;
    this.errores = false;
    this.equipo = {};
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.nuevoEquipo = false;
    this.equipo = JSON.parse(JSON.stringify(event));
    console.log(this.equipo);
    this.equipo.voltaje = this.voltajes.find(v => v.code === this.equipo.voltaje);
    this.displayDialog = true;
  }
  save(f: FormGroup) {
    if (f.invalid) {
      this.errores = true;
      return;
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

  cancelar() {
    this.displayDialog = false;
  }

}
export interface EquiposTabla {
  equipos: Equipo[];
}

