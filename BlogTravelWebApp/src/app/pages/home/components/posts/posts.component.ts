import { Component, OnInit, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Post } from '../../../../models/api/Post';
import { PostDataService } from '../../../../services/post-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserLoggedService } from '../../../../services/user-logged.service';
import { AuthenticateDataService } from '../../../../services/authenticate-data.service';
import { SearchService } from '../../../../services/search.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PageEvent } from '@angular/material';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))])
  ],
  // providers: [AuthenticateDataService, UserLoggedService, PostDataService]
})
export class PostsComponent implements OnInit {
  @Output() showFooter = new EventEmitter()

  public posts: Array<Post>;
  public postsRender: Array<Post>;
  public logged: boolean;
  public length: number;
  public pageSize: number;
  public currentPage: number;
  public pageSizeOptions: any;
  public idPost: number;
  public mobile: Boolean;
  public fadeIn = false;
  public teste: any;

  // MdPaginator Output
  pageEvent: PageEvent;

  constructor(private postDataService: PostDataService, private autenticationService: AuthenticateDataService, private router: Router, private activatedRoute: ActivatedRoute, public snackBar: MatSnackBar,
    private route: ActivatedRoute, private userLoggedService: UserLoggedService, public sanitizer: DomSanitizer, private searchService: SearchService) {
    this.posts = new Array<Post>();
    this.postsRender = new Array<Post>();
    this.pageSize = 2;
    this.currentPage = 1;
    this.pageSizeOptions = [5, 10, 15];


  }

  ngOnInit() {

    this.userLoggedService.loggedObserver().subscribe((logged) => {
      this.logged = logged;
    })

    this.searchService.getSearch().subscribe((posts) => {
      if(posts == true)
          this.posts = new Array<Post>();
      else
          (posts == "") ? (this.getAll(), this.router.navigateByUrl('/')) : (this.posts = posts);
    })


    this.updateUserLogged();

    if (!this.searchUrl()) {
      this.route.params.subscribe(params => {
        this.idPost = params['id'];
        let tag = params['tag'];
        let category = params['category'];
        let destiny = params['destiny'];
        if (this.idPost != null)
          this.getById(this.idPost.toString());
        else if (tag != null)
          this.getByTag(tag);
        else if (category != null)
          this.getByCategory(category);
        else if (destiny != null)
          this.getByDestiny(destiny);
        else
          this.getAll()
      });
    }

    this.mobile = $(window).width() > 700 ? false : true;
  }


  searchUrl(): Boolean {
    return this.activatedRoute.snapshot.queryParams["pesquisa"] != undefined;
  }

  formatDatePost(date :Date) :string{
    var mydate = new Date(date); 
    var str = mydate.getDay();
    var x = mydate.getFullYear();
    return ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][mydate.getMonth()] ;
  }

  updateTablePosts(pageEvent: any) {
    this.backToTop(false);
    return pageEvent;
  }

  backToTop(topo: boolean) {
    $('html, body').animate({
      scrollTop: topo ? 0 : ($('#post_id').position().top - 95)
    }, 500);
  }


  disqus() {
    (function () { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = 'https://thaistrindade.disqus.com/embed.js';
      s.setAttribute('data-timestamp', '' + new Date());
      (d.head || d.body).appendChild(s);
    })();
  }


  updateUserLogged() {
    let logged = (this.autenticationService.contextoLogado() != null);
    this.userLoggedService.logged$.next(logged);
  }

  postURL(id) {
    return this.sanitizer.bypassSecurityTrustUrl("https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fwww.thaistrindade.com%2F%23%2Fpost%2F" + id + "&layout=button&size=small&mobile_iframe=true&width=97&height=20&appId");
  }

  getAll(): void {
    this.postDataService.getAll().subscribe(result => {
      this.posts = <Array<Post>>result.json();
      this.showFooter.emit("true");
      this.backToTop(true);
    }, error => {

    });
  }

  getByTag(tag: string): void {
    this.postDataService.getByTag(tag).subscribe(result => {
      this.posts = <Array<Post>>result.json().data;
      this.showFooter.emit("true");
      this.backToTop(false);
    }, error => {

    });
  }

  getByCategory(category: string): void {
    this.postDataService.getByCategory(category).subscribe(result => {
      this.posts = <Array<Post>>result.json().data;
      this.showFooter.emit("true");
      this.backToTop(false);
    }, error => {

    });
  }

  getByDestiny(destiny: string) {
    this.postDataService.getByContinent(destiny).subscribe(result => {
      this.posts = <Array<Post>>result.json().data;
      this.showFooter.emit("true");
      this.backToTop(false);
    }, error => {

    });
  }

  getById(id: string): void {
    this.postDataService.getById(id).subscribe(result => {
      let post = <Post>result.json().data;
      this.posts.push(post);
      this.showFooter.emit("true");
      this.backToTop(false);
    }, error => {

    });
  }

  pagePostTag(tag: string) {
    this.router.navigateByUrl('post/tags/' + tag);
  }


  pageEditPost(id: string) {
    this.router.navigateByUrl('post-create/' + id);
  }

  openSnackBarDelete(id: string) {
    let snackBarRef = this.snackBar.open("Excluir postagem ?", "Sim", {
      duration: 3000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.delete(id);
    });
  }

  delete(id) {
    this.postDataService.deleteById(id).subscribe(result => {
      let post = this.posts.filter((post) => { return post._id == id })[0]
      let index = this.posts.indexOf(post);
      if (index > -1) {
        this.posts.splice(index, 1);
        let snackBarRef = this.snackBar.open("Postagem excluida com sucesso", "OK", {
          duration: 3000,
        });
      }
    })
  }

}
