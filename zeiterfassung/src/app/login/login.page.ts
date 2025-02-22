import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
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
