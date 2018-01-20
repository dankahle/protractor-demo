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

  validate(expectedCount, expr, _result) {
    expect(this.first.getText()).toBe('');
    expect(this.second.getText()).toBe('');
    expect(this.result.getText()).toBe(_result);

    const history = $$('table tr');
    expect(history.count()).toBe(expectedCount);
    expect(history.get(1).$('.hist-time').getText()).toMatch(/\d{1,2}\:\d\d\:\d\d/);
    expect(history.get(1).$('.hist-expr').getText()).toContain(expr);
    expect(history.get(1).$('.hist-result').getText()).toContain(_result);
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
