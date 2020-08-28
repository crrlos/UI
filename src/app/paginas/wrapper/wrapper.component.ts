import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, ActivationEnd } from '@angular/router';

declare var customjs: () => void;
declare var sidebarmenu: () => void;
@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styles: []
})
export class WrapperComponent implements OnInit {

  pageTitle : string;

  constructor(
    private route : Router
  ) { }

  ngOnInit() {
    
    this.route.events.subscribe(e =>{
   
      if(e instanceof ActivationEnd){
        
       if(e.snapshot.data.titulo != null)
       {
         this.pageTitle = e.snapshot.data.titulo;
       }
       
       
        
      }
      
      
    });
    
    //this.pageTitle = this.route.snapshot.firstChild.data.titulo;
    
    //this.pageTitle = this.routeSnapshot.snapshot.data.titulo;
    customjs();
    sidebarmenu();
  }

}
