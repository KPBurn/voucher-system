import { NgModule } from '@angular/core';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [NgxQRCodeModule],
  exports: [NgxQRCodeModule]
})
export class QRCodeWrapperModule {}
