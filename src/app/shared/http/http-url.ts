import { environment } from "src/environments/environment";
export const HttpLocalhost = environment.production ? '' : 'http://localhost:5200';

export const HttpUrl = {
    list: '/api/list',
    upload: '/api/upload',
    talk_history: '/api/talk_history',
}


