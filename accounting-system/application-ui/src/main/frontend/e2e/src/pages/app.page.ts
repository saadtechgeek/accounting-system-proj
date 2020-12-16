import { by, element } from 'protractor';

export class AppPage {

  getTitle() {
    return element(by.css('app-root .evlui-nav-title'));
  }

  getTitleText() {
    return this.getTitle().getText();
  }
}
