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
  list: Message[] = [{
    author: 'fdasfa',
    text: 'fdsfafd'
  },
  {
    author: 'fdasfa',
    text: 'fdsfafd'
  }];
  text: string = '';

  private socket: any = null;

  constructor(private http: HttpClient, private storage: CommonStorageService) {

    const id = this.storage.getMyId();
    if (!id) {
      this.storage.setMyId(new Date().getTime().toString())
    }

    console.log(id);
    this.myId = this.storage.getMyId();

    this.list.push({
      author: this.myId,
      text: '123'
    })

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
  ngOnDestroy(): void {
    try {
      this.socket.disconnect();
      this.socket.destroy();
    } catch (e) {
      console.log('socket ngOnDestroy error');
    }
  }

  send() {
    this.socket.emit('chat message', this.text);
    this.text = ''
  }

  talkMessage(html: string) {
    // var ele = $('.talk-list').append(html)[0];
    // ele.scrollTop = ele.scrollHeight;
  }


  getTalkTemp(data: any) {

    // var myself = data.author === myId;
    // var typeClass = myself ? 'my' : 'other';

    // var talk = '';
    // var pre = $('<pre/>').text(data.text).prop('outerHTML');

    // var icon = '<i class="' + (myself ? 'am-icon-caret-right' : 'am-icon-caret-left') + '"></i>';

    // if (myself) {
    //   talk = pre + icon;
    // } else {
    //   talk = icon + pre;
    // }

    // var html = [
    //   '<div class="take-item ', typeClass, '"><table><tr>',
    //   '<td class="user-info other-info"><i></i></td>',
    //   '<td class="text-rea">', talk, '</td>',
    //   '<td class="user-info my-info"><i></i></td>',
    //   '</tr></table></div>'
    // ].join('');

    // return html;
  }

  ngOnInit(): void {
  }

}
