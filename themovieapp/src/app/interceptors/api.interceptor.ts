import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";

import { Observable, of } from "rxjs";

const API_KEY = "af44e351eba4d21316a7fbc75f41375d";

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.warn("APIInterceptor");

    //replace API_KEY
    const httpsReq = req.clone({
      url: req.url.replace("API_KEY", API_KEY)
    });

    console.info("INTERCEPTOR URL => ", httpsReq.url);

    return next.handle(httpsReq);
  }
}