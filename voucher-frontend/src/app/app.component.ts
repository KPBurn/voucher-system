import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',  // Move HTML to a separate file
  styleUrls: ['./app.component.css']    // Optional: use a CSS file for styling
})
export class AppComponent {
  title = 'Voucher Frontend';
  facebookPageId: string = '';          // Variable to store user input
  messengerLink: string | null = null;  // Variable to store the generated link

  generateMessengerLink(): void {
    const facebookPageId = this.facebookPageId;
    const refParameter = 'qr_entry';  // You can use any identifier here
    this.messengerLink = `https://m.me/${facebookPageId}?ref=${refParameter}`;
  
  
  }
}
