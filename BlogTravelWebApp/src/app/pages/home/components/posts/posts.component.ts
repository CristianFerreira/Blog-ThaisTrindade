import { Component, OnInit } from '@angular/core';
import { Post } from '../../../../models/api/Post';
import { PostDataService } from '../../../../services/post-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { UserLoggedService } from '../../../../services/user-logged.service';
import { AuthenticateDataService } from '../../../../services/authenticate-data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [PostDataService, AuthenticateDataService]
})
export class PostsComponent implements OnInit {
  public posts: Array<Post>;
  public logged: boolean;

  constructor(private postDataService: PostDataService, private autenticationService: AuthenticateDataService, private router: Router, public snackBar: MdSnackBar, 
              private route: ActivatedRoute, private userLoggedService: UserLoggedService) {
    this.posts = new Array<Post>();
  }

  ngOnInit() {
    this.userLoggedService.logged.subscribe((logged) => {
      console.log("ENTROUU!!!!!!");
      this.logged = logged;
    })
    this.updateUserLogged();

    this.route.params.subscribe(params => {
      let id = params['id'];
      let tag = params['tag'];
      let category = params['category'];
      if (id != null)
        this.getById(id);
      else if (tag != null)
        this.getByTag(tag);
      else if (category != null)
        this.getByCategory(category);
      else
        this.getAll();

    });
  }

  updateUserLogged(){
    let logged = (this.autenticationService.contextoLogado() != null);
    this.userLoggedService.userLogged(logged);
  }

  getAll(): void {
    this.postDataService.getAll().subscribe(result => {
      this.posts = <Array<Post>>result.json();;
    }, error => {

    });
  }

  getByTag(tag: string): void {
    this.postDataService.getByTag(tag).subscribe(result => {
      this.posts = <Array<Post>>result.json().data;
    }, error => {

    });
  }

  getByCategory(category :string): void {
    this.postDataService.getByCategory(category).subscribe(result => {
      this.posts = <Array<Post>>result.json().data;
    }, error => {

    });
  }

  getById(id: string): void {
    this.postDataService.getById(id).subscribe(result => {
      let post = <Post>result.json().data;
      this.posts.push(post);
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
      if (this.posts.indexOf(post) > -1) {
        this.posts.splice(this.posts.indexOf(post), 1);
        let snackBarRef = this.snackBar.open("Postagem excluida com sucesso", "OK", {
          duration: 3000,
        });
        snackBarRef.onAction().subscribe(() => {
          snackBarRef.dismiss()
        });
      }
    })
  }

}
