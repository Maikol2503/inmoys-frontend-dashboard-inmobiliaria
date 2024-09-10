import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService)
  const router = inject(Router)

  if(authService.isAuthenticated()){
    return true;
  }
  else{
    return router.navigate(["/login"])
  }
};
