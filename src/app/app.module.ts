import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EquipoChildComponent } from './componentes/presupuesto/equipo-child/equipo-child.component';
import { AreaComponent } from './componentes/presupuesto/area/area.component';
import { SpinnerModule } from 'primeng/spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './componentes/equipos/equipos.component';
import { MaterialesComponent } from './componentes/materiales/materiales.component';
import { HttpClientModule } from '@angular/common/http';
const appRoutes: Routes = [
  { path: 'materiales', component: MaterialesComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'presupueto', component: AreaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EquipoChildComponent,
    AreaComponent,
    MaterialesComponent,
    EquiposComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    AngularFontAwesomeModule,
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
