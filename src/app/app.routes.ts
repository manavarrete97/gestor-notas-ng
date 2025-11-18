import { Routes } from '@angular/router';
import { EstudianteComponent } from './components/estudiante/estudiante';
import { MateriaComponent } from './components/materia/materia';
import { NotaComponent } from './components/nota/nota';
import { HomeComponent } from './components/home/home';
import { ProfesorComponent } from './components/profesor/profesor';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'estudiantes',
        component: EstudianteComponent
    },
    {
        path: 'materias',
        component: MateriaComponent
    },
    {
        path: 'notas',
        component: NotaComponent
    },
    {
        path: 'profesores',
        component: ProfesorComponent
    }
];
