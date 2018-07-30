import { Author } from '../models/api/Author';
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Router } from '@angular/router';
import { HttpServiceBaseService } from "../services/http-service-base.service";
import { Login } from "../models/app/Login";
import { AppConfig } from "../../environments/app-config";
import { UserLoggedService } from '../services/user-logged.service';
import { MatDialog, MatSnackBar, } from '@angular/material';

@Injectable()
export class AuthenticateDataService extends HttpServiceBaseService {
 
  constructor(http: Http, router: Router, snackBar: MatSnackBar, dialog: MatDialog, private userLoggedService: UserLoggedService) {
    super(http, router, snackBar, dialog);
  }

  public contextoLogado(): Author {
      return JSON.parse(localStorage.getItem(AppConfig.auth_context));
  }

  public carregaSessaoLogada(): void {
        var token = localStorage.getItem(AppConfig.auth_token);
        if(!token){
            this.router.navigateByUrl("/login");
        }
  }

  public login(loginModel: Login): void {
        this.post(AppConfig.serviceUrls().Authenticate.AuthorAuthenticate, loginModel)
                .subscribe(result => {
                    var resultJson = result.json();
                    localStorage.setItem(AppConfig.auth_token, resultJson.token);
                    localStorage.setItem(AppConfig.auth_context, JSON.stringify(resultJson.author));
                    this.router.navigateByUrl(AppConfig.defaultRoute);
                }, error => {
                    this.snackBar.open("Deu erro", "Login", {duration: 6000});
                });
  }

}
