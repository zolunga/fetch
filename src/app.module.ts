import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceiptController } from './receipt/receipt.controller';
import { ReceiptService } from './receipt/receipt.service';

@Module({
  imports: [],
  controllers: [AppController, ReceiptController],
  providers: [AppService, ReceiptService],
})
export class AppModule {}
