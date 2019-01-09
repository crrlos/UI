import { Component, OnInit } from '@angular/core';

declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.preloader').fadeOut();
  }

}
