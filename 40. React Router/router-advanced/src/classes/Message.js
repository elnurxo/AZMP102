import { nanoid } from "nanoid";

class Message {
  constructor(email, phoneNumber, subject, message) {
    this.id = nanoid();
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.subject = subject;
    this.message = message;
    this.createdAt = new Date();
  }
}

export default Message;
