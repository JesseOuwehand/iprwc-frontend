import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Message} from "../models/message.model";

@Injectable({ providedIn: 'root' })
export class MessageService {
  toast = new BehaviorSubject<Message>(null);

  toggleToast(message: Message) {
    this.toast.next(message);
  }

  closeToast() {
    this.toast.next(null);
  }
}
