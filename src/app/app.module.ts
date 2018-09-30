import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { EquipoChildComponent } from './presupuesto/equipo-child/equipo-child.component';
import { UbicacionChildComponent } from './presupuesto/ubicacion-child/ubicacion-child.component';
import { MaterialChildComponent } from './presupuesto/material-child/material-child.component';
@NgModule({
  declarations: [
    AppComponent,
    PresupuestoComponent,
    EquipoChildComponent,
    UbicacionChildComponent,
    MaterialChildComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
