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
  tipos: TipoUnidad[] = [];
  marcas: Marca[] = [];
  displayDialog = false;
  nuevoEquipo = false;
  equipoSeleccionado: Equipo;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

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
    this.cols = [
      { field: 'equipo_codigo', header: 'codigo' },
      { field: 'equipo_nombre', header: 'nombre' },
      { field: 'equipo_precio', header: 'precio' },
      { field: 'capacidad', header: 'capacidad' },
      { field: 'marca', header: 'marca' },
      { field: 'tipo', header: 'tipo' },
      { field: 'voltaje', header: 'V' },
      { field: 'equipo_activo', header: 'estado' }
    ];
    this.selectedColumns = this.cols;
  }
  showDialogToAdd() {
    this.nuevoEquipo = true;
    this.equipo = { equipo_activo: true, tipo: this.tipos[0], marca: this.marcas[0], voltaje: this.voltajes[0] };
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.nuevoEquipo = false;
    this.equipo = JSON.parse(JSON.stringify(event.data));
    console.log(this.equipo);
    this.equipo.voltaje = this.voltajes.find(v => v.code === this.equipo.voltaje);
    this.displayDialog = true;
  }
  loadLazy(event) {
    this.http.equipos(event).subscribe(data => {
      this.equipos = data.equipos;
      this.totalRecords = data.totalRecords;
    });
  }
  save() {
    this.equipo.voltaje = this.equipo.voltaje.name;
    const equipos = this.equipos;
    if (this.nuevoEquipo) {
      this.http.equipos_agregar(this.equipo).subscribe((res) => {
        this.equipo.equipo_id = JSON.parse(JSON.stringify(res)).id;
        equipos.push(this.equipo);
      });
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
