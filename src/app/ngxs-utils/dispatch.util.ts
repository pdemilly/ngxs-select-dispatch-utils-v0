import { inject } from '@angular/core';
import { Store } from '@ngxs/store';

interface ActionDef<TArgs extends any[], TReturn> {
  type: string;
  new (...args: TArgs): TReturn;
}

interface DispatchObserver<TAction> {
  intercept?: (action: TAction) => TAction;
  before?: (action: TAction) => void;
  complete?: (action: TAction) => void;
  error?: (err: any, action: TAction) => void;
}

export function dispatch<TArgs extends any[], TReturn>(
  actionType: ActionDef<TArgs, TReturn>,
  observer?: DispatchObserver<TReturn>
): (...args: TArgs) => void {
  const store = inject(Store);
  observer = observer || {};
  return (...args: TArgs): void => {
    let action = new actionType(...args);
    action = observer.intercept ? observer.intercept(action) : action;
    observer.before?.(action);
    const dispatchObservable = store.dispatch(action);
    if (observer.complete || observer.error) {
      dispatchObservable.subscribe({
        complete: () => observer.complete?.(action),
        error: (error) => observer.error?.(error, action),
      });
    }
  };
}
