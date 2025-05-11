/**
 * Aqui são as rotas que posso aceder, estilo o Routes
 * 
 */
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/perfil/user/user.component';
import { ChangePasswordPageComponent } from './components/perfil/changePassword/change-password-page/change-password-page.component';
import { NgModule } from '@angular/core';

/**
 * Isto é os routes que tinha no express
 */
export const routes: Routes = [
    { 
        path: '', 
        component: UserComponent 
    },
    { 
        path: 'perfil/user/:userId', 
        component: UserComponent 
    },
    { 
        path: 'perfil/user/changePassword', 
        component: ChangePasswordPageComponent 
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }