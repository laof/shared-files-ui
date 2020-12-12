import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpLocalhost, HttpUrl } from '../shared/http/http-url';
import { io } from 'socket.io-client';
import { CommonStorageService } from '../shared/service/storage.service';
interface Message {
  author: string;
  text: string;
  time?: number
  type?: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit, OnDestroy {

  myId: string = '';
  list: Message[] = [];
  text: string = '';

  private socket: any = null;

  constructor(private http: HttpClient, private storage: CommonStorageService) {

    const id = this.storage.getMyId();
    if (!id) {
      this.storage.setMyId(new Date().getTime().toString())
    }

    this.myId = this.storage.getMyId();

    // this.list.push({
    //   author: this.myId,
    //   text: '123'
    // })

    const socket = io(HttpLocalhost);
    socket.on('connect', () => {
      console.log('22');
      socket.emit('chat message', this.myId);
    });
    socket.on('event', (data: any) => {
      // console.log(data);
    });
    socket.on('chat message', (data: Message) => {
      this.list.push(data);
    });
    socket.on('disconnect', () => { });

    this.socket = socket;

    this.http.post(HttpUrl.talkHistory, null).subscribe((res: any) => {
      const list: Message[] = res.list || [];
      this.list = list.concat(this.list);
    })
  }

  send() {
    this.socket.emit('chat message', this.text);
    this.clear();
  }

  clear() {
    this.text = '';
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    try {
      this.socket.disconnect();
      this.socket.destroy();
    } catch (e) {
      console.log('socket ngOnDestroy error');
    }
  }

}
