import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {UserService} from './user.service';
import { IAccount} from './users';
@Injectable()
export class AccountResolver implements Resolve<IAccount> {

    constructor(private userService: UserService,
                private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAccount> {
        this.userService.loader=true;
        const id = route.params['id'];
        if ( !this.userService.canCreateAccount){
            this.userService.messages = [];
            this.userService.messages.push({ severity: 'error', summary: 'Account Creation', detail: 'Account cannot be created. As saving account already exist' });
            this.router.navigateByUrl('/profile/users');
            return Observable.of(null);
        }
        
        if (isNaN(id)) {
            console.log(`Account id was not a number: ${id}`);
            this.router.navigateByUrl('/profile/users');
            return Observable.of(null);
        }
        
        if (+id==0){
            if (!this.verifyAccountCreation()){
                this.userService.messages = [];
                this.userService.messages.push({ severity: 'error', summary: 'Account Creation', detail: 'Account can only be opened between 9 am to 5 pm. You cannot open the account at this time' });

                this.router.navigateByUrl('/profile/users');
                return Observable.of(null);
            }
        }
        return this.userService.getAccountDetails(+id)
            .map(account => {
                this.userService.loader=false;
                if (account) {
                    return account;
                }
                console.log(`Account was not found: ${id}`);
                this.router.navigateByUrl('/profile/users');
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.router.navigateByUrl('/profile/users');
                return Observable.of(null);
            });
    }

    verifyAccountCreation():boolean{
        return this.verifyCreationTiming();
    }

    verifyCreationTiming():boolean{
        // this functionality will work in according to standard timing
       var now = new Date().getHours();
    
       //between 9 to 5
        if( (9 < now ) && (now < 17 )) {
          return true;
        }
        return true;
    }
}
