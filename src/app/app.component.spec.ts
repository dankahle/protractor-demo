import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {FormsModule} from '@angular/forms';
import {$$} from 'protractor';
import {By} from '@angular/platform-browser';
import {newEvent} from '../testing/helpers';
import {AppPage} from './app.po';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let elem;
  let page: AppPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA] // so you don't have to declare anything more than what you're testing
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppComponent);
    elem = fixture.nativeElement;
    page = new AppPage(fixture);
  }));

  function validate(expectedCount, expr, _result) {
    expect(page.first.textContent).toBe('');
    expect(page.second.textContent).toBe('');
    expect(page.result.textContent).toBe(_result);

    const history = elem.querySelectorAll('table tr');
    expect(history.length).toBe(expectedCount);
    expect(history[1].querySelector('.hist-time').textContent).toMatch(/\d{1,2}\:\d\d\:\d\d/);
    expect(history[1].querySelector('.hist-expr').textContent).toMatch(expr);
    expect(history[1].querySelector('.hist-result').textContent).toContain(_result);
  }

  it('should have no history', () => {
    expect(page.getHistory().length).toBe(1);
  });

  it('should do multiple calcs - comp', () => {
    page.calcComp(1, 2);
    validate(2, /1\s*\+\s*2/, '3');

    page.calcComp(2, 3, '*');
    validate(3, /2\s*\*\s*3/, '6');

    page.calcComp(5, 2, '-');
    validate(4, /5\s*\-\s*2/, '3');

    page.calcComp(2, 5, '-');
    validate(5, /2\s*\-\s*5/, '-3');

    page.calcComp(12, 2, '/');
    validate(6, /12\s*\/\s*2/, '6');

    page.calcComp(1, 4, '/');
    validate(7, /1\s*\/\s*4/, '0.25');
  });

  it('should do multiple calcs - html', fakeAsync(() => {

    page.calcHtml(1, 2);
    validate(2, /1\s*\+\s*2/, '3');

    page.calcHtml(2, 3, '*');
    validate(3, /2\s*\*\s*3/, '6');

    page.calcHtml(5, 2, '-');
    validate(4, /5\s*\-\s*2/, '3');

    page.calcHtml(2, 5, '-');
    validate(5, /2\s*\-\s*5/, '-3');

    page.calcHtml(12, 2, '/');
    validate(6, /12\s*\/\s*2/, '6');

    page.calcHtml(1, 4, '/');
    validate(7, /1\s*\/\s*4/, '0.25');
  }));


});
