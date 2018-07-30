import { Injectable, OnInit } from '@angular/core';;
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Post } from '../models/api/post';

@Injectable()
export class SearchService  {

    search$: Subject<any> = new Subject();
    postsAll$: Subject<any> = new Subject();

    getSearch(): Observable<any> {
        return this.search$.asObservable();
    }

    setPostsAll(): Observable<any> {
        return this.postsAll$.asObservable();
    }

}