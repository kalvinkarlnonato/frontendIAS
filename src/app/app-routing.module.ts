import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SiginComponent } from './components/sigin/sigin.component';
import { HomeComponent } from './components/home/home.component';
import { InspectionComponent } from './components/inspection/inspection.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'inspection', component: InspectionComponent },
  { path: 'login', component: SiginComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload',
    anchorScrolling: 'enabled',
    enableTracing: false
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
