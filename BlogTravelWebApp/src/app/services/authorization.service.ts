import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpServiceBaseService } from "../services/http-service-base.service";
import { AppConfig } from "../../environments/app-config";
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class AuthorizationService extends HttpServiceBaseService implements CanActivate {

    constructor(http: Http, router: Router, snackBar: MatSnackBar, dialog: MatDialog) {
        super(http, router, snackBar, dialog);
    }

    canActivate() {
        if (!localStorage.getItem('blog_travel_token')) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }

    verifyToken(token: string): Observable<Response> {
        return this.post(AppConfig.serviceUrls().Authenticate.AuthorVerifyToken, null);      
    }

    

}