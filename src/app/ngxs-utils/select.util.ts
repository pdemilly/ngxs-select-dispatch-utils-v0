import { inject } from '@angular/core';
import { StateToken, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StateSelector, TypedSelector } from './selector-types.util';

export function select<TModel>(
  selector: TypedSelector<TModel>
): Observable<TModel>;
export function select<TModel>(
  selector: StateToken<TModel>
): Observable<TModel>;
export function select<TModel>(selector: StateSelector): Observable<TModel>;
export function select<TModel>(selector: any): Observable<TModel> {
  const store = inject(Store);
  return store.select<TModel>(selector);
}

export function selectSnapshot<TModel>(
  selector: TypedSelector<TModel>
): () => TModel;
export function selectSnapshot<TModel>(
  selector: StateToken<TModel>
): () => TModel;
export function selectSnapshot<TModel>(selector: StateSelector): () => TModel;
export function selectSnapshot<TModel>(selector: any): () => TModel {
  const store = inject(Store);
  return () => store.selectSnapshot<TModel>(selector);
}
