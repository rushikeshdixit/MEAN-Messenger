import { Component, OnInit } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component({
    selector:"app-msg-list",
    template:`  
                <div class="col-md-8 col-md-offset-2">
                    <app-msg [message]="message"
                    *ngFor = "let message of messages"></app-msg> 
                </div>
                `
})
export class MessageListComponent implements OnInit{
    messages: Message[];
    constructor(private messageService: MessageService){}
    ngOnInit(){
        this.messageService.getMessages()
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                })
    }
}