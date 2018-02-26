import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../models/user.model';

@Injectable()
export class IsLoggedinGuard implements CanActivate {

  localStorageService: LocalStorageService;
  router: Router;
  storedAuth: User;
  isAllowed: boolean;

  constructor(localStorageService: LocalStorageService, router: Router) {
    this.localStorageService = localStorageService;
    this.router = router;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      const storageStream = this.localStorageService.get<User>('auth')
      .subscribe((obj: User) => {
        this.storedAuth = obj;
        if(obj !== undefined)
        {
          this.isAllowed = true;
        }
      },
      err => { this.isAllowed = false; },
    () => {
      if (!this.isAllowed) {
        this.router.navigate(['/login']);
      }
    });
      return this.isAllowed;
  }
}
