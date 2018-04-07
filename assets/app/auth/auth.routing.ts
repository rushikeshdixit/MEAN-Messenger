import { Routes, RouterModule } from "@angular/router";
import { SignUpComponent } from "./signup.component";
import { SignInComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";

const AUTH_ROUTES: Routes = [
    {path:'', redirectTo:'signup', pathMatch:'full'},
    {path: 'signup', component: SignUpComponent},
    {path: 'signin', component: SignInComponent},
    {path: 'logout', component: LogoutComponent}
];

export const authRouting = RouterModule.forChild(AUTH_ROUTES);