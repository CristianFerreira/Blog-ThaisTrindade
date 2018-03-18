import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { MatSnackBar } from '@angular/material';

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
  constructor(public snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }

  spotify() {
    let snackBarRef = this.snackBar.open("Spotify: trindadethais", "Copiar", {
      duration: 5000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.copyTxt('trindadethais');
    });
  }

  snapchat() {
    let snackBarRef = this.snackBar.open("Snapchat: trindadethais", "Copiar", {
      duration: 5000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.copyTxt('trindadethais');
    });
  }
  

  copyTxt(txt: string) {
    let $temp = $("<input>");
    $("body").append($temp);
    $temp.val(txt).select();
    document.execCommand("copy");
    $temp.remove();
  }

  
}
