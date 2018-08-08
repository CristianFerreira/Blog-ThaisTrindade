import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {
  ngOnInit(): void {

  }

  constructor(private fb: FacebookService) {

    let initParams: InitParams = {
      appId: '435520216936385',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);

  }

}
