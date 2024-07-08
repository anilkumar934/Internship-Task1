import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem("token");
  const route = inject(Router);
  req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
  return next(req).pipe(catchError((err) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        route.navigate(['signup'])
      }
    }
    return throwError(() => err);
  }))
};