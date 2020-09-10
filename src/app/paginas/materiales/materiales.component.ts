import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoUnidad, Marca, Material, UnidadMedida } from 'src/app/interfaces/interfaces';
import { FormGroup } from '@angular/forms';
import { TiposHttpService } from 'src/app/servicios/http/tipos.service';
import { MarcaHttpService } from 'src/app/servicios/http/marcas.service';
import { MaterialHttpService } from 'src/app/servicios/http/material.service';
import { UnidadHttpService } from 'src/app/servicios/http/unidad.service';
import { ConfirmationService } from 'primeng/api';
import { TablaComponent } from 'src/app/tabla/tabla.component';
import { ProveedoresHttpService } from 'src/app/servicios/http/proveedores.service';
import { NgStyle } from '@angular/common';


declare var swal : any;

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html'
})
export class MaterialesComponent implements OnInit {

  constructor(
    private tipoHttp: TiposHttpService,
    private marcaHttp: MarcaHttpService,
    private materialHttp: MaterialHttpService,
    private unidadesHttp: UnidadHttpService,
    private proveedoresHttp: ProveedoresHttpService,
    private confirmationService: ConfirmationService
    ) { }
  
  @ViewChild(TablaComponent,{static: true}) 
  tabla : TablaComponent;

  material: Material;
  materiales:any = [];
  materialSeleccionado: any;

  tipos: TipoUnidad[] = [];
  marcas: Marca[] = [];
  unidades: UnidadMedida[] = [];

  displayDialog = false;
  displayEditarPrecio = false;
  nuevoMaterial = false;
  mostrarRegistrosSinPrecio = true;

  errores: boolean;

  invalid:boolean;

  data:any[] = [];

  proveedores : any = [];

  precioMaterial : any = {};


  tableConfiguration = {
    globalFilterFields: ["nombre"],
    columns: [
      { field: "codigo", header: "Código" },
      { field: "nombre", header: "Nombre" },
      { field: "unidadMedida", header: "Unidad de Medida" },
    ],
    extraButtons : [
      {
        tooltip : 'Editar precios',
        clickEvent: (rowData: any) =>{

          this.materialSeleccionado = this.materiales.find(m => m.id === rowData.id);
          
          this.displayEditarPrecio = true;
        },
        icon: 'pi-dollar',
        class: 'p-button-info'
      }
    ],
    data: this.data,
  };


  ngOnInit() {
    this.proveedoresHttp.get().subscribe(data => {
      this.proveedores = data;

      this.materialHttp.materiales(event).subscribe((data : any) => {

        if(!this.mostrarRegistrosSinPrecio){
          data.materiales = data.materiales.filter((m : any) => m.precio > 0);
        }
  
        data.materiales.forEach((m : any) => {

          m.precioProveedor.provedor = m.precioProveedor.map(p => {
            p.proveedor = this.proveedores.find(pr => pr.id === p.proveedorId)
            return p;
          });

          this.materiales.push(m);
          this.data.push(this.formatMaterial(m));
        });
      });
    });
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

    
    
  }

  formatMaterial(material: any){
    return {
      id: material.id,
      codigo : material.codigo,
      nombre : material.nombre,
      unidadMedida : material.unidadMedida.nombre,
      precio : material.precio
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

  agregarPrecio(){
    this.precioMaterial.materialId = this.materialSeleccionado.id;
    this.materialHttp.agregarPrecio(this.precioMaterial).subscribe((p : any) => {

      p.proveedor = this.proveedores.find(pr => pr.id === p.proveedorId);

      this.materialSeleccionado.precioProveedor.push(p);
      this.precioMaterial = {};
    });
  }

  eliminarPrecio(id : number){
    this.materialHttp.eliminarPrecio(id).subscribe(r =>{
      let index = this.materialSeleccionado.precioProveedor.findIndex(p => p.id == id);
      this.materialSeleccionado.precioProveedor.splice(index,1);
    });
  }
}
