import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "../../model/model.user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  user: User=new User();
  errorMessage:string;
  currentUser: User;
  constructor(private authService :AuthService, private router: Router) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }



  ngOnInit() {
  }

  login(){
    this.authService.logIn(this.user)
      .subscribe(data=>{
        this.router.navigateByUrl('/profile/dashboard-admin');
        },err=>{
        this.errorMessage="error :  Username or password is incorrect";
        }
      )
  }
}
