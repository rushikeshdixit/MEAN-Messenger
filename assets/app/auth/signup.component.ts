/* Data Driven Approach for a form to use custom built form module in html */

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector:'app-signup',
    templateUrl:'signup.component.html'
})
export class SignUpComponent implements OnInit{
    myForm: FormGroup;

    constructor(private authService: AuthService){}

    onSubmit(){
        const user = new User(
            this.myForm.value.email, 
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );
        this.authService.signup(user)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );

        // console.log(this.myForm);
        // this.myForm.reset();
        
    }
    
    ngOnInit(){
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                // Validators.pattern("/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }
    
}