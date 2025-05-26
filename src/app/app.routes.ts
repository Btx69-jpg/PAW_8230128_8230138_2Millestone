/**
 * Aqui são as rotas que posso aceder, estilo o Routes
 * 
 */
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/perfil/user/user.component';

import { NgModule } from '@angular/core';
import { HistoricOrdersComponent } from './components/perfil/historic-orders/historic-orders.component';
import { ManageAddressComponent } from './components/perfil/manage-address/manage-address.component';
import { AppComponent } from './app.component';
import { EditAddressPageComponent } from './components/perfil/manage-address/edit-address/edit-address.component';
import { CreateAddressComponent } from './components/perfil/manage-address/create-address/create-address.component';
import { HistoricDadosComponent } from './components/perfil/historic-orders/historic-dados/historic-dados.component';
import { ChangePasswordComponent } from './components/perfil/change-password/change-password.component';
import { AuthGuard } from './auth/AuthGuard';
import { IsClienteOrDonoGuard } from './auth/Guards/IsClienteOrDonoGuard';
import { EditUserPageComponent } from './components/perfil/user/editPage/edit-user-page/edit-user-page.component';
import { OrdersPageComponent } from './components/perfil/user/orders/ordes-page/ordes-page.component';
import { ShowOrderComponent } from './components/perfil/historic-orders/show-order/show-order.component';
import { OrderDetailsComponent } from './components/perfil/user/orders/order-details/order-details.component';
import { CartComponent } from './components/cart/cart/cart.component';

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
        component: UserComponent, 
        //canActivate: [AuthGuard]
    },
    { 
        path: 'perfil/user/:userId/changePassword', 
        component: ChangePasswordComponent,
        //canActivate: [AuthGuard, IsClienteOrDonoGuard]
    },
    { 
        path: 'perfil/user/:userId/editUser', 
        component: EditUserPageComponent,
        //canActivate: [AuthGuard, IsClienteOrDonoGuard]
    },
    {
        path: 'perfil/user/:userId/orders',
        component: OrdersPageComponent,
        //canActivate: [AuthGuard, IsClienteOrDonoGuard]
    },
    {
        path: 'perfil/user/:userId/orders/showOrder/:orderId',
        component: OrderDetailsComponent,
        //canActivate: [AuthGuard, IsClienteOrDonoGuard]
    },
    { 
        path: 'perfil/user/:userId/historicOrder', 
        component: HistoricOrdersComponent,
        //canActivate: [AuthGuard, IsClienteOrDonoGuard]
    },
        { 
        path: 'perfil/user/:userId/historicOrder/:orderId', 
        component: HistoricDadosComponent,
        //canActivate: [AuthGuard, IsClienteOrDonoGuard]
    },
    { 
        path: 'perfil/user/:userId/manageAddresses', 
        component: ManageAddressComponent,
        //canActivate: [AuthGuard, IsClienteOrDonoGuard]
    },
    {
        path: 'perfil/user/:userId/manageAddresses/edit/:addressId',
        component: EditAddressPageComponent,
        //canActivate: [AuthGuard, IsClienteOrDonoGuard]
    },
    {
        path: 'perfil/user/:userId/manageAddresses/adicionar',
        component: CreateAddressComponent,
        //canActivate: [AuthGuard, IsClienteOrDonoGuard]
    },
    {
        path: 'checkOut/:userId',
        component: CartComponent,
        //canActivate: [AuthGuard, IsClienteOrDonoGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }