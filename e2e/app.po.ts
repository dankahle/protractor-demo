import {$$, browser, by, element, ElementFinder} from 'protractor';

export class AppPage {
  first: ElementFinder;
  operator: ElementFinder;
  second: ElementFinder;
  go: ElementFinder;
  result: ElementFinder;

  constructor() {
    this.first = element(by.name('first'));
    this.operator = element(by.name('operator'));
    this.second = element(by.name('second'));
    this.go = element(by.id('gobutton'));
    this.result = element(by.id('result'));
  }

  calc(firstVal, secondVal, operatorVal?) {
    this.first.sendKeys(firstVal);
    this.second.sendKeys(secondVal);
    if (operatorVal) {
      this.operator.$(`[value="${operatorVal}"]`).click();
    }
    this.go.click();
  }

}
