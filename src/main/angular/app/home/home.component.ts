import { Component, OnInit } from '@angular/core';
import {Principal,LoginService} from 'sitmun-plugin-core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isHome = true;     
  constructor(public loginService:LoginService,public principal:Principal) { }

  ngOnInit() {
  }
    
  logout(){
    this.loginService.logout();
  }
    
  isLoggedIn(){
    return this.principal.isAuthenticated();
  }

}
