import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, AfterViewInit, AfterContentChecked } from '@angular/core';


@Component({
  selector: 'app-hide-text',
  styleUrls: ['./hide-text.component.scss'],
  templateUrl: './hide-text.component.html',
})
export class HideTextComponent implements AfterContentChecked {
    ngAfterContentChecked(): void {
       this.idPost == null ? this.hideText(this.idDiv): ``;
    }
    hide: Boolean = false;

    @Input() idDiv;
    @Input() idPost;

    hideText(idDiv:any){
        let myDiv = document.getElementById(idDiv);
        if(myDiv){
            if($(window).width() <= 400){
                this.hide = ((myDiv.clientHeight) >= 400)
            }
            else if($(window).width() > 400 && $(window).width() <= 700){
                this.hide = ((myDiv.clientHeight) >= 510)
            }
            else if($(window).width() > 700 && $(window).width() < 1400){
                this.hide = ((myDiv.clientHeight) >= 750)
            }
            else if($(window).width() >= 1400){
                this.hide = ((myDiv.clientHeight) >= 1300)
            }
            
        }
    }
  

}
