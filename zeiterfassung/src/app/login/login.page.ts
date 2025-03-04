import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {IonicModule} from "@ionic/angular";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Employee} from "../api/models/employee";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginPage {

  employee = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  login() {
    this.authService.login(this.employee.value as Employee).subscribe(response => {
      if (response.authenticated) {
        this.router.navigate(['/tabs/stechen']);
      }
    });
  }

}
