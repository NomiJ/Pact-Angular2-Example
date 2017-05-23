import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

@Injectable()
export class AnimalService {

  constructor(private http: Http) { }

    /*
      The Api should say hello.
    */
    sayHello(localBaseUrl: string): Observable<Object> {

        let headers = new Headers({});
        let options = new RequestOptions({ headers: headers });

        return this.http.get(localBaseUrl + '/sayHello',  options)
            .map(this.extractData)
            .catch((err) => { return this.handleError(err); });
    }

    /*
      Extract JSON Object from Response
    */
    protected extractData(res: Response) {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(this.handleError(res));
      }
      return { status: res.status , data: res.json() || ''};
    }

    /*
      The Error Handler from HTTP
    */
    protected handleError(error): any {
        return Observable.throw(error);
    }
}
