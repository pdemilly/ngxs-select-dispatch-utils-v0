import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Add, CounterState } from './app.state';
import { dispatch, select, selectSnapshot } from './ngxs-utils';

@Component({
  selector: 'my-app',
  template: `
    <h1>Count is {{ count$ | async }}</h1>
    <div>Yes, the snapshot is {{ count() }}</div>
    <button (click)="onClick(1)">+1</button>
    <hr />
    <my-child></my-child>
    <hr />
    <h3><u>Note:</u></h3>
    <ul>
      <li>
        The 'select' function returns a correctly typed observable which is
        bound to the provided selector.
      </li>
      <li>
        The 'dispatch' function creates a function that can be used to dispatch
        the provided action. This function has the same parameters as the
        provided action's constructor.
      </li>
      <li>
        The 'dispatch' function takes an optional observer as the second
        parameter this can be used to get feedback on the dispatched action's
        status. You can hook into 'before', 'complete' and 'error'.<br />
        Additionally you can 'intercept' the action and modify it.<br />
        An example is in the 'some.service.ts' file.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly count$ = select(CounterState.getCount);
  readonly count = selectSnapshot(CounterState.getCount);
  readonly onClick = dispatch(Add);
}
/* // == Previous component code ==
export class AppComponent {
  @Select(CountState) count$: Observable<number>;

  constructor(private store: Store) {}

  onClick() { this.store.dispatch(new Add()); }
}
*/
