import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';


export const authenticGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService.isAuthenticated().pipe(
    tap((data:any)=>{
      if(data.message == false)
      {
        router.navigate(['signup'])
      }
    })
  )
};
