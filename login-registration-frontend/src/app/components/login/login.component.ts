import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    if (this.cookieService.check('token')) {
      this.router.navigate(['/home']);
    }
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.loginuser(form.value).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.cookieService.set('token', res.token);
        this.router.navigate(['/home']);
        this._snackBar.open('Login Successfully!', 'Close', {
          duration: 5000,
          panelClass: ['pink-snackbar'],
        });
      },
      (error) => {
        this.isLoading = false;
        this._snackBar.open('Username or Password is wrong ', 'Close', {
          duration: 5000,
          panelClass: ['pink-snackbar'],
        });
      }
    );
  }
}
