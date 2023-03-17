import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';

export class Add {
  static readonly type = 'Add';
  constructor(public amount: number = 1, public comment?: string) {}
}

export interface CounterStateModel {
  count: number;
}

@State<CounterStateModel>({
  name: 'count',
  defaults: {
    count: 0,
  },
})
@Injectable()
export class CounterState implements NgxsOnInit {
  @Selector()
  static getCount(state: CounterStateModel) {
    return state.count;
  }

  ngxsOnInit(ctx: StateContext<CounterStateModel>): void {
    console.log(`ngxsOnInit: CounterState = ${JSON.stringify(ctx.getState())}`);
  }

  @Action(Add)
  add({ setState, getState }: StateContext<CounterStateModel>, action: Add) {
    setState(
      patch({
        count: (value: number) => value + action.amount,
      })
    );
    if (getState().count % 5 === 0) {
      throw Error('multiples of five throw errors');
    }
  }
}
