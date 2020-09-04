import { Component, OnInit } from '@angular/core';
import { TipoUnidad, Marca, Material, UnidadMedida } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import { FormGroup } from '@angular/forms';
import { TiposHttpService } from 'src/app/servicios/http/tipos.service';
import { MarcaHttpService } from 'src/app/servicios/http/marcas.service';
import { MaterialHttpService } from 'src/app/servicios/http/material.service';
import { UnidadHttpService } from 'src/app/servicios/http/unidad.service';
import { ConfirmationService } from 'primeng/api';


declare var swal : any;

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html'
})
export class MaterialesComponent implements OnInit {

  constructor(private http: HttpService,
    private tipoHttp: TiposHttpService,
    private marcaHttp: MarcaHttpService,
    private materialHttp: MaterialHttpService,
    private unidadesHttp: UnidadHttpService,
    private confirmationService: ConfirmationService) { }

  material: Material;
  materiales:Material[] = [];
  materialSeleccionado: Material;

  tipos: TipoUnidad[] = [];
  marcas: Marca[] = [];
  unidades: UnidadMedida[] = [];

  displayDialog = false;
  nuevoMaterial = false;

  errores: boolean;

  invalid:boolean;

  data:any[] = [];

  tableConfiguration = {
    globalFilterFields: ["nombre"],
    columns: [
      { field: "codigo", header: "Código" },
      { field: "nombre", header: "Nombre" },
      { field: "unidadMedida", header: "Unidad de Medida" },
    ],
    http: this.http,
    data: this.data,
  };


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

    this.materialHttp.materiales(event).subscribe(data => {
      data.materiales.forEach(m => {
        this.materiales.push(m);
        this.data.push(this.formatMaterial(m));
      });
    });
    
  }

  formatMaterial(material: Material){
    return {
      id: material.id,
      codigo : material.codigo,
      nombre : material.nombre,
      unidadMedida : material.unidadMedida.nombre
    };
  }
 
  showDialogToAdd() {
    this.resetState({}, true);
  }

  showDialogToEdit(material: Material) {
    material = this.materiales.find( m => m.id == material.id);
    this.resetState(material, false);
  }

  showDialogToDelete(material: Material) {
    this.confirmationService.confirm({
      message: "Está seguro que desea eliminar este registro?",
      accept: () => {
        this.delete(material);
      },
    });
  }

  resetState(material: Material, esNuevoMaterial: boolean) {
    this.invalid = false;
    this.nuevoMaterial = esNuevoMaterial;
    this.material = material;
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
        this.data.push(this.formatMaterial(this.material));
        swal("Correcto!", "Registro agregado!", "success");
      });
    } else {
      this.materialHttp.actualizar(this.material).subscribe(() =>
        this.data
          [this.data
            .findIndex(m => m.id === this.material.id)] = this.formatMaterial(this.material));
            swal("Correcto!", "Registro actualizado!", "success");
    }

    this.displayDialog = false;
  }

  delete(material : Material) {
    this.materialHttp.eliminar(material.id).subscribe(
      () => {
      this.data.splice(this.data.indexOf(material), 1);
      swal("Correcto!", "Registro eliminado!", "success");
    },
    () => {
      swal("Oops", "Este registro no se pudo eliminar", "error");
    });
  }

}
