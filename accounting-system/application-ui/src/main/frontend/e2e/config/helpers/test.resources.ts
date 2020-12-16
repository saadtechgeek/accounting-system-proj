import {browser, ElementArrayFinder} from 'protractor';

export class TestResources {
     static getBrowserType() {
          return browser.browserName;
     }

     // p-datatable td element index values increment +2 across each row
     // i.e. cells at positions 1, 2, 3, 4 are at index values 1, 3, 5, 7
     static getIndex(index: string) {
          let myIndex = Number(index);
          if (myIndex > 1) {
               myIndex += myIndex - 1;
               return myIndex;
          } else {
               return Number(index);
          }
     }

     static replaceChar(myString: string, myChar: string) {
          return myString.split(myChar).join('');
     }

     static setBrowserType() {
          browser.getCapabilities().then((caps) => {
               browser.browserName = caps.get('browserName');
          });
     }

     static waitForCount(elementArrayFinder: ElementArrayFinder, expectedCount: any) {
          return () => {
               return elementArrayFinder.then((actualCount) => {
                    return expectedCount === actualCount;
               });
          };
     }
}
