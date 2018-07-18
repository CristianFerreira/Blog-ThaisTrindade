import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-disqus',
  templateUrl: './disqus.component.html',
})
export class DisqusComponent {
  @Input() idPost;
}
