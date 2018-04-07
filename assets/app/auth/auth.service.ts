import { User } from "./user.model";

import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/Rx';
import { ErrorService } from "../error/error.service";

@Injectable()
export class AuthService{

    constructor(private http: Http, private errorService: ErrorService){}

    signup(user: User){
        const body = JSON.stringify(user);
        const customHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http.post("http://localhost:3000/user", body, {headers: customHeaders})
            .map((response: Response) => response.json())
            .catch((error: Response)=> {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    signin(user: User){
        const body = JSON.stringify(user);
        const customHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http.post("http://localhost:3000/user/signin", body, {headers: customHeaders})
            .map((response: Response) => response.json())
            .catch((error: Response)=> {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    //clear token in local storage
    logout(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }
   
}