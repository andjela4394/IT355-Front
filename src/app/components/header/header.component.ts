import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  

  constructor(private authService:AuthService){
  }

  isAdmin!:boolean;
  isLoggedIn!:boolean;
  username!:string;

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isAuthenticated();
    this.username = this.authService.getCurrentUsername();
  }

  public logout(){
    this.authService.logout();
  }
}
