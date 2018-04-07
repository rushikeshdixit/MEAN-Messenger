import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { ParentMsgComponent } from "./messages/parent-msg.component";

const APP_ROUTES: Routes = [
    {path:'', redirectTo:'/messages', pathMatch:'full'},
    {path: 'messages', component: ParentMsgComponent},
    //loadChildren method lazy loads the child routed specified in auth.module file
    {path: 'auth', component: AuthComponent, loadChildren:'./auth/auth.module#AuthModule'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);