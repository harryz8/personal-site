import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Timeline } from './timeline/timeline'
import { Timetable } from './timetable/timetable';
import { Notebook } from './notebook/notebook';
import { LoadTimetableJson } from './load-timetable-json/load-timetable-json';

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
        path: 'timetable:c',
        component: Timetable,
    },
    {
        path: 'auth-timetable',
        component: LoadTimetableJson,
    },
    {
        path: 'notebook',
        component: Notebook,
    }
];
