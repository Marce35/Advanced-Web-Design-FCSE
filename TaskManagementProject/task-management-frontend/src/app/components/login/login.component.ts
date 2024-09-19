import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.login(this.username, this.password).subscribe(
      (response) => {
        localStorage.setItem('loggedInUser', response.username);
        localStorage.setItem('loggedInUserId', response.id.toString());

        this.userService.setLoggedInState(true, response.username);
        this.router.navigate(['/projects']);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
