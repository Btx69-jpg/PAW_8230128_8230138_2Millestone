/**
 * Aqui são as rotas que posso aceder, estilo o Routes
 * 
 */
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/perfil/user/user.component';
import { ChangePasswordPageComponent } from './components/perfil/changePassword/change-password-page/change-password-page.component';
import { NgModule } from '@angular/core';
import { HistoricOrdersComponent } from './components/perfil/historic-orders/historic-orders.component';
import { ManageAddressComponent } from './components/perfil/manage-address/manage-address.component';
import { AppComponent } from './app.component';
import { EditAddressPageComponent } from './components/perfil/manage-address/edit-address/edit-address.component';

/**
 * Isto é os routes que tinha no express
 */
export const routes: Routes = [
    { 
        path: '', 
        component: AppComponent 
    },
    { 
        path: 'perfil/user/:userId', 
        component: UserComponent 
    },
    { 
        path: 'perfil/user/:userId/historicOrder', 
        component: HistoricOrdersComponent 
    },
    { 
        path: 'perfil/user/:userId/manageAddresses', 
        component: ManageAddressComponent,
    },
    {
        path: 'perfil/user/:userId/manageAddresses/edit/:addressId',
        component: EditAddressPageComponent
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