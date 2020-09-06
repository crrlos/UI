import { Component, OnInit, ViewChild } from '@angular/core';
import { Material, ManoDeObra } from 'src/app/interfaces/interfaces';
import { FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ManoDeObraHttpService } from 'src/app/servicios/http/manodeobra.service';
import { TablaComponent } from 'src/app/tabla/tabla.component';


declare var swal : any;

@Component({
  selector: 'app-mano-de-obra',
  templateUrl: './mano-de-obra.component.html'
})
export class ManoDeObraComponent implements OnInit {

  constructor(
    private http: ManoDeObraHttpService,
    private confirmationService: ConfirmationService
    ) { }

    @ViewChild(TablaComponent,{static: true})
    tabla : any;
  

  manoDeObra: ManoDeObra;
  manoDeObraLista:ManoDeObra[] = [];
  manoDeObraSeleccionada: ManoDeObra;


  displayDialog = false;
  nuevaManoDeObra = false;

  errores: boolean;

  invalid:boolean;

  data:any[] = [];

  tableConfiguration = {
    globalFilterFields: ["descripcion"],
    columns: [
      { field: "codigo", header: "Código" },
      { field: "descripcion", header: "Descripción" },
      { field: "precio", header: "Precio" },
    ],
    http: this.http,
    data: this.data,
  };


  ngOnInit() {
    

    this.http.get().subscribe((data : any) => {

  
      data.forEach(m => {
        this.manoDeObraLista.push(m);
        this.data.push(this.formatManoDeObra(m));
      });
    });
    
  }

  formatManoDeObra(manoDeObra: any){
    return {
      id: manoDeObra.id,
      codigo : manoDeObra.codigo,
      descripcion : manoDeObra.descripcion,
      precio : manoDeObra.precio
    };
  }
 
  showDialogToAdd() {
    this.resetState({}, true);
  }

  showDialogToEdit(manoDeObra: any) {
    manoDeObra = this.manoDeObraLista.find( m => m.id == manoDeObra.id);
    this.resetState(manoDeObra, false);
  }

  showDialogToDelete(manoDeObra: any) {
    this.confirmationService.confirm({
      message: "Está seguro que desea eliminar este registro?",
      accept: () => {
        this.delete(manoDeObra);
      },
    });
  }

  resetState(manoDeObra: any, esNuevaManoDeObra: boolean) {
    this.invalid = false;
    this.nuevaManoDeObra = esNuevaManoDeObra;
    this.manoDeObra = manoDeObra;
    this.displayDialog = true;
  }

  save(f: FormGroup) {
    if (f.invalid) {
      this.errores = true;
      return;
    }

    if (this.nuevaManoDeObra) {
      this.http.agregar(this.manoDeObra).subscribe((res: any) => {
        this.manoDeObra.id = res.id;
        this.data.push(this.formatManoDeObra(this.manoDeObra));
        swal("Correcto!", "Registro agregado!", "success");
      });
    } else {
      this.http.actualizar(this.manoDeObra).subscribe(() =>
        this.data
          [this.data
            .findIndex(m => m.id === this.manoDeObra.id)] = this.formatManoDeObra(this.manoDeObra));
            swal("Correcto!", "Registro actualizado!", "success");
    }

    this.displayDialog = false;
  }

  delete(material : Material) {
    this.http.eliminar(material.id).subscribe(
      () => {
      this.data.splice(this.data.indexOf(material), 1);
      swal("Correcto!", "Registro eliminado!", "success");
    },
    () => {
      swal("Oops", "Este registro no se pudo eliminar", "error");
    });
  }
}
