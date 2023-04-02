import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MembersComponent } from './components/members/members.component';
import { InvestigationComponent } from './components/investigation/investigation.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileGuard } from './guards/profile.guard';
import { MembersGuard } from './guards/members.guard';
import { InvestigatorGuard } from './guards/investigator.guard';
import { UsersGuard } from './guards/users.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  
  { canActivate: [AuthGuard],         path: 'dashboard',        component: DashboardComponent},
  { canActivate: [ProfileGuard],      path: 'profile',          component: ProfileComponent },
  { canActivate: [MembersGuard],      path: 'members',          component: MembersComponent },
  { canActivate: [InvestigatorGuard], path: 'investigation',    component: InvestigationComponent },
  { canActivate: [UsersGuard],        path: 'users',            component: UsersComponent },

  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
