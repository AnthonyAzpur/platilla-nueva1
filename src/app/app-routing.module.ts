import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project imports
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { AuthGuard } from './auth.guard'; // Asegúrate de importar el guard

const routes: Routes = [
  {
    path: '',  // Ruta por defecto
    redirectTo: '/login',  // Redirige a la página de login
    pathMatch: 'full'  // Asegura que redirija solo si no hay otras rutas
  },
  {
    path: 'login',
    component: GuestComponent,  // Página de login
    children: [
      {
        path: '',
        loadComponent: () => import('./demo/authentication/login/login.component')
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],  // Protege las rutas bajo Admin
    children: [
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      }
    ]
  },
  {
    path: '**', // Redirige cualquier ruta no encontrada al login
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
