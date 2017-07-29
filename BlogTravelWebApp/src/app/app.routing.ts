import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/shared/login-page/login-page.component';
import { PostWebPageComponent } from './pages/post-web-page/post-web-page.component';

const appRoutes: Routes = [
    { path: '', component: PostWebPageComponent},
    { path: 'login', component: LoginPageComponent}
];

export const RoutingProviders: any[] = [];
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);