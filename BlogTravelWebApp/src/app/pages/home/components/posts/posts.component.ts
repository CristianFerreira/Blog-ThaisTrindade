import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from '../../../../models/api/Post';
import { PostDataService } from '../../../../services/post-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { UserLoggedService } from '../../../../services/user-logged.service';
import { AuthenticateDataService } from '../../../../services/authenticate-data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PageEvent } from '@angular/material';
// import {MdPaginatorIntl} from '@angular/material/typings/paginator/paginator-intl';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [PostDataService, AuthenticateDataService]
})
export class PostsComponent implements OnInit {
  public posts: Array<Post>;
  public postsRender: Array<Post>;
  public logged: boolean;
  public length: number;
  public pageSize: number;
  public currentPage: number;
  public pageSizeOptions: any;
  public idPost: number;

  // MdPaginator Output
  pageEvent: PageEvent;




  constructor(private postDataService: PostDataService, private autenticationService: AuthenticateDataService, private router: Router, public snackBar: MdSnackBar,
    private route: ActivatedRoute, private userLoggedService: UserLoggedService, public sanitizer: DomSanitizer) {
    this.posts = new Array<Post>();
    this.postsRender = new Array<Post>();
    this.pageSize = 2;
    this.currentPage = 1;
    this.pageSizeOptions = [5, 10, 15];


    // this.mdPaginatorIntl.itemsPerPageLabel = 'Artículos por página:';
    // this.mdPaginatorIntl.nextPageLabel = 'Siguiente página';
    // this.mdPaginatorIntl.previousPageLabel = 'Pagina anterior';

  }

  ngOnInit() {

    this.userLoggedService.logged.subscribe((logged) => {
      this.logged = logged;
    })
    this.updateUserLogged();

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

    // this.disqus();
  }

  postsToRender(topo?: boolean): void {
    this.backToTop(topo);

    var begin = ((this.currentPage - 1) * this.pageSize);
    var end = begin + this.pageSize;
    this.postsRender = this.posts.slice(begin, end);
  }

  updateTablePosts(pageEvent: PageEvent) {
    this.currentPage = (pageEvent.pageIndex + 1);
    this.pageSize = pageEvent.pageSize;
    this.postsToRender();
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
    this.userLoggedService.userLogged(logged);
  }

  postURL(id) {
    return this.sanitizer.bypassSecurityTrustUrl("https://www.facebook.com/plugins/share_button.php?href=http%3A%2F%2Fwww.thaistrindade.com%2F%23%2Fpost%2F" + id + "&layout=button&size=small&mobile_iframe=true&width=97&height=20&appId");
  }

  getAll(): void {
    this.postDataService.getAll().subscribe(result => {
      this.posts = <Array<Post>>result.json();
      this.postsToRender(true);
    }, error => {

    });
  }

  getByTag(tag: string): void {
    this.postDataService.getByTag(tag).subscribe(result => {
      this.posts = <Array<Post>>result.json().data;
      this.postsToRender();
    }, error => {

    });
  }

  getByCategory(category: string): void {
    this.postDataService.getByCategory(category).subscribe(result => {
      this.posts = <Array<Post>>result.json().data;
      this.postsToRender();
    }, error => {

    });
  }

  getByDestiny(destiny: string) {
    this.postDataService.getByContinent(destiny).subscribe(result => {
      this.posts = <Array<Post>>result.json().data;
      this.postsToRender();
    }, error => {

    });
  }

  getById(id: string): void {
    this.postDataService.getById(id).subscribe(result => {
      let post = <Post>result.json().data;
      this.posts.push(post);
      this.postsToRender();
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