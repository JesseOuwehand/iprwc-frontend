import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {map, Observable, take} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
    return this.authenticationService.currentUser.pipe(
      take(1),
      map(user => {
        if (!!user && user.role === 'admin') {
          return true;
        }
        return this.router.createUrlTree(['/']);
      })
    )
  }
}
