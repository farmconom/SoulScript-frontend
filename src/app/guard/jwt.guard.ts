import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JwtGuard {
  constructor(private router: Router) {}

  async canActivate() {
    this.router.navigate(['/public']);
    return true;
  }
}

// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   Router,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { isEmpty } from 'lodash';

// @Injectable({
//   providedIn: 'root',
// })
// export class JwtGuard {
//   constructor(private router: Router) {}

//   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const tokens = this.authService.getTokens();
//     if (isEmpty(tokens)) {
//       this.authService.logout();
//       return false;
//     }

//     isEmpty(this.authService.userState) && (await this.authService.setUserInfo());
//     if (!this.authService.userState?.isInitProfile && state.url !== '/register') {
//       this.router.navigate(['/register']);
//     }
//     return true;
//   }
// }
