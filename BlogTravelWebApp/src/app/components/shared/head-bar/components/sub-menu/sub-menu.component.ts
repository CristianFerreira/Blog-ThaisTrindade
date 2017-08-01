import { Component, OnInit } from '@angular/core';
import { AuthenticateDataService } from '../../../../../services/authenticate-data.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
  providers: [AuthenticateDataService]
})
export class SubMenuComponent implements OnInit {

  constructor(private autenticationService: AuthenticateDataService) { }

  ngOnInit() {
  }

  logout(): void{
    this.autenticationService.logout();
  }
}
