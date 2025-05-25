import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CreateAddressFormComponent } from "./components/perfil/manage-address/create-address/create-address-form/create-address-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        CreateAddressFormComponent
    ], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule,
        FormsModule, 
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSnackBarModule
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})

export class AppModule {}