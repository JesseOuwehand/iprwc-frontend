import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {exhaustMap, take} from "rxjs";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authenticationService.currentUser.pipe(
      take(1),
      exhaustMap(currentUser => {
        if (!currentUser) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${currentUser.token}`
          }
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
