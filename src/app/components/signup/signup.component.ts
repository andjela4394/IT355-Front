import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
 
  role: string = 'USER';
  errorMessage: string = '';
  formValue !: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signup(): void {
    //if (this.password !== this.confirmPassword) {
     // this.errorMessage = 'Passwords do not match.';
     // return;
    //}

    
  const { firstName, lastName, username, password } = this.formValue.value;

    this.authService.signup(firstName, lastName, username, password, this.role).subscribe(
      () => {
        console.log(firstName);
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = 'Error occurred during signup.';
      }
    );
  }

}

