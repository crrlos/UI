import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-tabla",
  templateUrl: "./tabla.component.html",
})
export class TablaComponent implements OnInit {
  constructor() {}

  @Input() configuration: any;

  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }
}
