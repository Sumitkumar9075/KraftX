import { Component, OnInit, NgZone } from '@angular/core';
import axios from 'axios';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  name: string = '';  // To store the extracted name
  imageUrl: string = '';  // To store the extracted image URL
  apiUrl: string = 'https://kraftercrud.azurewebsites.net/crud/documents';

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    // Wait for the DOM to be ready, then send a message to content.js
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { action: 'getName' }, (response) => {
        // Run change detection in Angular's zone
        this.ngZone.run(() => {
          this.name = response?.name || '';
          this.imageUrl = response?.imageUrl || '';
        });
        console.log('Extracted Name:', this.name);
        console.log('Extracted Image URL:', this.imageUrl);
      });
    });
  }

  async sendData(): Promise<void> {
    if (this.name) {
      const requestBody = {
        account: this.name,
        additional_user_input: '',
        leads_input: '',
        name: `Account Plan - ${this.name}`,
        type: 'account_plan',
        vendor: ''
      };

      try {
        const response = await axios.post(this.apiUrl, requestBody);
        console.log('Data sent successfully:', response.data);
        alert("Data sent ");
      } catch (error) {
        alert("bhai vo access key yrr");
        console.error('bhai vo access key yrr ', error);
      }
    } else {
      console.warn('Name is empty, cannot send data');
    }
  }
}
