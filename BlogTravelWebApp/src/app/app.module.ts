import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import 'hammerjs';


import { AppComponent } from './app.component';
import { HeadBarComponent } from './components/shared/head-bar/head-bar.component';
import { SubMenuComponent } from './components/shared/sub-menu/sub-menu.component';



@NgModule({
  declarations: [
    AppComponent,
    HeadBarComponent,
    SubMenuComponent,
    MaterialModule
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
