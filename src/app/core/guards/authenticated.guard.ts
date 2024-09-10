import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { inject } from '@angular/core';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService)
  const router = inject(Router)

  if(authService.isAuthenticated()){
    return router.navigate(["/inicio"])
  }
  else{
    return true
  }
};
