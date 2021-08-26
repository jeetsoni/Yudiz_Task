import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  // isContactInvalid = false;
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

  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    if (
      form.value.contact.toString().length > 10 ||
      form.value.contact.toString().length < 10
    ) {
      // this.isContactInvalid = true;
      this._snackBar.open(
        'contact should be number and only 10 digit',
        'Close',
        {
          duration: 5000,
          panelClass: ['pink-snackbar'],
        }
      );
      return;
    }
    this.isLoading = true;
    this.userService.registerUser(form.value).subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigate(['/']);
        this._snackBar.open('you are register successfully!', 'Close', {
          duration: 5000,
          panelClass: ['pink-snackbar'],
        });
      },
      (error) => {
        this.isLoading = false;
        if (error.error.keyValue) {
          this.router.navigate(['/']);
          this._snackBar.open('You are already registered!', 'Close', {
            duration: 5000,
            panelClass: ['pink-snackbar'],
          });
        }
      }
    );
  }
}
