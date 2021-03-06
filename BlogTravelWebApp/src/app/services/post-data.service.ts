import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpServiceBaseService } from './http-service-base.service';
import { AppConfig } from "../../environments/app-config";
import { Post } from "../models/api/post";
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostDataService extends HttpServiceBaseService{


    create(post: Post): Observable<Response> {
        return this.post(AppConfig.serviceUrls().post.create, post);
    }

    update(post: Post): Observable<Response> {
        return this.put(AppConfig.serviceUrls().post.update, post);
    }

    deleteById(id: string): Observable<Response> {
        return this.delete(AppConfig.serviceUrls().post.delete + "/" + id);
    }

    getById(id: any): Observable<Response> {
        return this.get(AppConfig.serviceUrls().post.getById + "/" + id);
    }

    getByTag(tag: string): Observable<Response> {
        return this.get(AppConfig.serviceUrls().post.getByTag + "/" + tag);
    }

    getAllTags(): Observable<Response> {
        return this.get(AppConfig.serviceUrls().post.getAllTags);
    }

    getTagsMostUsed(): Observable<Response> {
        return this.get(AppConfig.serviceUrls().post.getTagsMostUsed);
    }

    getByCategory(category: string): Observable<Response> {
        return this.get(AppConfig.serviceUrls().post.getByCategory + "/" + category);
    }

    getAllCategories(): Observable<Response> {
        return this.get(AppConfig.serviceUrls().post.getAllCategories);
    }

    getAll(page? :number): Observable<Response> {
         return this.get(AppConfig.serviceUrls().post.getAll + "/" + page);
    }

    getAllPostsToSearch(): Observable<Response> {
        return this.get(AppConfig.serviceUrls().post.getAllPostsToSearch);
   }

    getAllContinents(): Observable<Response> {
        return this.get(AppConfig.serviceUrls().post.getAllContinents);
    }

    getByContinent(continent: string): Observable<Response> {
        return this.get(AppConfig.serviceUrls().post.getByContinent + "/" + continent);
    }

    getInactive(): Observable<Response> {
        return this.get(AppConfig.serviceUrls().post.getInactive);
   }

   getBySearch(search :string): Observable<Response> {
        return this.get(AppConfig.serviceUrls().post.getBySearch + "/" + search);
   }
}