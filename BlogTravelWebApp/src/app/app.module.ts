//Imports
import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
        // MaterialModule,
        MdProgressSpinnerModule,
        MdListModule,
        MdCardModule,
        MdToolbarModule,
        MdSnackBarModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdChipsModule,
        MdInputModule,
        MdDialogModule, 
        MdIconModule, 
        MdDatepickerModule, 
        MdNativeDateModule 
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import 'hammerjs';


//Declarations
import { AppComponent } from './app.component';
import { HeadBarComponent } from './components/shared/head-bar/head-bar.component';
import { SubMenuComponent } from './components/shared/sub-menu/sub-menu.component';
import { FroalaComponent } from './components/froala/froala.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';



@NgModule({
  declarations: [
    AppComponent,
    HeadBarComponent,
    SubMenuComponent,
    FroalaComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // MaterialModule,
    MdProgressSpinnerModule,
    MdListModule,
    MdCardModule,
    MdToolbarModule,
    MdSnackBarModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdChipsModule,
    MdInputModule,
    MdDialogModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdIconModule,
    FlexLayoutModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
