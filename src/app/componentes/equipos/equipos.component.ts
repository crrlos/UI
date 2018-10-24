import { Component, OnInit } from '@angular/core';
import { Equipo, TipoUnidad, Marca } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html'
})
export class EquiposComponent implements OnInit {

  constructor(private http: HttpService) { }
  equipos: Equipo[] = [];
  equipo: Equipo;
  tipos: TipoUnidad[];
  marcas: Marca[];
  displayDialog = false;
  nuevoEquipo = false;
  equipoSeleccionado: Equipo;
  cols: any[];
  totalRecords;

  ngOnInit() {
    this.http.tipos().subscribe(tipos =>
      this.tipos = tipos
    );
    this.http.marcas().subscribe(marcas =>
      this.marcas = marcas
    );
    this.cols = [
      { field: 'equipo_codigo', header: 'codigo' },
      { field: 'equipo_nombre', header: 'nombre' },
      { field: 'equipo_precio', header: 'precio' },
      { field: 'marca', header: 'marca' },
      { field: 'tipo', header: 'tipo' }
    ];
  }
  showDialogToAdd() {
    this.nuevoEquipo = true;
    this.equipo = {};
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.nuevoEquipo = false;
    this.equipo = JSON.parse(JSON.stringify(event.data));
    this.displayDialog = true;
  }
  loadLazy(event) {
    console.log(event);
    this.http.equipos(event).subscribe(data => {
      this.equipos = data.equipos;
      this.totalRecords = data.totalRecords;
    });
  }
  save() {

    const equipos = this.equipos;
    if (this.nuevoEquipo) {
      equipos.push(this.equipo);
    } else {
      this.http.equipos_actualizar(this.equipo).subscribe(() =>
        equipos[this.equipos.indexOf(this.equipoSeleccionado)] = this.equipo);
    }
    this.equipos = equipos;
    this.displayDialog = false;
  }

  delete() {
    const index = this.equipos.indexOf(this.equipoSeleccionado);
    this.equipos = this.equipos.filter((val, i) => i !== index);
    this.equipo = null;
    this.displayDialog = false;
  }
  endEdit(event) {
    console.log(event);
  }

}
