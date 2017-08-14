import { Component, OnInit } from '@angular/core';
import { AuthenticateDataService } from '../../../../../services/authenticate-data.service';
import { Router } from '@angular/router';
import { UserLoggedService } from '../../../../../services/user-logged.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
  providers: [AuthenticateDataService]
})
export class SubMenuComponent implements OnInit {

  public logged: boolean;

  constructor(private autenticationService: AuthenticateDataService,
    protected router: Router, private userLoggedService: UserLoggedService) {
  }

  ngOnInit() {
    this.userLoggedService.logged.subscribe((logged) => {
      this.logged = logged;
    })
    this.updateUserLogged();
  }

  updateUserLogged() {
    let logged = (this.autenticationService.contextoLogado() != null);
    this.userLoggedService.userLogged(logged);
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
