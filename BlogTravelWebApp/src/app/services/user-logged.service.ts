import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

@Injectable()
export class UserLoggedService {

    logged$: Subject<any> = new Subject();

    loggedObserver(): Observable<any> {
        return this.logged$.asObservable();
      }
}