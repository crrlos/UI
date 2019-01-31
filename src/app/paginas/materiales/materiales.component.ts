import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoUnidad, Marca, Material, UnidadMedida } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import { FormControl, FormGroup } from '@angular/forms';

interface MaterialesTabla {
  materiales: Material[];
}

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html'
})
export class MaterialesComponent implements OnInit {

  constructor(private http: HttpService) { }

  material: Material;
  materialSeleccionado: Material;

  tipos: TipoUnidad[] = [];
  marcas: Marca[] = [];
  unidades: UnidadMedida[] = [];

  displayDialog = false;
  nuevoMaterial = false;

  errores: boolean;

  cols: any[];
  selectedColumns: any[];

  @ViewChild('materiales_tabla') materiales_tabla: MaterialesTabla;

  ngOnInit() {
    this.http.tipos_filtro(event).subscribe(data => {
      this.tipos = data.tipos;
    });
    this.http.marcas_filtro().subscribe(marcas => {
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
    this.errores = false;
    this.displayDialog = true;
    this.material = {};
  }
  onRowSelect(event) {
    this.nuevoMaterial = false;
    // crea un nuevo objeto Material para no modificar el original
    this.material = JSON.parse(JSON.stringify(event.data));
    this.displayDialog = true;
  }
  save(f: FormGroup) {
    if (f.invalid) {
        this.errores =  true;
        return;
    }

    if (this.nuevoMaterial) {
      this.http.materiales_agregar(this.material).subscribe((res: any) => {
        this.material.material_id = res.id;
        // this.materiales_tabla.materiales.push(JSON.parse(JSON.stringify(this.material)));
        this.materiales_tabla.materiales.push(this.material);
      });
    } else {
      this.http.materiales_actualizar(this.material).subscribe(() =>
        this.materiales_tabla
          .materiales[this.materiales_tabla.materiales
            .findIndex(m => m.material_id === this.material.material_id)] = this.material);
    }

    this.displayDialog = false;
  }

  delete() {
    this.displayDialog = false;
  }

}
