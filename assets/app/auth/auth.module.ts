import { NgModule } from "@angular/core";
import { LogoutComponent } from "./logout.component";
import { SignInComponent } from "./signin.component";
import { SignUpComponent } from "./signup.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { authRouting } from "./auth.routing";

@NgModule({
    declarations:[
        LogoutComponent,
        SignInComponent,
        SignUpComponent,
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        authRouting
    ],
    providers:[]
})
export class AuthModule{

}