import { Component, OnInit, AfterContentChecked } from '@angular/core';


// import { FacebookModule } from 'ngx-facebook';

@Component({
selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  showFooter: boolean = false;

  constructor() {
      
   }

   footer() {
     this.showFooter = true;
   }

  
}



