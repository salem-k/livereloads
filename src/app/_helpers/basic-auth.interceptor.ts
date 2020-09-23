import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    const token = localStorage.getItem("token");

    console.log("TOKENNNN ",token)
    console.log(request.url)

    if (token) {
      request = request.clone({
        headers: request.headers.set("Authorization", "Token " + token)
      });
    }
    
    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
          return;
        }
        this.router.navigate(['login-page']);
      }
    }))
    return next.handle(request)//.pipe(timeout(36000))

  }
}
