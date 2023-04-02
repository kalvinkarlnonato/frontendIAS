import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
interface NavbarData{ routeLink: string; icon: string; label: string; }
const navbarData = [
  {
      routeLink: 'dashboard',
      icon: 'fal fa-home',
      label: 'Dashboard'
  },
  {
      routeLink: 'profile',
      icon: 'fal fa-user-circle',
      label: 'Profile'
  },
  {
      routeLink: 'members',
      icon: 'fal fa-poll-people',
      label: 'Members'
  },
  {
      routeLink: 'investigation',
      icon: 'fal fa-file-search',
      label: 'Investigation'
  },
  {
      routeLink: 'users',
      icon: 'fal fa-users',
      label: 'Users'
  },
];
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {
  
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData?:NavbarData[];
  loggined = false;

  constructor(private authService: AuthService, private router: Router){
    //this.navData= navbarData;
    if(authService.getToken()){
      let user = authService.getUser();
      if(user.role == 'su'){
        this.navData = [navbarData[0],navbarData[1],navbarData[2],navbarData[3],navbarData[4]];
      }else if(user.role == 'ad'){
        this.navData = [navbarData[0],navbarData[1],navbarData[2],navbarData[4]];
      }else if(user.role == 'ia'){
        this.navData = [navbarData[0],navbarData[1],navbarData[3]];
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
      if(this.screenWidth > 768 ) this.toggleCollapse();     
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
  
	logout(): void {
		this.authService.signOut();
    window.location.reload();
	}
}
