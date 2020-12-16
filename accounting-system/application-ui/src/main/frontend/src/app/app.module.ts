import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NavSideBarComponent } from './nav-bar/nav-sidebar.component';
import { AccountService } from './services/account.service';
import { PageNotFoundComponent } from './page-not-found.component';
export * from 'rxjs-compat/Observable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatisticComponent } from './statistic/statistic.component';
import { MenuModule, PanelModule,InputSwitchModule, ChartModule, InputTextModule, ButtonModule, InputMaskModule, InputTextareaModule, EditorModule, CalendarModule, RadioButtonModule, FieldsetModule, DropdownModule, MultiSelectModule, ListboxModule, SpinnerModule, SliderModule, RatingModule, DataTableModule, ContextMenuModule, TabViewModule, DialogModule, StepsModule, ScheduleModule, TreeModule, GMapModule, DataGridModule, TooltipModule, ConfirmationService, ConfirmDialogModule, GrowlModule, DragDropModule, GalleriaModule } from 'primeng/primeng';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from "./services/auth.service";
import {UrlPermission} from "./urlPermission/url.permission";
import {UserListComponent} from './users/user-list.component';
import {UserService} from './users/user.service';
import {AuthInterceptor} from './auth.interceptor';
import {AccountDetailsComponent} from './users/account-details.component';
import {AccountResolver} from './users/account-resolver.service';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        HeaderComponent,
        NavSideBarComponent,
        DashboardComponent,
        StatisticComponent,
        LoginComponent,
        ProfileComponent,
        RegisterComponent,
        UserListComponent,
        AccountDetailsComponent

    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        InputSwitchModule,
        ListboxModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MenuModule,
        PanelModule,
        ChartModule,
        InputTextModule,
        ButtonModule,
        InputMaskModule,
        InputTextareaModule,
        EditorModule,
        CalendarModule,
        RadioButtonModule,
        FieldsetModule,
        DropdownModule,
        MultiSelectModule,
        ListboxModule,
        SpinnerModule,
        SliderModule,
        RatingModule,
        DataTableModule,
        ContextMenuModule,
        TabViewModule,
        DialogModule,
        StepsModule,
        ScheduleModule,
        TreeModule,
        GMapModule,
        DataGridModule,
        TooltipModule,
        GrowlModule,
        DragDropModule,
        GalleriaModule,
        NgxLoadingModule.forRoot({})
    ],
    providers: [AuthService,AccountService,UrlPermission,UserService,AccountResolver,
    { provide: CookieService, useFactory: cookieServiceFactory },
    { provide: CookieOptions, useValue: {} }
],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function cookieServiceFactory() { return new CookieService(); }
