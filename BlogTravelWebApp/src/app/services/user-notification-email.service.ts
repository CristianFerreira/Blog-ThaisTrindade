import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpServiceBaseService } from './http-service-base.service';
import { AppConfig } from "../../environments/app-config";
import { Observable } from 'rxjs/Observable';
import { Subject } from '../../../node_modules/rxjs';

@Injectable()
export class UserNotificationEmailService extends HttpServiceBaseService{
    create(email: string): Observable<Response> {
        return this.post(AppConfig.serviceUrls().userNotificationEmail.create, {email: email});
    }

    deleteByEmail(email: string): Observable<Response> {
        return this.delete(AppConfig.serviceUrls().userNotificationEmail.delete + "/" + email);
    }

    showErrorEmailActive$: Subject<any> = new Subject();
    showErrorEmailDisable$: Subject<any> = new Subject();

    getShowErrorEmailActive(): Observable<any> {
        return this.showErrorEmailActive$.asObservable();
    }

    getShowErrorEmailDisable(): Observable<any> {
        return this.showErrorEmailDisable$.asObservable();
    }
    

}