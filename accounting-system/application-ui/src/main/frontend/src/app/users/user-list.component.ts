import { Component, OnInit,ViewChild } from '@angular/core';
import { DataTable } from 'primeng/primeng';
import { IUsers, IHateoasUserWrapper } from './users';
import { UserService } from './user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  selectedRows: Array<any>;
  recordCount: number;
  selectedSegment: IUsers;
  @ViewChild('dt') dt: DataTable;
  public userList: IUsers[];
  public userHateoasObj: IHateoasUserWrapper;
  public visible:boolean = false;
  public visibleActive:boolean = false;
  public errorMessage: string;
  public loading:boolean=false;

  constructor(public userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.initialize();
  }

  public initialize(): void {
    this.loading=true;
    this.loadUserList();
  }

  public loadUserList(): void {
    this.userService.getUserList().subscribe((users: any) => {
      this.userHateoasObj = users;
      this.userList = users._embedded.users;
      this.loading=false;
    },
      error => {
      this.errorMessage = <any>error;
      });
  }

  public navAddAccount(user:IUsers){
    this.userService.selectedUser=user;
    this.router.navigateByUrl('/profile/account/0/details');
  }

  canCreateSavingAccount(accountType:string):void{
         this.userService.savingAccountList(this.userService.selectedUser).subscribe((account: any) => {
          this.userService.canCreateAccount=true;
         }, error => {
             this.userService.canCreateAccount=false;
             this.userService.messages = [];
             this.userService.messages.push({ severity: 'error', summary: 'Saving Account Exist', detail: 'Saving Account Already exist. You can create other accounts' });
             });
             
 }
}
