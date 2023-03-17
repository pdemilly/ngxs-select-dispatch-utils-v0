import { Injectable } from '@angular/core';
import { Add, CounterState } from './app.state';
import { dispatch, select } from './ngxs-utils';

@Injectable({ providedIn: 'root' })
export class SomeService {
  readonly count$ = select(CounterState.getCount);
  readonly add = dispatch(Add);

  readonly addWithLogging = dispatch(Add, {
    intercept: action => {
      console.log('intercepting Add', action);
      return new Add(action.amount, 'injected comment');
    },
    before: action => console.log('dispatching Add', action),
    complete: action => console.log('Add done', action),
    error: (error, action) => console.error('Add error', error, action)
  });
}
