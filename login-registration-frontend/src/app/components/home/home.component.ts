import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getHome().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        if (err.status === 401) {
          this.cookieService.delete('token');
          this.router.navigate(['/']);
          this._snackBar.open(
            'you have logged in from another browser so you are logged out from here',
            'Close',
            {
              duration: 10000,
              panelClass: ['pink-snackbar'],
            }
          );
        }
      }
    );
  }
  onLogout() {
    this.cookieService.delete('token');
    this.router.navigate(['/']);
    this._snackBar.open('Logout Successfully', 'Close', {
      duration: 5000,
      panelClass: ['pink-snackbar'],
    });
  }
}
