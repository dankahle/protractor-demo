import {ComponentFixture} from '@angular/core/testing/src/component_fixture';
import {AppComponent} from './app.component';
import {tick} from '@angular/core/testing';


export class AppPO {
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
      // couldn't get this to work for some reason. Oh, maybe need to click on the select first to get the popup menu, then it works?
      // funny that it works with e2e tests without doing that though
      // (<HTMLOptionElement>this.selOperator.querySelector(`option[value="${operatorVal}"]`)).click();
      this.selOperator.value = operatorVal;
      this.selOperator.dispatchEvent(new Event('change'));
    }
    this.go.click();
    tick();
    this.fixture.detectChanges();
  }

}
