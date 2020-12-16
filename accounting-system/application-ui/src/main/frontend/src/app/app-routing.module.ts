import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {UserListComponent} from './users/user-list.component'
import {UrlPermission} from "./urlPermission/url.permission";
import {AccountDetailsComponent} from './users/account-details.component';
import {AccountResolver} from './users/account-resolver.service';
@NgModule({
    imports: [
        RouterModule.forRoot([
            // otherwise redirect to profile
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            { path: 'profile', component: ProfileComponent ,canActivate: [UrlPermission] ,
            children: [
              { path: 'dashboard-admin',  component: DashboardComponent,canActivate: [UrlPermission]},
              { path: 'users',  component: UserListComponent,canActivate: [UrlPermission]},
              { path: 'account/:id/details', component: AccountDetailsComponent, data: { preload: true }, resolve: { account: AccountResolver } },
             
            ]},
            //{ path: 'profile', component: ProfileComponent ,canActivate: [UrlPermission] },
            //{ path: 'app/account-managements', component: PageNotFoundComponent,canActivate: [UrlPermission] },
            { path: '**', redirectTo: 'login' }
        ]),
    ],
    providers: [ ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
