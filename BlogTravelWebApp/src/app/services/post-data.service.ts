import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostDataService {
    constructor(private http: Http) {

    }

    createPost(data: any){
        console.log(data);
    }

    getAllPost() {
        return this.http.get('http://localhost:3000/post/')
        .map((res: Response) => res.json());
    }
}