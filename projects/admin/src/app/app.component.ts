import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'admin';
  
  isSideNavCollapsed = false;
  screenWidth = 0;

  isLoggedIn=false;

  constructor(private authService: AuthService){}
  
  ngOnInit(): void {
    if(this.authService.getToken()) this.isLoggedIn=true; 
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
