import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss']
})
export class HeadBarComponent {

  constructor() { 
    this.changeColorHeadBar();
  }


  changeColorHeadBar(): void {
    $(window).on('scroll', function (e) {
      if ($(this).scrollTop() > ($('#post_id').position().top - 70))
        $(".nav-bar").css("background", "#1bbc9b");

      else
        $(".nav-bar").css("background", "rgba(59, 66, 64, 0.51)");
    })
  }

}
