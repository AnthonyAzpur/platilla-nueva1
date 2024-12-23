import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/demo/authentication/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule], // Usamos FormsModule para ngModel
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const appId = 7; // Tu valor de app_id fijo

    this.authService.login(this.username, this.password, appId).subscribe({
      next: (response) => {
        if (response.error === 0) {
          // Si la respuesta es exitosa, redirige al dashboard
          this.router.navigate(['/dashboard/default']);
        } else {
          // Si la respuesta tiene error, muestra el mensaje de error
          this.errorMessage = response.mensa;
        }
      },
      error: (err) => {
        // Maneja errores en la solicitud HTTP (por ejemplo, problemas de red)
        this.errorMessage = 'Hubo un error en la autenticación';
      }
    });
  }
}
