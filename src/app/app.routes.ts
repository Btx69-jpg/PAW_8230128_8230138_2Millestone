/**
 * Aqui são as rotas que posso aceder, estilo o Routes
 * 
 */
import { Routes } from '@angular/router';
import { UserComponent } from './components/perfil/user/user.component';
import { ChangePasswordPageComponent } from './components/perfil/changePassword/change-password-page/change-password-page.component';

/**
 * Isto é os routes que tinha no express
 */
export const routes: Routes = [
    { 
        path: '', 
        component: UserComponent 
    },
    { 
        path: 'perfil/user', 
        component: UserComponent 
    },
    { 
        path: 'perfil/user/changePassword', 
        component: ChangePasswordPageComponent 
    },
];
