import { environment } from "src/environments/environment";
export const HttpLocalhost = environment.production ? location.host : 'http://localhost:5200';

export const HttpUrl = {
    list: '/api/list',
    upload: '/api/upload',
    talkHistory: '/api/talk_history',
}


