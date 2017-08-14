import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.css']
})
export class BackToTopComponent implements OnInit {


  constructor() {
    this.showButton();
  }

  ngOnInit() {
  }

  showButton(): void {
    $(window).on('scroll', function (e) {
      if ($(this).scrollTop() > 100)
        $("#btn-right").css("display", "block");

      else
        $("#btn-right").css("display", "none");
    })
  }

  backToTop(): void {
    $(document).ready(function () {
        $('html, body').animate({
          scrollTop: $("#head-bar").offset().top
        }, 400);
    });
  }

}


