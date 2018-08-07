import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpServiceBaseService } from './http-service-base.service';
import { AppConfig } from "../../environments/app-config";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactService extends HttpServiceBaseService{
    send(contact: any): Observable<Response> {
        return this.post(AppConfig.serviceUrls().contact.send, contact);
    }

  

    

}