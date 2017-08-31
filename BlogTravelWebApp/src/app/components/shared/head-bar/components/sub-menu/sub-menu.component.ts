import { Component, OnInit } from '@angular/core';
import { AuthenticateDataService } from '../../../../../services/authenticate-data.service';
import { Router } from '@angular/router';
import { UserLoggedService } from '../../../../../services/user-logged.service';
import {MdDialog, MdDialogRef} from '@angular/material';
import {DialogPostsInactiveComponent} from './dialog-posts-inactive/dialog-posts-inactive.component'
import { PostDataService } from '../../../../../services/post-data.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
  providers: [AuthenticateDataService, PostDataService]
})
export class SubMenuComponent implements OnInit {

  public logged: boolean;
  public dialog: MdDialog;
  public continents: Array<string>;
  public categories: Array<string>;

  constructor(private autenticationService: AuthenticateDataService, private postDataService: PostDataService,
    protected router: Router, private userLoggedService: UserLoggedService, dialog: MdDialog) {
      this.dialog = dialog;
      this.continents = new Array<string>();
      this.categories = new Array<string>();
      this.loadDestinos();
      this.loadCategories();
  }

  ngOnInit() {
    this.userLoggedService.logged.subscribe((logged) => {
      this.logged = logged;
    })
    this.updateUserLogged();
  }

  openDialogPostsInactive() {
    this.dialog.open(DialogPostsInactiveComponent);
  }

  updateUserLogged() {
    let logged = (this.autenticationService.contextoLogado() != null);
    this.userLoggedService.userLogged(logged);
  }

  loadDestinos() {
    this.postDataService.getAllContinents().subscribe(result => {
      result.json().data.forEach(data => {
          if(this.continents.indexOf(data.continent) == -1)
            this.continents.push(data.continent);
      });     
      
    }, error => {

    });
  }

  loadCategories() {
    this.postDataService.getAllCategories().subscribe(result => {
      result.json().data.forEach(data => {
          if(this.categories.indexOf(data.category) == -1)
            this.categories.push(data.category);
      });     
      
    }, error => {

    });
  }

  home(): void {
    this.router.navigateByUrl('/');
  }

  newPost(): void {
    this.router.navigateByUrl('/post-create');
  }

  logout(): void {
    this.autenticationService.logout();
  }


}
