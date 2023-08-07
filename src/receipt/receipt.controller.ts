import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReceiptDto } from './receipt.dto';
import { ReceiptService } from './receipt.service';

@Controller('receipts')
export class ReceiptController {
  constructor(private receiptService: ReceiptService) {}

  @Post('process')
  async create(@Body() dto: ReceiptDto) {
    return this.receiptService.create(dto);
  }
  @Get(':id/points')
  async findOne(@Param('id') id: string) {
    return this.receiptService.findOne(id);
  }
}


