import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './pages/post-create/post.component';

import { AuthorizationService } from './services/authorization.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'post/:id', component: HomeComponent },
    { path: 'post/tags/:tag', component: HomeComponent },
    { path: 'post/categoria/:category', component: HomeComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'post-create', canActivate:[AuthorizationService], component: PostComponent },
    { path: 'post-create/:id', canActivate:[AuthorizationService], component: PostComponent },
    
];

export const RoutingProviders: any[] = [];
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);