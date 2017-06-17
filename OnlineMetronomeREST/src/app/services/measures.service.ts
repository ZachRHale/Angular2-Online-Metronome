// Imports
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Measure }           from '../models/measure';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MeasureService {
    private testMeasures: string;
    private isProduction: boolean = environment.production;

     // Resolve HTTP using the constructor
     constructor (private http: Http) {
        // private instance variable to hold base url
        if (this.isProduction){
            this.testMeasures = '/api/Measures/';
        } else {
            this.testMeasures = 'http://localhost:5000/api/Measures';
        }
     }

     getMeasures(user: String): Observable<Measure[]> {
    
    // ...using get request
         return this.http.get(this.testMeasures + user)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }

}

