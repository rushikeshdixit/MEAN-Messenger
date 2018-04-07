import { NgModule } from "@angular/core";
import { MessageComponent } from '../messages/message.component';
import { MessageListComponent } from '../messages/message-list.component';
import { MessageInputComponent } from '../messages/message-input.component';
import { ParentMsgComponent } from '../messages/parent-msg.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MessageService } from "./message.service";

@NgModule({
    declarations:[
        MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        ParentMsgComponent
    ],
    imports:[CommonModule, FormsModule],
    providers:[MessageService]
})
export class MessageModule{

}