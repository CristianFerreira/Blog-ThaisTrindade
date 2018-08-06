import { Component, OnInit } from '@angular/core';
import { PostDataService } from '../../../../services/post-data.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public tagsMostUsed: Array<any>;
  public categories: Array<any>;
  public continents: Array<any>;

  constructor(public postService :PostDataService) { 
    this.continents = new Array<any>();
  }

  ngOnInit() {
    this.getTagsMostUsed();
    this.loadCategories();
    this.loadDestinos();
  }

  getTagsMostUsed() :void {
    this.postService.getTagsMostUsed().subscribe((res) => {
      this.tagsMostUsed = res.json().data;
    }, error => {})
  }
  
  loadCategories() {
    this.postService.getAllCategories().subscribe(result => {
      this.categories = result.json().data;
    }, error => {

    });
  }

  loadDestinos() {
    this.postService.getAllContinents().subscribe(result => {
      this.continents = result.json().data;       
    
    }, error => {

    });
  }

  updateTags() :void {
    this.tagsMostUsed = this.tagsMostUsed.slice(0,5);
  }

}
