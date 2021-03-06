import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { DetailComponent } from './components/detail/detail.component';
import { SearchComponent } from './components/search/search.component';
import { _404Component } from './components/_404/_404.component';

const appRoutes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'search',
        component: SearchComponent
    },
    {
        path:'about',
        component: AboutComponent
    },
    {
        path:'detail',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path:'detail/:tkr',
        component: DetailComponent
    },
    {
        path:'**',
        component: _404Component
    }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
