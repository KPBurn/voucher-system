import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,    // Import FormsModule here
    QRCodeModule    // Import QRCodeModule for QR code generation
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
