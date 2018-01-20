import {AppPage} from './app.po';
import {$, $$, browser, by, element, ElementArrayFinder, ElementFinder, ElementHelper} from 'protractor';

describe('ng-vanilla App', () => {
  let page: AppPage;

  beforeEach(() => {
    browser.get('/');
    page = new AppPage();
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toBe('Super Calculator');
  });

  it('should have no history', () => {
    const history = $('.table').$$('tr');
    expect(history.count()).toBe(1); // one for table header
  });

  it('should do multiple tests and order results accordingly', () => {
    page.calc(1, 2);
    page.validate(2, '1 + 2', '3');

    page.calc(2, 3, '*');
    page.validate(3, '2 * 3', '6');

    page.calc(5, 2, '-');
    page.validate(4, '5 - 2', '3');

    page.calc(2, 5, '-');
    page.validate(5, '2 - 5', '-3');

    page.calc(12, 2, '/');
    page.validate(6, '12 / 2', '6');

    page.calc(1, 4, '/');
    page.validate(7, '1 / 4', '0.25');

  });


});

