import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipo, TipoUnidad, Marca, Tecnologia, Gas } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import { FormGroup } from '@angular/forms';
import { TiposHttpService } from 'src/app/servicios/http/tipos.service';
import { MarcaHttpService } from 'src/app/servicios/http/marcas.service';
import { GasHttpService } from 'src/app/servicios/http/gases.service';
import { TecnologiaHttpService } from 'src/app/servicios/http/tecnologias.service';
import { EquipoHttpService } from 'src/app/servicios/http/equipo.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html'
})
export class EquiposComponent implements OnInit {

  constructor(private http: HttpService, private tipoHttp: TiposHttpService,
    private marcaHttp: MarcaHttpService,
    private gasHttp: GasHttpService,
    private tecnologiaHttp: TecnologiaHttpService,
    private equipoHttp: EquipoHttpService) { }
  equipo: Equipo;
  tipos: TipoUnidad[] = [];
  marcas: Marca[] = [];
  gases: Gas[];
  tecnologias: Tecnologia[];
  displayDialog = false;
  nuevoEquipo = false;
  equipoSeleccionado: Equipo;
  voltajes: any[];

  errores: boolean;

  @ViewChild('equipos_tabla') equipos_tabla: EquiposTabla;


  ngOnInit() {
    this.tipoHttp.filtrar(event).subscribe(data => {
      this.tipos = data.tipos;
    });
    this.marcaHttp.filtrar().subscribe(marcas => {
      this.marcas = marcas.marcas;
    }
    );
    this.gasHttp.filtrar().subscribe(gases => {
      this.gases = gases.gases;
    }
    );
    this.tecnologiaHttp.filtrar().subscribe(tecnologias => {
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
  onRowSelect(event: any) {
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
      this.equipoHttp.agregar(this.equipo).subscribe((res) => {
        this.equipo.id = JSON.parse(JSON.stringify(res)).id;
        this.equipo.voltaje = this.equipo.voltaje['name'];
        this.equipos_tabla.equipos.push(this.equipo);
      });
    } else {
      this.equipoHttp.actualizar(this.equipo).subscribe(() => {
        this.equipo.voltaje = this.equipo.voltaje['name'];
        const i = this.equipos_tabla.equipos.findIndex(et => et.id === this.equipo.id);
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

