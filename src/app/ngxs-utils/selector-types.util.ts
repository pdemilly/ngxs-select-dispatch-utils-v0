import { StateToken } from '@ngxs/store';
import { StateClass } from '@ngxs/store/internals';

export type SelectorFunc<TModel> = (arg1: any, ...arg: any[]) => TModel;

export type TypedSelector<TModel> = StateToken<TModel> | SelectorFunc<TModel>;

export type StateSelector = StateClass<any>;

export type SelectorDef<TModel> = StateSelector | TypedSelector<TModel>;

export type SelectorReturnType<
  T extends SelectorDef<any>
> = T extends StateToken<infer R>
  ? R
  : T extends SelectorFunc<infer R>
  ? R
  : T extends StateClass<any>
  ? unknown
  : never;