import { Component, OnInit } from '@angular/core';
import { PostDataService } from '../../services/post-data.service'

@Component({
  selector: 'app-post-web-page',
  templateUrl: './post-web-page.component.html',
  styleUrls: ['./post-web-page.component.css'],
  providers: [PostDataService]
})
export class PostWebPageComponent implements OnInit {

  constructor(private postDataService: PostDataService) { }

  ngOnInit() {
    this.postDataService.getAllPost().subscribe( result => {
        console.log(result);
    }, error => {

    });
  }



}
