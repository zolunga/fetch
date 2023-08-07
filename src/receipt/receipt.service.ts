import { Injectable, NotFoundException } from "@nestjs/common";
import { ReceiptDto } from './receipt.dto';
import { v4 as uuidv4 } from 'uuid';
import { ReceiptInterface } from './receipt.interface';

@Injectable()
export class ReceiptService {
  constructor() {}
  receipts = {};
  create(dto: ReceiptDto) {
    const id = uuidv4();
    const receipt: ReceiptInterface = { ...dto, score: 0, id };
    receipt.score = this.calculateScore(receipt);
    this.receipts[id] = receipt;
    return { id };
  }

  findOne(id: string) {
    const data = this.receipts[id];
    if (!data) throw new NotFoundException('receipt does not exists')
    return { points: data.score };
  }

  private calculateScore(receipt: ReceiptInterface) {
    let score = 0;
    score += this.evaluateRetailer(receipt.retailer);
    score += this.totalRound(receipt.total);
    score += this.cents(receipt.total);
    score += this.pairItems(receipt.items);
    score += this.descriptionItems(receipt.items);
    score += this.oddDate(receipt.purchaseDate);
    score += this.hours(receipt.purchaseTime);
    return score;
  }
  private evaluateRetailer(retailer) {
    const alphanumeric = retailer.match(/[a-zA-Z0-9]/g) || [];
    return alphanumeric.join('').length;
    // One point for every alphanumeric character in the retailer name.
  }
  private totalRound(total) {
    if (total % 1 === 0) return 50;
    return 0;
    // 50 points if the total is a round dollar amount with no cents.
  }

  private cents(total) {
    if (total % 0.25 === 0) return 25;
    return 0;
    // 25 points if the total is a multiple of 0.25.
  }

  private pairItems(items) {
    return 5 * Math.floor(items.length / 2);
    // 5 points for every two items on the receipt.
  }

  private descriptionItems(items) {
    let score = 0;
    items.forEach((item) => {
      const len = item.shortDescription.trim().length;
      const calc = len % 3 === 0 ? Math.ceil(item.price * 0.2) : 0;
      score += calc;
    });
    return score;
    // If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
  }

  private oddDate(purchaseDate) {
    if (purchaseDate.getUTCDate() % 2 === 1) return 6;
    return 0;
    // 6 points if the day in the purchase date is odd.
  }
  private hours(purchaseTime) {
    const hours = parseInt(purchaseTime.split(':')[0]);
    if (hours >= 14 && hours < 16) return 10;
    return 0;
    // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
  }
}



/**
 * These rules collectively define how many points should be awarded to a receipt.
 *
 * One point for every alphanumeric character in the retailer name.
 * 50 points if the total is a round dollar amount with no cents.
 * 25 points if the total is a multiple of 0.25.
 * 5 points for every two items on the receipt.
 * If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
 * 6 points if the day in the purchase date is odd.
 * 10 points if the time of purchase is after 2:00pm and before 4:00pm.
 */
