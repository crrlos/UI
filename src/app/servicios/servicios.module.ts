import { NgModule } from '@angular/core';
import { TiposHttpService } from './http/tipos.service';
import { TecnologiaHttpService } from './http/tecnologias.service';
import { MarcaHttpService } from './http/marcas.service';
import { GasHttpService } from './http/gases.service';
import { AreaHttpService } from './http/areas.service';
import { EquipoHttpService } from './http/equipo.service';
import { MaterialHttpService } from './http/material.service';
import { UnidadHttpService } from './http/unidad.service';

@NgModule({
  providers: [
    TiposHttpService,
    TecnologiaHttpService,
    MarcaHttpService,
    GasHttpService,
    AreaHttpService,
    EquipoHttpService,
    MaterialHttpService,
    UnidadHttpService
  ]
})
export class ServiciosModule { }
