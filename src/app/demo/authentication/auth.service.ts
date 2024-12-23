import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  // Importa tap para manejar efectos secundarios
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/login'; // Dirección de la API simulada

  constructor(private http: HttpClient, private router: Router) {}

  // Función para hacer login
  login(username: string, password: string, appid: number): Observable<any> {
    const loginData = { username, password, appid };
    console.log("Enviando datos de login:", loginData);  // Log de los datos enviados

    return this.http.post<any>(this.apiUrl, loginData).pipe(
      tap(response => {
        console.log("Respuesta del servidor:", response);  // Log de la respuesta del servidor

        if (response.error === 0 && response.numid) {
          // Guarda el token en sessionStorage si la autenticación es exitosa
          this.setToken('your-token-here'); // Aquí deberías usar el token real que recibes de la API
          console.log("Token guardado: 'your-token-here'");  // Log cuando se guarda el token

          // Mostrar alerta de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Acceso permitido!',
            text: 'Bienvenido al sistema.',
          });
        } else {
          // Mostrar alerta de error
          Swal.fire({
            icon: 'error',
            title: 'Credenciales inválidas',
            text: 'Por favor verifica tu usuario y contraseña.',
          });
        }
      })
    );
  }


  // Guardar token en sessionStorage
  setToken(token: string): void {
    sessionStorage.setItem('token', token);
    console.log("Token guardado en sessionStorage:", token);  // Log del token guardado
  }

  // Obtener token
  getToken(): string | null {
    const token = sessionStorage.getItem('token');
    console.log("Obteniendo token de sessionStorage:", token);  // Log del token recuperado
    return token;
  }

  // Función para cerrar sesión
  logout(): void {
    sessionStorage.removeItem('token');
    console.log("Token eliminado de sessionStorage.");  // Log cuando se elimina el token
    this.router.navigate(['/login']);
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    const token = this.getToken();
    console.log("Usuario autenticado:", !!token);  // Log para verificar si hay token
    return !!token;
  }
}
