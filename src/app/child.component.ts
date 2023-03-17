import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SomeService } from './some.service';

@Component({
  selector: 'my-child',
  template: `
    <h2>Count from Service is {{ someService.count$ | async }}</h2>
    <button (click)="someService.add(2)">+2</button>&nbsp;
    <button (click)="someService.addWithLogging(3)">+3 (with Logging)</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  constructor(public someService: SomeService) {}
}
