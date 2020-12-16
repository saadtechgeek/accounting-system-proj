import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface ICardTreeData {
    name: string;
    details: { name: string };
    children?: ICardTreeData[];
}

@Injectable()
export class AppResourceService {
    constructor(protected httpClient: HttpClient) {
    }

    getCardTreeData(): Observable<ICardTreeData[]> {
        return this.httpClient.get<ICardTreeData[]>('/api/card-tree/example');
    }
}

