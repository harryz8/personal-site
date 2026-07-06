import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Timeline } from './timeline/timeline'

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'timeline',
        component: Timeline,
    },
];
