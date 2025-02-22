import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
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
