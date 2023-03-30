import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ais-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  private fragment:string;

  constructor(private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if(fragment){
        document.querySelector('#' + fragment).scrollIntoView();
      }
    });      
  }
}
