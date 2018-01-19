import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {FormsModule} from '@angular/forms';
import {$$} from 'protractor';
import {By} from '@angular/platform-browser';
import {newEvent} from '../testing/helpers';


describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let elem: HTMLElement;
  let delem: DebugElement;
  let page: Page;

  class Page {
    go: HTMLElement;
    result: HTMLElement;
    first: HTMLInputElement;
    second: HTMLInputElement;
    selOperator: HTMLSelectElement;

    setProperties() {
      this.go = elem.querySelector('button');
      this.result = <HTMLElement>elem.querySelector('#result');
      this.first = <HTMLInputElement>elem.querySelector('[name="first"]');
      this.second = <HTMLInputElement>elem.querySelector('[name="second"]');
      this.selOperator = <HTMLSelectElement>elem.querySelector('[name="operator"]');
    }

    validate(expectedCount, expr, _result) {
      expect(this.first.textContent).toBe('');
      expect(this.second.textContent).toBe('');
      expect(this.result.textContent).toBe(_result);

      const history = elem.querySelectorAll('table tr');
      expect(history.length).toBe(expectedCount);
      expect(history[1].querySelector('.hist-time').textContent).toMatch(/\d{1,2}\:\d\d\:\d\d/);
      expect(history[1].querySelector('.hist-expr').textContent).toMatch(expr);
      expect(history[1].querySelector('.hist-result').textContent).toContain(_result);
    }

    calcComp(firstVal, secondVal, operatorVal?) {
      comp.first = firstVal.toString();
      comp.second = secondVal.toString();
      if (operatorVal) {
        comp.operator = operatorVal;
      }
      comp.doCalc();
      fixture.detectChanges();
    }

    calcHtml(firstVal, secondVal, operatorVal?) {
      this.first.value = firstVal.toString();
      this.first.dispatchEvent(new Event('input'));
      this.second.value = secondVal.toString();
      this.second.dispatchEvent(new Event('input'));
      if (operatorVal) {
        // (<HTMLOptionElement>this.selOperator.querySelector(`option[value="${operatorVal}"]`)).click();
        this.selOperator.value = operatorVal;
        this.selOperator.dispatchEvent(new Event('change'));
      }
      this.go.click();
      tick();
      fixture.detectChanges();
    }

  }

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
    comp = fixture.componentInstance;
    elem = fixture.nativeElement;
    delem = fixture.debugElement;
    page = new Page();
    page.setProperties();
    fixture.detectChanges();
  }));


  it('should have no history', () => {
    expect(elem.querySelectorAll('table tr').length).toBe(1);
  });

  it('should do multiple calcs - comp', () => {
    page.calcComp(1, 2);
    page.validate(2, /1\s*\+\s*2/, '3');

    page.calcComp(2, 3, '*');
    page.validate(3, /2\s*\*\s*3/, '6');

    page.calcComp(5, 2, '-');
    page.validate(4, /5\s*\-\s*2/, '3');

    page.calcComp(2, 5, '-');
    page.validate(5, /2\s*\-\s*5/, '-3');

    page.calcComp(12, 2, '/');
    page.validate(6, /12\s*\/\s*2/, '6');

    page.calcComp(1, 4, '/');
    page.validate(7, /1\s*\/\s*4/, '0.25');
  });

  it('should do multiple calcs - html', fakeAsync(() => {

    page.calcHtml(1, 2);
    page.validate(2, /1\s*\+\s*2/, '3');

    page.calcHtml(2, 3, '*');
    page.validate(3, /2\s*\*\s*3/, '6');

    page.calcHtml(5, 2, '-');
    page.validate(4, /5\s*\-\s*2/, '3');

    page.calcHtml(2, 5, '-');
    page.validate(5, /2\s*\-\s*5/, '-3');

    page.calcHtml(12, 2, '/');
    page.validate(6, /12\s*\/\s*2/, '6');

    page.calcHtml(1, 4, '/');
    page.validate(7, /1\s*\/\s*4/, '0.25');
  }));


});
