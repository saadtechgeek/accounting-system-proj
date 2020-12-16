import {browser, promise, protractor} from 'protractor';

export class Pages {
    private static isAppLoaded = false;
    private static pageToUrlMap: { [name: string]: string } = {};

    static addPage(name: string, url: string) {
        Pages.pageToUrlMap[name] = url;
    }

    static getPageUrl(name: string) {
        return Pages.pageToUrlMap[name];
    }

    static setLocation(url: string) {
        return browser.waitForAngularEnabled().then(() => {
            return browser.executeScript((pUrl: string) => window.location.href = `${pUrl}`, url);
        });
    }

    static goToHomePage(): promise.Promise<any> {
        if (!Pages.isAppLoaded) {
            return browser.get('/').then(() => {
                Pages.isAppLoaded = true;
            });
        } else {
            return Pages.setLocation('');
        }
    }

    static goToPage(pageName: string): promise.Promise<any> {
        const url = Pages.pageToUrlMap[pageName];
        if (!url) {
            throw new Error(`URL not found for "${pageName}" page`);
        }
        if (!Pages.isAppLoaded) {
            return browser.get(url).then(() => {
                Pages.isAppLoaded = true;
            });
        } else {
            return Pages.setLocation(url);
        }
    }
}

export class Utils {
    static promiseValue(promiseFn: () => promise.Promise<any>, testFn: (data: any) => boolean) {
        const deferred = protractor.promise.defer();
        promiseFn().then((data) => (deferred.fulfill(testFn(data))));
        return deferred.promise;
    }

    static waitForPromiseValue(promiseFn: () => promise.Promise<any>, testFn: (value: any) => boolean, timeout = 5000) {
        return browser.wait(() => {
            return Utils.promiseValue(promiseFn, testFn);
        });
    }
}
