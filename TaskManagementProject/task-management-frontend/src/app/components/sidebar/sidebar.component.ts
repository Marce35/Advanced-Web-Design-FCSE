import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  isLoggedIn = false;
  userName = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.userService.userName$.subscribe((userName) => {
      this.userName = userName;
    });

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      this.isLoggedIn = true;
      this.userName = loggedInUser;
    }
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToLogout() {
    const userId = Number(localStorage.getItem('loggedInUserId'));
    this.userService.logout(userId).subscribe(
      () => {
        // Clear local storage and mark the user as logged out
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedInUserId');
        this.userService.setLoggedInState(false);
        this.router.navigate(['/login']);  // Redirect to login page after logging out
      },
      (error) => {
        console.error('Error logging out:', error);
      }
    );
  }
}
