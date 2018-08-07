import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpServiceBaseService } from './http-service-base.service';
import { AppConfig } from "../../environments/app-config";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactEmailService extends HttpServiceBaseService{
    create(email: string): Observable<Response> {
        return this.post(AppConfig.serviceUrls().contactEmail.create, {email: email});
    }

    deleteById(id: string): Observable<Response> {
        return this.delete(AppConfig.serviceUrls().post.delete + "/" + id);
    }

}