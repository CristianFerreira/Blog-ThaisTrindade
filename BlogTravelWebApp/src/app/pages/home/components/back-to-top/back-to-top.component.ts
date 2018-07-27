import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.css'],
})
export class BackToTopComponent implements OnInit {


  constructor() {
    this.showButton();
  }

  ngOnInit() {
  }

  showButton(): void {
    $(window).on('scroll', function (e) {
      if ($(this).scrollTop() > ($('#post_id').position().top - 70))
        $("#btn-right").css("display", "block");

      else
        $("#btn-right").css("display", "none");
    })
  }

  backToTop(): void {
    $(document).ready(function () {
        $('html, body').animate({
          scrollTop: 0
        }, 400);
    });
  }

}


