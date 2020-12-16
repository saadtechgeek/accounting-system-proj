import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injectable,
    Injector,
    Type
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as _ from 'lodash';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ComponentUtilService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector,
                private router: Router,
                private route: ActivatedRoute,
                private datePipe: DatePipe) {
    }

    attachToBody<T>(component: Type<T>): ComponentRef<T> {
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory<T>(component)
            .create(this.injector);
        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);
        return componentRef;
    }

    detachFromBody<T>(componentRef: ComponentRef<T>) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }

    formToData(form: FormGroup): {[key: string]: any} {
        return Object.keys(form.controls)
            .map((key) => ({key, val: form.controls[key].value}))
            .reduce((o, pair) => {
                o[pair.key] = pair.val;
                return o;
            }, {});
    }

    createResizeEvent() {
        let resizeEvent;
        if (typeof Event === 'function') {
            resizeEvent = new Event('resize');
        } else {
            resizeEvent = document.createEvent('Event');
            resizeEvent.initEvent('resize', true, true);
        }
        return resizeEvent;
    }

    routeChanges(): Observable<ActivatedRoute> {

        return this.router.events.pipe(
            filter((e: any) => e instanceof NavigationEnd)).pipe(
            map(() => this.route)).pipe(
            map((rt: ActivatedRoute) => {
                while (rt.firstChild) {
                    rt = rt.firstChild;
                }
                return rt;
            }));
    }

    timeAgo(time: any, noOneDayLimit = false, fmt: string = null) {
        switch (typeof time) {
            case 'number':
                break;
            case 'string':
                time = +new Date(time);
                break;
            case 'object':
                if (time.constructor === Date) {
                    time = time.getTime();
                }
                break;
            default:
                time = +new Date();
        }
        let timeFormats: any[] = [
            [60, 'seconds', 1], // 60
            [120, '1 minute ago', '1 minute from now'], // 60*2
            [3600, 'minutes', 60], // 60*60, 60
            [7200, '1 hour ago', '1 hour from now'], // 60*60*2
            [86400, 'hours', 3600] // 60*60*24, 60*60
        ];

        if (!noOneDayLimit) {
            timeFormats = _.concat(timeFormats, [[172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
                [604800, 'days', 86400], // 60*60*24*7, 60*60*24
                [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
                [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
                [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
                [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
                [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
                [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
                [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
                [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
            ]);
        }

        let seconds = (+new Date() - time) / 1000;
        let token = 'ago';
        let listChoice = 1;

        if (seconds >= 0 && seconds < 30) {
            return 'Just now';
        } else if (seconds >= 30 && seconds < 60) {
            return 'Half a minute ago';
        } else if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = 'from now';
            listChoice = 2;
        }
        let result = null;
        _.forEach(timeFormats, ((format) => {
            if (seconds < format[0]) {
                if (typeof format[2] === 'string') {
                    result = format[listChoice];
                } else {
                    result = Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
                }
                return false;
            }
            return undefined;
        }));
        return result == null ? this.datePipe.transform(time, fmt) : result;
    }
}

export class Url {
    public static create(url: string, params: { [key: string]: string }) {
        _.keys(params)
            .forEach((param) => {
            const re = new RegExp('\:' + param);
            if (re.test(url)) {
                url = url.replace(re, encodeURIComponent(params[param]));
            }
        });
        return url;
    }
}

export class HttpParamsFromObject {
    public static params(o: any): HttpParams {
        let params = new HttpParams();
        if (o) {
            for (const p in o) {
                if (o.hasOwnProperty(p) && o[p] !== undefined) {
                    params = params.append(p, o[p]);
                }
            }
        }
        return params;
    }

    public static options(o: any): {params: HttpParams} {
        return {
            params: HttpParamsFromObject.params(o)
        };
    }
}



