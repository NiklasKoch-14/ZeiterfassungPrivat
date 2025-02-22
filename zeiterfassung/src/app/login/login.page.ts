import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  user = {
    email: '',
    password: ''
  };

  login() {
    console.log('Login erfolgreich:', this.user);
    // Hier API-Anfrage zum Backen
  }
}
