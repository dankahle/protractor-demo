declare const expect: any;
import {ComponentFixture} from '@angular/core/testing/src/component_fixture';
import {AppComponent} from './app.component';
import {tick} from '@angular/core/testing';


export class AppTest {
  go: HTMLElement;
  result: HTMLElement;
  first: HTMLInputElement;
  second: HTMLInputElement;
  selOperator: HTMLSelectElement;
  elem: any;
  comp: AppComponent;

  constructor(private fixture: ComponentFixture<AppComponent>) {
    this.elem = fixture.nativeElement;
    this.comp = fixture.componentInstance;
    this.setProperties();
    fixture.detectChanges();
  }

  setProperties() {
    this.go = this.elem.querySelector('button');
    this.result = <HTMLElement>this.elem.querySelector('#result');
    this.first = <HTMLInputElement>this.elem.querySelector('[name="first"]');
    this.second = <HTMLInputElement>this.elem.querySelector('[name="second"]');
    this.selOperator = <HTMLSelectElement>this.elem.querySelector('[name="operator"]');
  }

  validate(expectedCount, expr, _result) {
    expect(this.first.textContent).toBe('');
    expect(this.second.textContent).toBe('');
    expect(this.result.textContent).toBe(_result);

    const history = this.elem.querySelectorAll('table tr');
    expect(history.length).toBe(expectedCount);
    expect(history[1].querySelector('.hist-time').textContent).toMatch(/\d{1,2}\:\d\d\:\d\d/);
    expect(history[1].querySelector('.hist-expr').textContent).toMatch(expr);
    expect(history[1].querySelector('.hist-result').textContent).toContain(_result);
  }

  getHistory() {
    return this.elem.querySelectorAll('table tr');
  }

  calcComp(firstVal, secondVal, operatorVal?) {
    this.comp.first = firstVal.toString();
    this.comp.second = secondVal.toString();
    if (operatorVal) {
      this.comp.operator = operatorVal;
    }
    this.comp.doCalc();
    this.fixture.detectChanges();
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
    this.fixture.detectChanges();
  }

}
