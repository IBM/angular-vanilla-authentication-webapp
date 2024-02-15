import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) { }
  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const loggedInUser = localStorage.getItem("loggedInUser");
      const loggedInRole = localStorage.getItem("role");
   
      const { routeConfig } = route; 
      
      const { path } = routeConfig as Route; 
      
      if ((path?.includes('dashboard') || path?.includes('users') || path?.includes('change-password')) && !loggedInUser) {
        this.router.navigateByUrl('/');
        return false;
      }

      // if (path?.includes('users') && loggedInUser && loggedInUser.length && loggedInRole === 'user') {
      //   this.router.navigateByUrl('/dashboard');
      //   return false;
      // }
       
      if ((!path || path?.includes('register')) && loggedInUser && loggedInUser.length) {  
        this.router.navigateByUrl('/dashboard');
        return true;
      }
      return true;
  }
  
}
