//Imports
import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

 // MaterialModule,
import { 
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
        MdNativeDateModule,
        MdMenuModule,
        MdSidenavModule
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import 'hammerjs';

//Rotas
import { Routing, RoutingProviders } from './app.routing';

// Root 
import { AppComponent } from './app.component';

// Shared
import { HeadBarComponent } from './components/shared/head-bar/head-bar.component';
import { SubMenuComponent } from './components/shared/head-bar/components/sub-menu/sub-menu.component';
import { LoadInfoComponent } from './components/load-info/load-info.component';
import { FroalaComponent } from './components/froala/froala.component';

import { LoginPageComponent } from './pages/login-page/login-page.component';

// new post


// Web mobile
import { SidenavMenuComponent } from './pages/mobile/sidenav-menu/sidenav-menu.component';
import { SidenavSubMenuComponent } from './pages/mobile/sidenav-menu/components/sidenav-sub-menu/sidenav-sub-menu.component';
import { PostMobilePageComponent } from './pages/mobile/post-mobile-page/post-mobile-page.component';

// Web
import { PostWebPageComponent } from './pages/post-web-page/post-web-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeadBarComponent,
    SubMenuComponent,
    FroalaComponent,
    LoginPageComponent,
    SidenavMenuComponent,
    SidenavSubMenuComponent,
    PostMobilePageComponent,
    PostWebPageComponent,
    LoadInfoComponent,
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
    MdMenuModule,
    MdSidenavModule,
    MdIconModule,

    FlexLayoutModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    Routing
  ],
  providers: [],

  //configuração modal
  entryComponents: [LoadInfoComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
