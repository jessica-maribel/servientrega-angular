import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { CreateGuideComponent } from './shipments/create-guide/create-guide.component';
import { ListGuidesComponent } from './shipments/list-guides/list-guides.component';
import { TrackingComponent } from './shipments/tracking/tracking.component';
import { AuthGuard } from './core/guards/auth.guard';  // 👈 import del guard

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'guias/nueva', component: CreateGuideComponent, canActivate: [AuthGuard] },
  { path: 'guias', component: ListGuidesComponent, canActivate: [AuthGuard] },
  { path: 'tracking', component: TrackingComponent, canActivate: [AuthGuard] },

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
