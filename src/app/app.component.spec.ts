import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {FormsModule} from '@angular/forms';
import {$$} from 'protractor';
import {By} from '@angular/platform-browser';
import {newEvent} from '../testing/helpers';
import {AppTest} from './app-test';


describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let elem: HTMLElement;
  let delem: DebugElement;
  let test: AppTest;


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
    test = new AppTest(fixture);
  }));


  it('should have no history', () => {
    expect(test.getHistory().length).toBe(1);
  });

  it('should do multiple calcs - comp', () => {
    test.calcComp(1, 2);
    test.validate(2, /1\s*\+\s*2/, '3');

    test.calcComp(2, 3, '*');
    test.validate(3, /2\s*\*\s*3/, '6');

    test.calcComp(5, 2, '-');
    test.validate(4, /5\s*\-\s*2/, '3');

    test.calcComp(2, 5, '-');
    test.validate(5, /2\s*\-\s*5/, '-3');

    test.calcComp(12, 2, '/');
    test.validate(6, /12\s*\/\s*2/, '6');

    test.calcComp(1, 4, '/');
    test.validate(7, /1\s*\/\s*4/, '0.25');
  });

  it('should do multiple calcs - html', fakeAsync(() => {

    test.calcHtml(1, 2);
    test.validate(2, /1\s*\+\s*2/, '3');

    test.calcHtml(2, 3, '*');
    test.validate(3, /2\s*\*\s*3/, '6');

    test.calcHtml(5, 2, '-');
    test.validate(4, /5\s*\-\s*2/, '3');

    test.calcHtml(2, 5, '-');
    test.validate(5, /2\s*\-\s*5/, '-3');

    test.calcHtml(12, 2, '/');
    test.validate(6, /12\s*\/\s*2/, '6');

    test.calcHtml(1, 4, '/');
    test.validate(7, /1\s*\/\s*4/, '0.25');
  }));


});
