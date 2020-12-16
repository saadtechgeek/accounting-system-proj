import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import { Observable } from 'rxjs';
import { IHateoasUserWrapper, IAccount,IUsers, IAccountType,IHateoasAccountTypeWrapper } from './users';
import {Message} from 'primeng/components/common/api';
import {AppComponent} from "../app.component";
import { HttpParamsFromObject, Url } from '../common/util';
import {AuthService} from '../services/auth.service';
const STANDARD_USERS_ENTRY_POINTS = {
    userList: '/accountmanagement/users',
    accountDetails: '/accountmanagement/accounts/:id',
    saveAccount: '/account/save',
    savingAccountList:'/accountmanagement/accounts/search/savingaccount',
    accountType:'/accountmanagement/accounttype'
    

};

@Injectable()
export class UserService {
    messages: Message[] = [];
    loader:boolean=false;
    selectedUser:IUsers;
    accounttype:IAccountType[]=[];
    public canCreateAccount:boolean=true;
    public gridLoader: boolean=false;
    constructor(public http: HttpClient, public auth: AuthService) {
    }
 
    getUserList(): Observable<any> {
        let headers = new Headers();
        //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        /*headers.append('Accept', 'application/json');
        headers.append("Access-Control-Allow-Origin", "http://localhost:5200");*/
        //headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //Access-Control-Allow-Origin
        // creating base64 encoded String from user name and password
        //var base64Credential: string = btoa( this.auth.currentUser.username + ':' + this.auth.currentUser.password);
        //headers.append("Authorization", "Basic " + base64Credential);
    
        //let options = new RequestOptions();
        //options.headers=headers;
        return this.http.get(AppComponent.API_URL+STANDARD_USERS_ENTRY_POINTS.userList);
        //return this.http.get<IHateoasUserWrapper>(AppComponent.API_URL+STANDARD_USERS_ENTRY_POINTS.userList, HttpParamsFromObject.options();
    }

    getAccountDetails(id:number): Observable<any> {
        if (+id === 0) {
            return Observable.of(this.initializeAccount());
        }
        return this.http.get(AppComponent.API_URL+STANDARD_USERS_ENTRY_POINTS.accountDetails);
    }


    initializeAccount(): IAccount {
        let account:IAccount={
            id: 0,
            accountNumber: Math.random().toString(36).substr(2, 9),
            title: '',
            firstName: '',
            lastName: '',
            gender:'Male',
            crtedBy: (typeof this.auth.currentUser=='undefined')?'system':this.auth.currentUser.fullName,
            crtdDate: null
        };
        account.accountType={id:1,name:'Saving'};
        return account;
    }

    saveUserAccount(account: IAccount,user:IUsers): Observable<IAccount> {
        return this.http.post<IAccount>(AppComponent.API_URL+STANDARD_USERS_ENTRY_POINTS.saveAccount+'?username='+user.username, account);
    }

    savingAccountList(user:IUsers): Observable<IAccount> {
        return this.http.get<IAccount>(AppComponent.API_URL+STANDARD_USERS_ENTRY_POINTS.saveAccount+'?username='+user.username);
    }

    getAccountType(): Observable<IHateoasAccountTypeWrapper> {
        return this.http.get<IHateoasAccountTypeWrapper>(AppComponent.API_URL+STANDARD_USERS_ENTRY_POINTS.accountType);
    }

}