import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return `date of last deployment ${new Date(24 * 3600 * 1000)}`;
  }
}
