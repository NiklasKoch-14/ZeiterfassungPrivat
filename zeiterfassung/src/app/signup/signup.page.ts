import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false,
})
export class SignupPage {
  user = {
    name: '',
    email: '',
    password: ''
  };

  signup() {
    console.log('Signup successful:', this.user);
    // Hier API-Anfrage zum Backend machen
  }
}
