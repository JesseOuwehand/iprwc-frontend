import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MessageService} from "../../services/message.service";
import {Message} from "../../models/message.model";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {

  private messageSubscription: Subscription;
  toast: Message;

  constructor(private messageService: MessageService) {}

  closeToast() {
    this.messageService.closeToast();
  }

  ngOnInit() {
    this.messageSubscription = this.messageService.toast.subscribe(value => {
      this.toast = value;
    })
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
