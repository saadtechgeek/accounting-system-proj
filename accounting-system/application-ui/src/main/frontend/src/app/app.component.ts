import { Component, OnInit, ViewChild} from '@angular/core';
import {User} from "./model/model.user";
//import * as $ from 'jquery';
declare var jQuery :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Account Management';
  static API_URL="http://localhost:8080";
  currentUser: User;
  constructor() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }
}