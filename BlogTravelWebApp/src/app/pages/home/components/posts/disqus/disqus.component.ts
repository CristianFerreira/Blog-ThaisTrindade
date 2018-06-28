import { NgModule, Component, Input } from '@angular/core';
import { DisqusModule } from "ngx-disqus";

@NgModule({
    imports: [DisqusModule.forRoot('thaistrindadeblog')]
})

@Component({
    selector: 'app-disqus',
    templateUrl: './disqus.component.html'
})

export class DisqusComponent {
    @Input() id: any;
}