import {Component, OnInit, ViewChild} from '@angular/core';
import {TipoUnidad, Marca, Material, UnidadMedida } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';

interface MaterialesTabla {
  materiales: Material[];
}

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
  selectedColumns: any[];

  @ViewChild('materiales_tabla') materiales_tabla: MaterialesTabla;

  ngOnInit() {
    this.http.tipos_filtro(event).subscribe(data => {
      this.tipos = data.tipos;
    });
    this.http.marcas_filtro().subscribe( marcas => {
      this.marcas = marcas.marcas;
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
    this.material = {};
  }
  onRowSelect(event) {
    this.nuevoMaterial = false;
    this.material = JSON.parse(JSON.stringify(event.data));
    console.log(this.material);
    this.displayDialog = true;
  }
  save() {
    const materiales = this.materiales;
    if (this.nuevoMaterial) {
      this.http.materiales_agregar(this.material).subscribe((res) => {
        this.material.material_id = JSON.parse(JSON.stringify(res)).id;
        this.materiales_tabla.materiales.push(JSON.parse(JSON.stringify(this.material)));
      });
    } else {
      this.http.materiales_actualizar(this.material).subscribe(() =>
        this.materiales_tabla
          .materiales[this.materiales_tabla.materiales
          .findIndex(m => m.material_id === this.material.material_id)] = this.material);
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

}
