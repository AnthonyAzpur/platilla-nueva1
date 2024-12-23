import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../demo/authentication/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Verifica si el usuario está autenticado
    const isLoggedIn = this.authService.isLoggedIn();
    console.log("isLoggedIn:", isLoggedIn);  // Verifica el estado de autenticación

    if (isLoggedIn) {
      console.log("Acceso permitido. El usuario está autenticado.");
      return true;
    } else {
      // Si el usuario no está autenticado, redirige al login
      console.log("Acceso denegado. Redirigiendo al login...");
      this.router.navigate(['/login']);
      Swal.fire({
        text: 'Debes iniciar sesión para acceder a esta página.',
        icon: 'warning',
        confirmButtonColor: '#EA535A',
        color: '#171719',
        confirmButtonText: 'Ir a Login',
      }).then(() => {
        // Redirige al login tras cerrar la alerta
        this.router.navigateByUrl('/login');
      });
      return false;  // No permite el acceso
    }
  }
}
