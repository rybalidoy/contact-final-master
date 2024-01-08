import { Routes } from '@angular/router';
import { HomePageComponent } from './Home/home.component';
import { DetailsPageComponent } from './Details/details.component';
import { ErrorPageComponent } from './Error/error.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', title: 'Contacts', component: HomePageComponent },
    {
        path: 'details/:id',
        title: 'View Details',
        component: DetailsPageComponent,
    },
    { path: 'error', title: 'Error 404', component: ErrorPageComponent },
    { path: '**', redirectTo: '/error', pathMatch: 'full' },
];
