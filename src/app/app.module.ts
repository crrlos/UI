import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { EquipoChildComponent } from './presupuesto/equipo-child/equipo-child.component';
import { UbicacionChildComponent } from './presupuesto/ubicacion-child/ubicacion-child.component';
import { MaterialChildComponent } from './presupuesto/material-child/material-child.component';
import {SpinnerModule} from 'primeng/spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTreeModule} from '@angular/material/tree';
import {NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    PresupuestoComponent,
    EquipoChildComponent,
    UbicacionChildComponent,
    MaterialChildComponent
  ],
  imports: [
    NgbAccordionModule,
    MatTreeModule,
    SpinnerModule,
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
