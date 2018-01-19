import {Component} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'dk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  theValue = 'lowercase';
  first1 = 'lala';

  first: string;
  second: string;
  Object = Object;

  memory = [];
  latest = '0';
  operators = {
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*',
    DIVISION: '/',
    MODULO: '%'
  };
  operator = this.operators.ADDITION;

  constructor() {
    // this.first = '1';
    // this.second = '2';
  }


  doCalc() {
    let latestResult;
    const first = parseInt(this.first, 10);
    const second = parseInt(this.second, 10);
    switch (this.operator) {
      case '+':
        latestResult = first + second;
        break;
      case '-':
        latestResult = first - second;
        break;
      case '*':
        latestResult = first * second;
        break;
      case '/':
        latestResult = first / second;
        break;
      case '%':
        latestResult = first % second;
        break;
    }
    this.memory.unshift({
      timestamp: new Date(),
      first: this.first,
      operator: this.operator,
      second: this.second,
      value: latestResult
    });
    this.first = this.second = '';
    this.latest = latestResult;
}


}
