import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  {
    path: '',
    component: LoginComponent,
    data: { animation: 'login' },
  },
  {
    path: 'register',
    data: { animation: 'register' },
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'home' },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
