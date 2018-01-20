import {AppPage} from './app.po';
import {$, $$, browser, by, element, ElementArrayFinder, ElementFinder, ElementHelper} from 'protractor';

describe('ng-vanilla App', () => {
  let page: AppPage;

  beforeEach(() => {
    browser.get('/');
    page = new AppPage();
  });

  function validate(expectedCount, expr, _result) {
    expect(page.first.getText()).toBe('');
    expect(page.second.getText()).toBe('');
    expect(page.result.getText()).toBe(_result);

    const history = $$('table tr');
    expect(history.count()).toBe(expectedCount);
    expect(history.get(1).$('.hist-time').getText()).toMatch(/\d{1,2}\:\d\d\:\d\d/);
    expect(history.get(1).$('.hist-expr').getText()).toContain(expr);
    expect(history.get(1).$('.hist-result').getText()).toContain(_result);
  }

  it('should have a title', () => {
    expect(browser.getTitle()).toBe('Super Calculator');
  });

  it('should have no history', () => {
    const history = $('.table').$$('tr');
    expect(history.count()).toBe(1); // one for table header
  });

  it('should do multiple tests and order results accordingly', () => {
    page.calc(1, 2);
    validate(2, '1 + 2', '3');

    page.calc(2, 3, '*');
    validate(3, '2 * 3', '6');

    page.calc(5, 2, '-');
    validate(4, '5 - 2', '3');

    page.calc(2, 5, '-');
    validate(5, '2 - 5', '-3');

    page.calc(12, 2, '/');
    validate(6, '12 / 2', '6');

    page.calc(1, 4, '/');
    validate(7, '1 / 4', '0.25');

  });


});

