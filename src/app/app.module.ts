import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FilesComponent } from './files/files.component';
import { ChatComponent } from './chat/chat.component';
import { CommonHttpInterceptor } from './shared/http/http.interceptor';

import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
// import { NzInputModule } from 'ng-zorro-antd/input';

registerLocaleData(en);

const LoadNzModuel = [
  NzMenuModule,
  NzModalModule,
  NzUploadModule,
  // NzInputModule,
  // NzIconModule,
  NzSwitchModule,
  NzButtonModule,
  NzSpinModule,
]

import { ScanOutline, ShakeOutline, WechatOutline, SendOutline, CloudUploadOutline, HomeOutline, RollbackOutline, LoadingOutline } from '@ant-design/icons-angular/icons';
import { RouterModule } from '@angular/router';
const icons = [ScanOutline, ShakeOutline, WechatOutline, SendOutline, CloudUploadOutline, HomeOutline, RollbackOutline, LoadingOutline];

@NgModule({
  declarations: [
    AppComponent,
    FilesComponent,
    ChatComponent
  ],
  imports: [
    ...LoadNzModuel,
    NzIconModule.forRoot(icons),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: CommonHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
