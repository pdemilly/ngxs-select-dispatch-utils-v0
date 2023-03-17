import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { CounterState } from './app.state';
import { ChildComponent } from './child.component';

@NgModule({
  imports: [
    BrowserModule,
    NgxsModule.forRoot([CounterState], {
      developmentMode: true
    })
  ],
  declarations: [AppComponent, ChildComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
