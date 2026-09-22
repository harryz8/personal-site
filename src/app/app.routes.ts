import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Timeline } from './timeline/timeline'
import { Timetable } from './timetable/timetable';
import { Notebook } from './notebook/notebook';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'background',
        component: Timeline,
    },
    {
        path: 'timetable',
        component: Timetable,
    },
    {
        path: 'notebook',
        component: Notebook,
    }
];
