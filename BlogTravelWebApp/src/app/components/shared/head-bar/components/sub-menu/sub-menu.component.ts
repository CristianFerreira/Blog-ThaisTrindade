import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { AuthenticateDataService } from '../../../../../services/authenticate-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLoggedService } from '../../../../../services/user-logged.service';
import { SearchService } from '../../../../../services/search.service';
import {MatDialog, MatDialogRef, MatInput, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {DialogPostsInactiveComponent} from './dialog-posts-inactive/dialog-posts-inactive.component'
import { PostDataService } from '../../../../../services/post-data.service';
import { AppConfig } from "../../../../../../environments/app-config";


@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
  // providers: [AuthenticateDataService, UserLoggedService, PostDataService]
})
export class SubMenuComponent implements OnInit {
  
  public logged: boolean;
  public dialog: MatDialog;
  public continents: Array<string>;
  public categories: Array<string>;
  public search: Boolean;
   @ViewChild("myInput") inputEl: ElementRef;



  constructor(private autenticationService: AuthenticateDataService, private postDataService: PostDataService,
    protected router: Router, private userLoggedService: UserLoggedService, dialog: MatDialog, public snackBar: MatSnackBar, private searchService: SearchService) {
      this.dialog = dialog;
      this.continents = new Array<string>();
      this.categories = new Array<string>();
      this.loadDestinos();
      this.loadCategories();
  }



  ngOnInit() {
    this.userLoggedService.loggedObserver().subscribe((logged) => {
      this.logged = logged;
    })
    this.updateUserLogged();
  }

  openDialogPostsInactive() {
    this.dialog.open(DialogPostsInactiveComponent);
  }

  updateUserLogged() {
    let logged = (this.autenticationService.contextoLogado() != null);
    this.userLoggedService.logged$.next(logged);
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
    this.searchService.search$.next("");
  }

  newPost(): void {
    this.router.navigateByUrl('/post-create');
  }

  logout(): void {
    localStorage.removeItem(AppConfig.auth_token);
    localStorage.removeItem(AppConfig.auth_context);
    this.userLoggedService.logged$.next(false);
    this.snackBar.open("Volte sempre", "Logout", {duration: 6000});
    this.router.navigateByUrl(AppConfig.defaultRoute);
  }

    
}
  



