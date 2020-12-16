export interface IHateoasUserWrapper {
    '_embedded': IUsers[];
    'links': any;
    'page': IPagination;
}

export interface IPagination {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}

export interface IUsers {
    username: string,
    role: string,
    fullName: string,
    links?: any;
    content?:any;
}



export interface IAccountType {
    id?:number;
    name:string;
}
export interface IAccount {
    id?:number,
    accountNumber: string,
    accountTypeId?:number,
    title: string,
    accountType?:IAccountType,
    firstName?: string,
    lastName?: string;
    gender?:string;
    username?:string;
    crtedBy:string;
    crtdDate:string;
    content?:any;
    links?:any;
}

export interface IHateoasAccountWrapper {
    'content': IAccount[];
    'links': any;
    'page': IPagination;
}

export interface IAccountType {
    
    id?:number;
    name: string;
    content?:any;
    links?:any;
}
export interface IAccountTypeList {
    'account_type': IAccountType[];
}

export interface IHateoasAccountTypeWrapper {
    '_embedded': IAccountTypeList;
    'links': any;
    'page': IPagination;
}




/*var obj2: IHateoasUserWrapper ={
    "links": [
        {
            "rel": "self",
            "href": "http://localhost:8080/accountmanagement/users{?page,size,sort}",
            "hreflang": null,
            "media": null,
            "title": null,
            "type": null,
            "deprecation": null
        },
        {
            "rel": "profile",
            "href": "http://localhost:8080/accountmanagement/profile/users",
            "hreflang": null,
            "media": null,
            "title": null,
            "type": null,
            "deprecation": null
        },
        {
            "rel": "search",
            "href": "http://localhost:8080/accountmanagement/users/search",
            "hreflang": null,
            "media": null,
            "title": null,
            "type": null,
            "deprecation": null
        }
    ],
    "_embedded": [
        {
            "username": "saadshahid1505@gmail.com",
            "role": "USER",
            "fullName": "Saad Shahid",
            "content": [],
            "links": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/accountmanagement/users/1",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                },
                {
                    "rel": "user",
                    "href": "http://localhost:8080/accountmanagement/users/1",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                }
            ]
        },
        {
            "username": "sshahid@primaticsfinancial.com",
            "role": "USER",
            "fullName": "Saad Shahid",
            "content": [],
            "links": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/accountmanagement/users/2",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                },
                {
                    "rel": "user",
                    "href": "http://localhost:8080/accountmanagement/users/2",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                }
            ]
        },
        {
            "username": "saad.shahid@outlook.com",
            "role": "USER",
            "fullName": "Saad",
            "content": [],
            "links": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/accountmanagement/users/3",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                },
                {
                    "rel": "user",
                    "href": "http://localhost:8080/accountmanagement/users/3",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                }
            ]
        },
        {
            "username": "saad.shahid123@hotmail.com",
            "role": "USER",
            "fullName": "Saad Shahid",
            "content": [],
            "links": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/accountmanagement/users/4",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                },
                {
                    "rel": "user",
                    "href": "http://localhost:8080/accountmanagement/users/4",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                }
            ]
        },
        {
            "username": "hamna.saad@outlook.com",
            "role": "USER",
            "fullName": "Hamna Saad",
            "content": [],
            "links": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/accountmanagement/users/5",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                },
                {
                    "rel": "user",
                    "href": "http://localhost:8080/accountmanagement/users/5",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                }
            ]
        },
        {
            "username": "hamna.saad2@outlook.com",
            "role": "USER",
            "fullName": "Saad Shahid",
            "content": [],
            "links": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/accountmanagement/users/6",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                },
                {
                    "rel": "user",
                    "href": "http://localhost:8080/accountmanagement/users/6",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                }
            ]
        },
        {
            "username": "amunawar@outlook.com",
            "role": "USER",
            "fullName": "Saad Shahid",
            "content": [],
            "links": [
                {
                    "rel": "self",
                    "href": "http://localhost:8080/accountmanagement/users/7",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                },
                {
                    "rel": "user",
                    "href": "http://localhost:8080/accountmanagement/users/7",
                    "hreflang": null,
                    "media": null,
                    "title": null,
                    "type": null,
                    "deprecation": null
                }
            ]
        }
    ],
    "page": {
        "size": 20,
        "totalElements": 7,
        "totalPages": 1,
        "number": 0
    }
}*/