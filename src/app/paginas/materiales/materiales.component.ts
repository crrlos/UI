import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoUnidad, Marca, Material, UnidadMedida } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import { FormGroup } from '@angular/forms';
import { TiposHttpService } from 'src/app/servicios/http/tipos.service';
import { MarcaHttpService } from 'src/app/servicios/http/marcas.service';
import { MaterialHttpService } from 'src/app/servicios/http/material.service';
import { UnidadHttpService } from 'src/app/servicios/http/unidad.service';

interface MaterialesTabla {
  materiales: Material[];
}

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html'
})
export class MaterialesComponent implements OnInit {

  constructor(private http: HttpService,
    private tipoHttp: TiposHttpService,
    private marcaHttp: MarcaHttpService,
    private materialHttp: MaterialHttpService,
    private unidadesHttp: UnidadHttpService) { }

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
    this.tipoHttp.filtrar(event).subscribe(data => {
      this.tipos = data.tipos;
    });
    this.marcaHttp.filtrar().subscribe(marcas => {
      this.marcas = marcas.marcas;
    });
    this.unidadesHttp.filtrar().subscribe(unidad_medida => {
      this.unidades = unidad_medida.unidades;
    }
    );
    this.cols = [
      { field: 'codigo', header: 'Código' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'precio', header: 'Precio' },
      { field: 'cantidad', header: 'Cantidad' },
      { field: 'marca', header: 'Marca' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'medida', header: 'Unidad' },
      { field: 'activo', header: 'Estado' }
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
      this.errores = true;
      return;
    }

    if (this.nuevoMaterial) {
      this.materialHttp.agregar(this.material).subscribe((res: any) => {
        this.material.id = res.id;
        // this.materiales_tabla.materiales.push(JSON.parse(JSON.stringify(this.material)));
        this.materiales_tabla.materiales.push(this.material);
      });
    } else {
      this.materialHttp.actualizar(this.material).subscribe(() =>
        this.materiales_tabla
          .materiales[this.materiales_tabla.materiales
            .findIndex(m => m.id === this.material.id)] = this.material);
    }

    this.displayDialog = false;
  }

  delete() {
    this.displayDialog = false;
  }

}
