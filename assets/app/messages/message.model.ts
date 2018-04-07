export class Message{
    content: String;
    username: String;
    messageid?: String;
    userId?:String;

    constructor(content: String, username:String, messageId?: String, userId?: String){
        this.content = content;
        this.username = username;
        this.messageid = messageId;
        this.userId = userId;
    }
}