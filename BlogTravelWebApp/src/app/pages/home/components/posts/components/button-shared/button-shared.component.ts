import { Component, OnInit, Input } from '@angular/core';
import { AppConfig } from "../../../../../../../environments/app-config";
import {ShareButtonsService} from 'ngx-sharebuttons';

@Component({
  selector: 'button-shared',
  templateUrl: './button-shared.component.html',
  styleUrls: ['./button-shared.component.scss']
})
export class ButtonSharedComponent implements OnInit {

  @Input() idPost;
  public url: string;
  public title = "Thais Trindade";
  public description = "Futura nutricionista, apaixonada por viajar e com uma queda pelos Estados Unidos. Aqui eu vou compartilhar de tudo, e espero ajudar de qualquer forma <3";

  constructor(shareButton: ShareButtonsService){ 
    shareButton.twitterAccount = "trindadethaiss";
    shareButton.windowHeight = 500; //default: 400
    shareButton.windowWidth = 600;  //default: 500
  }
 
  ngOnInit() {
    this.url = AppConfig.serviceWebInfo() + "post/" + this.idPost;
  }

}
