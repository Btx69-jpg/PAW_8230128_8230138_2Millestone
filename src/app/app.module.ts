import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [
        AppComponent,
    ], 
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {}