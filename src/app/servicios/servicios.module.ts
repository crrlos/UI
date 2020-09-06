import { NgModule } from '@angular/core';
import { TiposHttpService } from './http/tipos.service';
import { TecnologiaHttpService } from './http/tecnologias.service';
import { MarcaHttpService } from './http/marcas.service';
import { GasHttpService } from './http/gases.service';
import { EquipoHttpService } from './http/equipo.service';
import { MaterialHttpService } from './http/material.service';
import { UnidadHttpService } from './http/unidad.service';
import { VoltajesHttpService } from './http/voltajes.service';
import { CotizacionesHttpService } from './http/cotizaciones.service';
import { CotizacionEquiposHttpService } from './http/cotizacion-equipos.service';
import { CotizacionMaterialesHttpService } from './http/cotizacion-materiales.service';
import { ManoDeObraHttpService } from './http/manodeobra.service';

@NgModule({
  providers: [
    TiposHttpService,
    TecnologiaHttpService,
    MarcaHttpService,
    GasHttpService,
    EquipoHttpService,
    MaterialHttpService,
    UnidadHttpService,
    VoltajesHttpService,
    CotizacionesHttpService,
    CotizacionEquiposHttpService,
    CotizacionMaterialesHttpService,
    ManoDeObraHttpService
  ]
})
export class ServiciosModule { }
