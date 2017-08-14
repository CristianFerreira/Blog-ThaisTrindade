import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class UserLoggedService {

    public logged: Observable<any>;
    loggedObserver: Observer<any>;

    constructor() {
        this.logged = new Observable((observer: Observer<any>) => {
            this.loggedObserver = observer;
        })
    }

    userLogged(userLogged) {
        this.loggedObserver.next(userLogged);
    }
}