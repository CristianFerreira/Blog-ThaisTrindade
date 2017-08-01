import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpServiceBaseService } from '../services/http-service-base.service';
import { AppConfig } from "../../environments/app-config";

@Injectable()
export class PostDataService extends HttpServiceBaseService{

    createPost(data: any){
        console.log(data);
    }

    getAllPost() {
         return this.get(AppConfig.serviceUrls().post.listAll);
    }
}