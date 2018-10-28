import { Component, OnInit } from '@angular/core';
import { Equipo, TipoUnidad, Marca, Material, UnidadMedida } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html'
})
export class MaterialesComponent implements OnInit {

  constructor(private http: HttpService) { }
  materiales: Material[] = [];
  material: Material;
  tipos: TipoUnidad[] = [];
  marcas: Marca[] = [];
  unidades: UnidadMedida[] = [];
  displayDialog = false;
  nuevoMaterial = false;
  materialSeleccionado: Material;
  cols: any[];
  totalRecords;
  selectedColumns: any[];

  ngOnInit() {
    this.http.tipos().subscribe(tipos => {
      this.tipos = tipos;
    }
    );
    this.http.marcas().subscribe(marcas => {
      this.marcas = marcas;
    });
    this.http.unidades_medida().subscribe(unidad_medida => {
        this.unidades = unidad_medida;
      }
    );
    this.cols = [
      { field: 'material_codigo', header: 'codigo' },
      { field: 'material_nombre', header: 'nombre' },
      { field: 'material_precio', header: 'precio' },
      { field: 'material_cantidad', header: 'cantidad' },
      { field: 'marca', header: 'marca' },
      { field: 'tipo', header: 'tipo' },
      { field: 'unidad_medida', header: 'unidad' },
      { field: 'material_activo', header: 'estado' }
    ];
    this.selectedColumns = this.cols;
  }
  showDialogToAdd() {
    this.nuevoMaterial = true;
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.nuevoMaterial = false;
    this.material = JSON.parse(JSON.stringify(event.data));
    console.log(this.material);
    this.displayDialog = true;
  }
  loadLazy(event) {
    this.http.materiales(event).subscribe(data => {
      this.materiales = data.materiales;
      this.totalRecords = data.totalRecords;
    });
  }
  save() {
    const materiales = this.materiales;
    if (this.nuevoMaterial) {
      this.http.equipos_agregar(this.material).subscribe((res) => {
        this.material.material_id = JSON.parse(JSON.stringify(res)).id;
        materiales.push(this.material);
      });
    } else {
      this.http.materiales_actualizar(this.material).subscribe(() =>
        materiales[this.materiales.indexOf(this.materialSeleccionado)] = this.material);
    }
    this.materiales = materiales;
    this.displayDialog = false;
  }

  delete() {
    const index = this.materiales.indexOf(this.materialSeleccionado);
    this.materiales = this.materiales.filter((val, i) => i !== index);
    this.material = null;
    this.displayDialog = false;
  }
  endEdit(event) {
    console.log(event);
  }

}
