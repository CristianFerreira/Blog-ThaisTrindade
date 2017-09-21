import { PostDataService } from './services/post-data.service';
//Imports
import { NgModule } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { DisqusModule } from 'ngx-disqus';



 // MaterialModule
import { 
        MdProgressSpinnerModule,
        MdCardModule,
        MdToolbarModule,
        MdSnackBarModule,
        MdButtonModule,
        MdInputModule,
        MdDialogModule, 
        MdIconModule, 
        MdNativeDateModule,
        MdMenuModule,
        MdSidenavModule,
        MdTooltipModule,
        MdCheckboxModule,
        MdPaginatorModule,
        MdListModule
} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import 'hammerjs';


// import {MdPaginatorIntl} from '@angular/material/typings/paginator/paginator-intl';

//Rotas
import { Routing, RoutingProviders } from './app.routing';

// Root 
import { AppComponent } from './app.component';

// Shared
import { HeadBarComponent } from './components/shared/head-bar/head-bar.component';
import { SubMenuComponent } from './components/shared/head-bar/components/sub-menu/sub-menu.component';
import { DialogPostsInactiveComponent } from './components/shared/head-bar/components/sub-menu/dialog-posts-inactive/dialog-posts-inactive.component';
import { HeaderSidenavComponent } from './components/shared/sidenav/header-sidenav/header-sidenav.component';
import { BodySidenavComponent } from './components/shared/sidenav/body-sidenav/body-sidenav.component';

import { LoadInfoComponent } from './components/load-info/load-info.component';
import { FroalaComponent } from './components/froala/froala.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

//Web
import { HomeComponent } from './pages/home/home.component';
import { InfoThaisComponent } from './pages/home/components/info-thais/info-thais.component';
import { InfoCristianComponent } from './pages/home/components/info-cristian/info-cristian.component';
import { InstagramComponent } from './pages/home/components/instagram/instagram.component';
import { FacebookComponent } from './pages/home/components/facebook/facebook.component';
import { SpotifyComponent } from './pages/home/components/spotify/spotify.component';
import { SnapchatComponent } from './pages/home/components/snapchat/snapchat.component';
import { FooterComponent } from './pages/home/components/footer/footer.component';
import { BackToTopComponent } from './pages/home/components/back-to-top/back-to-top.component';
import { PostsComponent } from './pages/home/components/posts/posts.component';

import { PostComponent } from './pages/post-create/post.component';


import { 
  SmdFabSpeedDialTrigger, 
  SmdFabSpeedDialActions, 
  SmdFabSpeedDialComponent 
} from './components/smd-fab-speed-dial';

import { AuthorizationService } from './services/authorization.service';
import { SanitizeHtmlPipe } from './pipe/sanitize-html-pipe';

//userLoggedService
import {UserLoggedService} from './services/user-logged.service';

import { AppConfig } from "../environments/app-config";
import { environment } from "../environments/environment";




@NgModule({
  declarations: [
    SanitizeHtmlPipe,
    AppComponent,
    HeadBarComponent,
    SubMenuComponent,
    FroalaComponent,
    LoginPageComponent,
    LoadInfoComponent,
    HomeComponent,
    PostComponent,
    InfoThaisComponent,
    InfoCristianComponent,
    InstagramComponent,
    FacebookComponent,
    BackToTopComponent,
    PostsComponent,
    SmdFabSpeedDialTrigger, 
    SmdFabSpeedDialActions, 
    SmdFabSpeedDialComponent, 
    DialogPostsInactiveComponent, 
    SpotifyComponent,
    FooterComponent, 
    SnapchatComponent,
    HeaderSidenavComponent, 
    BodySidenavComponent
  ],
  imports: [
    BrowserModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DisqusModule.forRoot('ngx'),
    HttpModule,
    // MaterialModule,
    MdProgressSpinnerModule,
    MdCardModule,
    MdToolbarModule,
    MdSnackBarModule,
    MdButtonModule,
    MdInputModule,
    MdDialogModule,
    MdNativeDateModule,
    MdMenuModule,
    MdSidenavModule,
    MdIconModule,
    MdTooltipModule,
    MdCheckboxModule,
    MdPaginatorModule,
    MdListModule,
    // MdPaginatorIntl,
    FlexLayoutModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    Routing,
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: environment.APP_BASE_HREF }, 
              // {provide: MdPaginatorIntl, useValue: getSpanishPaginatorIntl()},
                AuthorizationService, UserLoggedService, PostDataService],

  //configuração modal
  entryComponents: [LoadInfoComponent, DialogPostsInactiveComponent],

  bootstrap: [AppComponent]



})

export class AppModule { }
