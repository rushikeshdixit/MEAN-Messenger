import { Message } from "./message.model";

import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/Rx';
import { ErrorService } from "../error/error.service";

@Injectable()
export class MessageService{
    private messages: Message[] = [];
    editMessageEvent = new EventEmitter<Message>();
    constructor(private http: Http, private errorService: ErrorService){}

    addMessage(message: Message){
        const body = JSON.stringify(message);
        const customHeaders = new Headers({'Content-Type': 'application/json'});
        //recive token and verify user
        const verifyingToken = localStorage.getItem('token')?'?token='+localStorage.getItem('token'):'';
        return this.http.post("http://localhost:3000/message"+verifyingToken, body, {headers: customHeaders})
                .map((response: Response)=> {
                    const result = response.json();
                    const message = new Message(
                        result.obj.content, 
                        result.obj.user.firstName, 
                        result.obj._id, 
                        result.obj.user._id);
                    this.messages.push(message);
                    return message;
                })
                .catch((error: Response)=> {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json())
                });
    }
    getMessages(){
        return this.http.get("http://localhost:3000/message")
                .map((response: Response)=>{
                    const messages = response.json().obj
                    let transformedMessages: Message[] = [];
                    for(let message of messages){
                        transformedMessages.push(new Message(
                            message.content,
                            //gettinf firstname based on user logged in 
                            message.user.firstName, 
                            message._id, 
                            message.user._id)
                    );
                    }
                    this.messages = transformedMessages;
                    return transformedMessages;
                })
                .catch((error: Response)=> {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json())
                });
    }

    editMessage(message: Message){
        this.editMessageEvent.emit(message);
    }

    updateMessage(message: Message){
        const body = JSON.stringify(message);
        const customHeaders = new Headers({'Content-Type': 'application/json'});
        const verifyingToken = localStorage.getItem('token')?'?token='+localStorage.getItem('token'):'';
        return this.http.patch("http://localhost:3000/message/" +message.messageid +verifyingToken, body, {headers: customHeaders})
                .map((response: Response)=> response.json())
                .catch((error: Response)=> {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json())
                });

    }

    deleteMessage(message: Message){
        this.messages.splice(this.messages.indexOf(message), 1);
        const verifyingToken = localStorage.getItem('token')?'?token='+localStorage.getItem('token'):'';
        return this.http.delete("http://localhost:3000/message/" +message.messageid+verifyingToken)
        .map((response: Response)=> response.json())
        .catch((error: Response)=> {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json())
        });
    }
}