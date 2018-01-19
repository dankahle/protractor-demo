import {AppPage} from './app.po';
import {$, $$, browser, by, element, ElementArrayFinder, ElementFinder, ElementHelper} from 'protractor';

describe('ng-vanilla App', () => {
  // let page: AppPage;
  let first: ElementFinder;
  let operator: ElementFinder;
  let second: ElementFinder;
  let go: ElementFinder;
  let result: ElementFinder;

  beforeEach(() => {
    // page = new AppPage();
    browser.get('/');
    first = element(by.name('first'));
    operator = element(by.name('operator'));
    second = element(by.name('second'));
    go = element(by.id('gobutton'));
    result = element(by.id('result'));
  });

  function validateHistory(expectedCount, expr, _result) {
    const history = $$('table tr');
    expect(history.count()).toBe(expectedCount);
    expect(history.get(1).$('.hist-time').getText()).toMatch(/\d{1,2}\:\d\d\:\d\d/);
    expect(history.get(1).$('.hist-expr').getText()).toContain(expr);
    expect(history.get(1).$('.hist-result').getText()).toContain(_result);
  }

  function calc(firstVal, secondVal, operatorVal?) {
    first.sendKeys(firstVal);
    second.sendKeys(secondVal);
    if (operatorVal) {
      operator.$(`[value="${operatorVal}"]`).click();
    }
    go.click();
  }

  it('should have a title', () => {
    expect(browser.getTitle()).toBe('Super Calculator');
  });

  it('should have no history', () => {
    const history = $('.table').$$('tr');
    expect(history.count()).toBe(1); // one for table header
  });

  it('should do multiple tests and order results accordingly', () => {
    calc(1, 2);
    expect(result.getText()).toBe('3');
    validateHistory(2, '1 + 2', 3);

    calc(2, 3, '*');
    expect(result.getText()).toBe('6');
    validateHistory(3, '2 * 3', 6);

    calc(5, 2, '-');
    expect(result.getText()).toBe('3');
    validateHistory(4, '5 - 2', 3);

    calc(2, 5, '-');
    expect(result.getText()).toBe('-3');
    validateHistory(5, '2 - 5', -3);

    calc(12, 2, '/');
    expect(result.getText()).toBe('6');
    validateHistory(6, '12 / 2', 6);

    calc(1, 4, '/');
    expect(result.getText()).toBe('0.25');
    validateHistory(7, '1 / 4', 0.25);

  });


});

