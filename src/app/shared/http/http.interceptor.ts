import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpLocalhost } from './http-url';

@Injectable()
export class CommonHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = HttpLocalhost + req.url;
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