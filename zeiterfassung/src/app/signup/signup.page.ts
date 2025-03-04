import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {IonicModule} from "@ionic/angular";
import {EmailValidator, FormsModule} from "@angular/forms";
import {Employee} from "../api/models/employee";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    NgIf
  ]
})
export class SignupPage {

  message: string | undefined;
  employee: Employee;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    this.employee = this.initEmployee();
  }

  signup() {
    console.log('Signup start:', this.employee);
    this.authService.signup(this.employee).subscribe((response: any) => {
      response != null ? this.handelSignUpSuccess(response) : this.handelSignUpFailed();
    })
  }

  handelSignUpSuccess(employee: Employee | any) {
    console.log(employee);
    this.message = "Benutzer mit Email:" + employee.username + " erstellt";
    this.router.navigate(['/tabs/stechen']).then(r => console.log(r), f => console.log(f));
  }
  handelSignUpFailed(){
    this.message = "Benutzer konnte nicht erstellt werden";
    this.employee = this.initEmployee()
    this.router.navigate(['/signup']).then(r => console.log(r), f => console.log(f));
  }

  initEmployee(): Employee {
    return {
      email: '',
      password: ''
    };
  }

}
