import { Injectable } from "@angular/core";

class BaseStorage {
    stor = window.localStorage
    myId = '_l_o_v_a_name1550299839288'
    pathKey = '_l_o_v_a_path1550299839288'
    viewKey = '_l_o_v_a_mode1550299839288'
    tabsKey = '__l_o_v_a_tabs1550299839288'
    gridListKey = '_l_o_v_a_grid_list1550299839288'

    setBase(key: string, value: any) {
        var stor = this.stor
        if (stor) {
            stor.setItem(key, value)
        }
        return '';
    }

    getBase(key: string) {
        return this.stor.getItem(key) || ''
    }

}


@Injectable({ providedIn: 'root' })
export class CommonStorageService extends BaseStorage {
    memory = {
        path: '',
        mode: '',
        gridList: '',
        homePath: ''
    };

    getPath() {
        return this.getBase(this.pathKey);
    }

    setPath(path: string) {
        this.setBase(this.pathKey, path);
    }

    removePath() {
        if (this.stor) {
            this.stor.removeItem(this.pathKey);
        }
    }

    getView() {
        return this.getBase(this.viewKey);
    }

    setView(value: boolean) {
        this.memory.mode = value ? 'yes' : '';
        this.setBase(this.viewKey, this.memory.mode);
    }

    getGridList() {
        return this.getBase(this.gridListKey);
    }

    setGridList(str: string) {
        this.memory.gridList = str;
        this.setBase(this.gridListKey, str);
    }
}