import { Component, OnInit } from '@angular/core';
declare var customjs;
declare var sidebarmenu;
@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styles: []
})
export class WrapperComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    customjs();
    sidebarmenu();
  }

}
