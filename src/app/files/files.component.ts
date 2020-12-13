import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { HttpLocalhost, HttpUrl } from '../shared/http/http-url';
import { CommonStorageService } from '../shared/service/storage.service';
import { saveAs } from 'file-saver';

enum FileType {
  directory = 'directory',
  file = 'file'
}


interface FileItem {
  size: number;
  name: string;
  type: FileType;
  path: string;

  children?: FileItem[];
  download?: string;
  extension?: string;
}

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less']
})
export class FilesComponent implements OnInit {
  private root = '';
  private fileMap: any = {};

  uploadUrl = HttpUrl.upload;

  loading = true;

  visibleScan = false;

  fileType = FileType.file;
  size: NzButtonSize = 'small';
  fileList: NzUploadFile[] = [];
  children: any = [];
  view = false;
  style = false;

  cache = {
    path: '',
    mode: '',
    gridList: '',
    homePath: ''
  };

  constructor(private http: HttpClient, private storage: CommonStorageService) {
    this.view = !!this.storage.getView()
    this.style = !!this.storage.getStyle()
    this.loadData();
  }

  upload(data: any) {
  }


  back() {
    var thanPath = this.cache.path;
    if (thanPath && thanPath != this.root) {
      var list = thanPath.split('/');
      list.pop();
      this.children = this.sort(list.join('/'));
    } else {
      this.children = this.sort(this.root);
    }
  }

  home() {
    this.children = this.sort(this.root);
  }

  setPathMap(item: any) {
    var children: any[] = item.children;
    if (children) {
      if (!this.fileMap[item.path] && item.type != 'file') {
        this.fileMap[item.path] = children;
      }
      children.forEach((v) => {
        this.setPathMap(v);
      })
    }
  }

  toSize(size: number, numType = false) {
    var num = 1024.00;
    //byte
    if (!size) {
      return numType ? 0 : 'No size';
    }
    if (size < num) {
      return size + 'B';
    }
    if (size < Math.pow(num, 2)) {
      return (size / num).toFixed(2) + 'K';
    }
    //kb
    if (size < Math.pow(num, 3)) {
      return (size / Math.pow(num, 2)).toFixed(2) + 'M';
    }
    //M
    if (size < Math.pow(num, 4)) {
      return (size / Math.pow(num, 3)).toFixed(2) + 'G';
    }
    //G
    return (size / Math.pow(num, 4)).toFixed(2) + 'T';
  }


  currentPath(path: string) {
    this.storage.setPath(path);
    this.cache.path = path;
  }


  loadData() {
    this.loading = true;
    this.http.post(HttpUrl.list, null).subscribe((data: any) => {
      this.loading = false;
      if (data && data.success) {
        this.root = data.path;
        const path = this.storage.getPath() || this.root;
        this.fileMap = {};
        this.setPathMap(data);
        this.children = this.sort(path);
      }
    }, () => this.loading = false)
  }

  fileClick(item: FileItem) {
    if (item.children) {
      this.children = this.sort(item.path);
    } else if (item.type === FileType.file) {
      const url = HttpLocalhost + item.download;
      this.view ? window.open(url) : this.downloadHttp(item, url);
    }
  }

  downloadHttp(item: FileItem, url = '') {
    saveAs(HttpLocalhost + item.download, item.name);
    // this.http.post(HttpUrl.download, null, {
    //   params: { file: this.root + item.download, fileName: item.name }
    // }).subscribe(res => { })
  }

  onViewChange(value: boolean) {
    this.view = value
    this.storage.setView(value)
  }

  onStyleChange(value: boolean) {
    this.style = value
    this.storage.setStyle(value)
  }

  sort(key: string): any[] {
    var data = this.fileMap[key];
    this.currentPath(key);
    if (data) {
      const directory: any[] = [];
      const files: any[] = [];
      data.forEach((v: any, i: number) => {
        var isFile = v.type == 'file';
        if (isFile) {
          files.push(v);
        } else {
          directory.push(v);
        }
      });
      return directory.concat(files);
    }
    return [];
  }

  uplodInfo() {
    let total = 0;
    let balance = 0;
    this.fileList.forEach(item => {
      if (item.percent && item.size) {
        total += item.size || 0;
        balance += item.size * item.percent * 0.01;
      }
    });

    if (this.fileList.length) {
      const s = this.fileList.length;
      const t = this.toSize(total, true);
      const b = this.toSize(balance, true);
      return `Total : ${s}   ( ${b} / ${t} )`
    }
    return ''
  }

  clearList() {
    this.fileList = [];
  }

  uploadChange(data: NzUploadChangeParam) {
    // if (data.type === 'success') {
    //   const index = this.fileList.findIndex(item => {
    //     return item.uid === data.file.uid
    //   })
    //   if (index != -1) {
    //     this.fileList.splice(index, 1);
    //   }
    // }
  }

  ngOnInit(): void {
  }

}
