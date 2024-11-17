import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { LinkComponent } from './link/link.component';
import { CommonModule } from '@angular/common'; // Import CommonModule
/// <reference types="chrome"/>
import axios from 'axios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule , LinkComponent , CommonModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoggedIn: boolean = false; // State to switch between components

  async onSubmit() {
    try {
      const response = await axios.post('https://kraftercrud.azurewebsites.net/auth/login', {
        email: this.email,
        password: this.password,
        remember: this.rememberMe
      }, { withCredentials: true });

      if (response.status === 200) {
        console.log('Login successful');
        localStorage.setItem('isLoggedIn', 'true');

        const documentsResponse = await axios.get('https://kraftercrud.azurewebsites.net/crud/documents');
        console.log(documentsResponse);
        console.log(document.cookie);

      

        // Set the state to show the new component
        this.isLoggedIn = true;
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error('Login failed: Invalid credentials');
        } else {
          console.error('Login failed: ', error.response.data);
        }
      } else if (error.request) {
        console.error('Login failed: No response from server');
      } else {
        console.error('Login failed: ', error.message);
      }
    }
  }
}
