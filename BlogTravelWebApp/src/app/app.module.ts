//Imports
import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { TagInputModule } from 'ngx-chips';
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
        MdSidenavModule,
        MdTooltipModule
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


// Web mobile
import { SidenavMenuComponent } from './pages/mobile/sidenav-menu/sidenav-menu.component';
import { SidenavSubMenuComponent } from './pages/mobile/sidenav-menu/components/sidenav-sub-menu/sidenav-sub-menu.component';
import { PostMobilePageComponent } from './pages/mobile/post-mobile-page/post-mobile-page.component';

// Web
import { HomeComponent } from './pages/home/home.component';
import { InfoThaisComponent } from './pages/home/components/info-thais/info-thais.component';
import { InfoCristianComponent } from './pages/home/components/info-cristian/info-cristian.component';
import { InstagramComponent } from './pages/home/components/instagram/instagram.component';
import { FacebookComponent } from './pages/home/components/facebook/facebook.component';
import { BackToTopComponent } from './pages/home/components/back-to-top/back-to-top.component';
import { PostsComponent } from './pages/home/components/posts/posts.component';

import { PostComponent } from './pages/post-create/post.component';


import { AuthorizationService } from './services/authorization.service';

import { SanitizeHtmlPipe } from './pipe/sanitize-html-pipe';

//userLoggedService
import {UserLoggedService} from './services/user-logged.service';

@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    AppComponent,
    HeadBarComponent,
    SubMenuComponent,
    FroalaComponent,
    LoginPageComponent,
    SidenavMenuComponent,
    SidenavSubMenuComponent,
    PostMobilePageComponent,
    LoadInfoComponent,
    HomeComponent,
    PostComponent,
    InfoThaisComponent,
    InfoCristianComponent,
    InstagramComponent,
    FacebookComponent,
    BackToTopComponent,
    PostsComponent,
  ],
  imports: [
    BrowserModule,
    TagInputModule,
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
    MdTooltipModule,

    FlexLayoutModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    Routing
  ],
  providers: [AuthorizationService, UserLoggedService],

  //configuração modal
  entryComponents: [LoadInfoComponent],

  bootstrap: [AppComponent]
})
export class AppModule { }
