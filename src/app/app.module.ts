import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CreateAddressFormComponent } from "./components/perfil/manage-address/create-address/create-address-form/create-address-form.component";
import { FormsModule } from "@angular/forms";


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
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {}