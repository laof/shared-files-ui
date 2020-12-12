import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpLocalhost } from './http-url';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommonHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url = req.url;

        if (!environment.production) {
            url = HttpLocalhost + url;
        }

        req = req.clone({ url });
        return next.handle(req).pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        if (event.status >= 500) {
                        }
                    }
                },
                error => {
                })
        );
    }
}