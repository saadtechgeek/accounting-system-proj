import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import {AuthService} from "./services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUser;
        if (currentUser) {

            //let headers = new Headers();
            //headers.append('Accept', 'application/json')
            // creating base64 encoded String from user name and password
            var base64Credential: string = btoa( currentUser.username+ ':' + currentUser.password);
            //headers.append("Authorization", "Basic " + base64Credential);

            request = request.clone({
                setHeaders: {
                    Authorization: "Basic " + base64Credential 
                }
            });
        }

        return next.handle(request);
    }
}