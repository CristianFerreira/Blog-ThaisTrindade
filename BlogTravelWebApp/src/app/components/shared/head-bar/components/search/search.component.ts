import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, Input, SimpleChanges, Output, EventEmitter, } from '@angular/core';
import { PostDataService } from '../../../../../services/post-data.service';
import { SearchService } from '../../../../../services/search.service';
import { Post } from '../../../../../models/api/post';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '../../../../../../../node_modules/@angular/forms';
import { Observable } from '../../../../../../../node_modules/rxjs';
import { State } from '../../../../../../../node_modules/ngx-chips/dist/modules/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  // providers: [PostDataService, SearchService]
})
export class SearchComponent implements OnInit {

  @Input() mobile: Boolean
  @Input() txtSearch: string;
  @Output() selectedList = new EventEmitter()
  @ViewChild("inputSearch") inputEl: ElementRef;
  public txt_search: string = "";
  public showInput: boolean;
  public filteredPosts :Array<Post>;
  public filteredTags :Array<string>;
  public posts :Array<Post>;
  public tags :Array<string>;

  constructor(private changeDetector: ChangeDetectorRef, private postDataService: PostDataService, private searchService :SearchService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.getAll();
    this.getAllTags();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.txtSearch)
      this.filter(changes.txtSearch.currentValue)
  }

  filter(value: string) :void {
    if(value){
      this.filterPosts(value);
      this.filterTags(value);
    }
  }

   filterPosts(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredPosts = this.posts.filter(post => post.title.toLowerCase().indexOf(filterValue) !== -1).slice(0,5);
  }

  filterTags(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredTags = this.tags.filter(tag => tag.toLowerCase().indexOf(filterValue) !== -1).slice(0,5);
  }
 

  ngOnInit() {
    this.showInput = false;
    this.verifySearchUrl();
  }

  ngAfterViewChecked(){
    this.changeDetector.detectChanges();
  }

  getAll(): void {
    this.postDataService.getAll().subscribe(result => {
      this.posts = <Array<Post>>result.json();
      this.filteredPosts = Array<Post>();
      this.filteredPosts = <Array<Post>>result.json().slice(0,5);
    }, error => {

    });
  }

  getAllTags() {
    this.postDataService.getAllTags()
      .subscribe(result => {
        this.tags = <any>result.json().data;
        this.filteredTags = Array<string>();
        this.filteredTags = this.tags.slice(0,5);
      }, error => {

      });
  }


  verifySearchUrl() {
    let search = this.activatedRoute.snapshot.queryParams["pesquisa"];
    if(search){
      this.txt_search = search;
      this.router.navigate(['.'], { queryParams: {pesquisa: this.txt_search}});
      this.getSearch();
      this.showInput = true;
    }
  }

  search() :void {
    this.txt_search != "" ? this.getSearch() : this.showInput = !this.showInput;
  }

  getSearch(value ?:string) {
    value ? (this.txt_search = value, this.selectedList.emit(value)) : "";
    this.router.navigate(['.'], { queryParams: {pesquisa: this.txt_search} });
    this.postDataService.getBySearch(this.txt_search).subscribe((result) => {
      this.searchService.search$.next(<Array<Post>>result.json().data);
    }), error => {
    };
  }


  clear() :void {
    this.txt_search = "";
    this.inputEl.nativeElement.focus();
  }
 
}
