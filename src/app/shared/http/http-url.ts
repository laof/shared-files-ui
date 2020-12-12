import { environment } from "src/environments/environment";
export const HttpLocalhost = environment.production ? location.host : 'http://localhost:5200';

export const HttpUrl = {
    list: '/list',
    upload: '/upload',
    host: '/host',
    talkHistory: '/talk_history',
}


