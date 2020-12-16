import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { UserService } from './user.service';
import { IUsers,IAccount, IHateoasAccountTypeWrapper, IAccountType } from './users';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'acount-details',
    templateUrl: './account-details.component.html',
    styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
    selectedRows: Array<any>;
    contextMenu: MenuItem[];
    recordCount: number;
    accountDetails: IAccount;
    properties: IAccountType[];
    accountTypeMap = {};
    accountMapper: Map<string, IAccount> = new Map();
    segmentNameArray: Array<string> = [];
    segmentNameMap = {};
    scenarioId = 0;
    loading1:boolean = false;
    loading:boolean=false;
    pageTitle: string;
    selectedAccountType: any;
    invalid:boolean = true;
    dirty:boolean=false;
    hasError:boolean = false;
    validateFormFields:boolean = true;
    isDisableMethod:boolean=false;
    methodName:string='Analysis Period';
    isInvalidSegmentName:boolean=false;
    isUniqueLoader:boolean=false;
    segmentNameErroMessage:string='';
    actionName:string='';
    lookbackLabel:string='Lookback Period';
    pdlgdErrorMessage:string='';
    pdApproaches:string[];
    selectedPDApproach: string;
    lookbackError:boolean=false;
    migrationPeriodError:boolean=false;
    migrationPeriodErrorMsg:string='';
    constructor(public userService: UserService, private route: ActivatedRoute, private router: Router) {
    }
    ngOnInit() {
        this.loading=true;
        this.userService.messages=[];
       /* this.segmentService.getPDApproaches().subscribe((approaches: string[]) => {
            this.pdApproaches = [''].concat(approaches);
        });*/
        this.route.data.subscribe(data => {
            this.onAccountRetrieved(data['account'],data['action']);
            this.loading1=false;
            this.userService.loader=false;
        });

        if (!this.userService.accounttype.length) {
            this.userService.getAccountType().subscribe((properties: IHateoasAccountTypeWrapper) => {
                this.properties = properties._embedded.account_type;
                this.userService.accounttype=properties._embedded.account_type;
                this.accountTypeMap = properties._embedded.account_type.map((property) => {
                    return { label: property.name.trim(), value: property.name.trim() };
                });
            });
        }else {
            this.properties = this.userService.accounttype;
            this.accountTypeMap = this.properties.map((property) => {
                return { label: property.name.trim(), value: property.name.trim() };
            });
        }

        /*if (!this.segmentService.segmentMethods.length) {
            this.segmentService.getPropertiesOptions().subscribe((properties: string[]) => {
                this.segmentService.segmentMethods = properties;
                this.properties = properties;
                this.selectedMethod = this.segmentDetails.method;
                this.selectedPDApproach = this.segmentDetails.approach;

                this.accountTypeMap = this.properties.map((property) => {
                    return { label: property.trim(), value: property.trim() };
                });
                if (this.actionName != 'copy' && typeof this.segmentDetails != 'undefined' && this.segmentDetails.id == 0) {
                    this.segmentDetails.method = this.properties[0].trim();
                    this.selectedMethod = this.segmentDetails.method;
                    this.setMethodLabel(this.segmentDetails.method);
                }
                this.loading=false;
            }); 
        } else {
            this.selectedMethod = this.segmentDetails.method;
            this.selectedPDApproach = this.segmentDetails.approach;
            this.properties = this.segmentService.segmentMethods;
            this.propertiesMap = this.properties.map((property) => {
                return { label: property.trim(), value: property.trim() };
            });
            this.loading=false;
        }

        if (typeof this.segmentDetails != 'undefined' && this.segmentDetails.locked) {
            this.segmentService.messages = [];
            this.segmentService.messages.push({severity: 'info', summary: 'Segment Locked', detail: 'Segment has already been used and cannot be updated'});
        }*/
    }

    /*setSelectedMethod(value: string): void {
        this.selectedMethod = value.trim();
        this.setMethodLabel(this.selectedMethod);
        this.segmentDetails.method =this.selectedMethod;
    }

    setSelectedApproach(value: string): void {
        this.selectedPDApproach = value.trim();
        this.segmentDetails.approach = this.selectedPDApproach;
    }*/

    onAccountRetrieved(account: IAccount, action: any): void {
        this.accountDetails = account;        
        /*if (this.accountDetails.id === 0){
            this.pageTitle = 'Add Account';
        }*/
    }

    saveAccount():void{
        this.loading1 = true;
       this.userService.saveUserAccount(this.accountDetails,this.userService.selectedUser).subscribe((account: any) => {
            this.userService.messages = [];
            this.userService.messages.push({severity: 'success', summary: 'Account created', detail: 'Account created successfully'});
            this.redirectLoad();
        },
        error => {
          this.userService.messages = [];
          this.userService.messages.push({ severity: 'error', summary: 'Account Save', detail: 'Error occurred while creating account' });
        });
    }

    redirectLoad(): void {
        this.loading1 = false;
        this.router.navigateByUrl('/profile/users');
    }
    
    setAccountType(value: string): void {
        this.selectedAccountType = {id:1,name:value.trim()};
        this.accountDetails.accountType=this.selectedAccountType;
    }
}
