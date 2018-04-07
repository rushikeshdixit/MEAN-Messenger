import { Component } from "@angular/core";

@Component({
    selector:'app-par-msg',
    template:   `
                <div class="row">
                    <app-msg-input></app-msg-input>
                </div>
                <hr>
                <div class="row">
                    <app-msg-list></app-msg-list>
                </div> 
                `
})
export class ParentMsgComponent{

}