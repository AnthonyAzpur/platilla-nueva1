import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/login'; // Dirección de la API simulada

  constructor(private http: HttpClient, private router: Router) {}

  // Función para hacer login
  login(usuario: string, contraseña: string, app_id: number): Observable<any> {
    const loginData = { usuario, contraseña, app_id };
    return this.http.post<any>(this.apiUrl, loginData);
  }

  // Guardar token en sessionStorage
  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  // Obtener token
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Función para cerrar sesión
  logout(): void {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
