import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-info-thais',
  templateUrl: './info-thais.component.html',
  styleUrls: ['./info-thais.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179.9deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])  
  ]
})
export class InfoThaisComponent implements OnInit {

  flip: string = 'inactive';
  constructor() {}

  ngOnInit() {
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }
}
