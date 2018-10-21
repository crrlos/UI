import { Component, OnInit } from '@angular/core';
import { Area } from '../../../interfaces/interfaces';
import { isNumber } from 'util';
import { HttpService } from '../../../servicios/http.service';
@Component({
  selector: 'app-area',
  templateUrl: './area.component.html'
})
export class AreaComponent implements OnInit {

  areas: Area[] = [];
  totalGeneral = 0;

  agregarArea(area: string) {
    this.areas.push({
      id: Number.parseInt((Math.random() * 1000).toString()),
      nombre: area,
      equipos: []
    });
  }
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.areas().subscribe(success => {
      this.areas = success;
    });
  }
  onNotificacion() {
    this.totalGeneral = 0;
    this.areas.forEach(area => {
      this.totalGeneral += isNumber(area.total) ? area.total : 0;
    });
  }


}

