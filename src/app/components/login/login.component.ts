import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(username:string, password: string): void {
    const isAuthenticated = this.authService.login(username, password).subscribe(
      () => {
        this.router.navigate(['/products']);
      },
      (error) => {
        this.errorMessage = 'Invalid username or password.';
      }
    );
  }
}
