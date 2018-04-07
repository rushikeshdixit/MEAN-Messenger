import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";

import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header.component';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { AuthService } from './auth/auth.service';
import { ErrorComponent } from './error/error.component';
import { ErrorService } from './error/error.service';
import { MessageModule } from './messages/message.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule, 
        routing,
        HttpModule,
        MessageModule,
        AuthModule
    ],
    providers:[AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}