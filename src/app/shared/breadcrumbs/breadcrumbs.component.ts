import { Component, OnInit } from '@angular/core';
import { Router, ActivationStart, RoutesRecognized } from '@angular/router';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;

  constructor(router: Router) {
    router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.titulo = data.state.root.firstChild.data.titulo;
      }
    });
  }

  ngOnInit() {

  }

}
