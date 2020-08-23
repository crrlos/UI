import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipo, TipoUnidad, Marca, Tecnologia, Gas, Voltaje } from 'src/app/interfaces/interfaces';
import { HttpService } from 'src/app/servicios/http.service';
import { FormGroup } from '@angular/forms';
import { TiposHttpService } from 'src/app/servicios/http/tipos.service';
import { MarcaHttpService } from 'src/app/servicios/http/marcas.service';
import { GasHttpService } from 'src/app/servicios/http/gases.service';
import { TecnologiaHttpService } from 'src/app/servicios/http/tecnologias.service';
import { EquipoHttpService } from 'src/app/servicios/http/equipo.service';
import { ConfirmationService } from 'primeng/api';

declare var swal : any;
@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html'
})
export class EquiposComponent implements OnInit {

  constructor(
    private http: HttpService, 
    private tipoHttp: TiposHttpService,
    private marcaHttp: MarcaHttpService,
    private gasHttp: GasHttpService,
    private tecnologiaHttp: TecnologiaHttpService,
    private equipoHttp: EquipoHttpService,
    private confirmationService: ConfirmationService) 
    { }

  tipos: TipoUnidad[] = [];
  marcas: Marca[] = [];
  gases: Gas[];
  tecnologias: Tecnologia[];
  voltajes: Voltaje[];

  displayDialog = false;
  equipo: Equipo;
  nuevoEquipo = false;
  equipoSeleccionado: Equipo;


  invalid:boolean;
  equipos : Equipo [];
  data:any[] = [];


  tableConfiguration = {
    globalFilterFields: ["nombre","codigo","capacidad","marca","tipo","gas","tecnologia"],
    columns: [
      { field: "codigo", header: "Código" },
      { field: "nombre", header: "Nombre equipo" },
      { field: "precio", header: "Precio" },
      { field: "capacidad", header: "Capacidad (BTU)" },
      { field: "marca", header: "Marca" },
      { field: "tipo", header: "Tipo" },
      { field: "gas", header: "Gas" },
      { field: "voltaje", header: "Voltaje" },
      { field: "tecnologia", header: "Tecnología" },
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
      this.voltajes = voltajes.voltajes;
    }
    );
    this.equipoHttp.equipos().subscribe(equipos => {
      this.equipos = equipos.equipos;

      equipos.equipos.forEach(e =>{
        this.data.push(this.formatEquipo(e));
      });
    });
  }
  
  formatEquipo(e : Equipo) : any{
    return {
      id : e.id,
      codigo : e.codigo,
      nombre : e.nombre,
      precio : e.precio,
      capacidad : e.capacidad,
      marca : e.marca.nombre,
      tipo: e.tipo.nombre,
      voltaje: e.voltaje.nombre,
      gas : e.gas.nombre,
      tecnologia : e.tecnologia.nombre
    };
  }

  save(f: FormGroup) {
    if (f.invalid) {
      this.invalid = true;
      return;
    }

    if (this.nuevoEquipo) {
      this.equipoHttp.agregar(this.equipo).subscribe((res) => {
        this.equipo.id = JSON.parse(JSON.stringify(res)).id;
        this.equipos.push(this.equipo);
        this.data.push(this.formatEquipo(this.equipo));
        swal("Correcto!", "Registro agregado!", "success");
      });
    } else {
      this.equipoHttp.actualizar(this.equipo).subscribe(() => {
        const i = this.data.findIndex(et => et.id === this.equipo.id);
        this.data[i] = this.formatEquipo(this.equipo);
        swal("Correcto!", "Registro actualizado!", "success");
      });
    }
    this.displayDialog = false;
  }

  cancelar() {
    this.displayDialog = false;
  }

  showDialogToAdd() {
    this.resetState({}, true);
  }

  showDialogToEdit(equipo: Equipo) {
    equipo = this.equipos.find(e => e.id === equipo.id);
    console.log(equipo);
    
    this.resetState(equipo, false);
  }

  showDialogToDelete(equipo: Equipo) {
    this.confirmationService.confirm({
      message: "Está seguro que desea eliminar este registro?",
      accept: () => {
        this.delete(equipo);
      },
    });
  }

  resetState(equipo: Equipo, esNuevoEquipo: boolean) {
    this.invalid = false;
    this.nuevoEquipo = esNuevoEquipo;
    this.equipo = equipo;
    this.displayDialog = true;
  }

  delete(equipo: Equipo) {
    this.equipoHttp.eliminar(equipo.id).subscribe(
      () => {
        this.data.splice(this.data.indexOf(equipo), 1);
        swal("Correcto!", "Registro eliminado!", "success");
      },
      () => {
        swal("Oops", "Este registro no se pudo eliminar", "error");
      }
    );
    this.displayDialog = false;
  }

}

