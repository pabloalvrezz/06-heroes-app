import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAutentication()
      .pipe(
        tap(isAuthenticated => console.log('Authenticated:', isAuthenticated)),
        tap(isAuthenticated => {
          if (!isAuthenticated) this.router.navigate(['./auth/login'])
        })
      )
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.checkAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return false;

  }




}
