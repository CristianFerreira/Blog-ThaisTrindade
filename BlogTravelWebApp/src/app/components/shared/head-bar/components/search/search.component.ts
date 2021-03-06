import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, Input, SimpleChanges, Output, EventEmitter, } from '@angular/core';
import { PostDataService } from '../../../../../services/post-data.service';
import { SearchService } from '../../../../../services/search.service';
import { Post } from '../../../../../models/api/post';
import { Router, ActivatedRoute, Params } from '@angular/router';



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
    this.getAllPostsToSearch();
    this.getAllTags();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.txtSearch)
      this.filter(changes.txtSearch.currentValue)
  }

  filter(value: string) :void {
    if(value && this.posts.length > 0 && this.tags.length){
      this.filterPosts(value);
      this.filterTags(value);
    } else if (value == ""){
      this.filteredPosts = this.posts.slice(0,5);
      this.filteredTags = this.tags.slice(0,5);
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

  getAllPostsToSearch(): void {
    this.postDataService.getAllPostsToSearch().subscribe(result => {
      this.posts = <Array<Post>>result.json().data;
      this.filteredPosts = Array<Post>();
      this.filteredPosts = <Array<Post>>result.json().data.slice(0,5);
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
    this.searchService.search$.next(true);
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
