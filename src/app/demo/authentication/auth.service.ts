import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    // Verifica si el token existe en sessionStorage
    return !!sessionStorage.getItem('auth_token');
  }

  // Inicia sesión y guarda el token en sessionStorage
  login(token: string): void {
    sessionStorage.setItem('auth_token', token);
  }

  // Cierra sesión y elimina el token
  logout(): void {
    sessionStorage.removeItem('auth_token');
  }

  // Obtener información del usuario almacenada
  getUser(): any {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }
}
