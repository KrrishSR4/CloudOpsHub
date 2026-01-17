import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return {
      status: 'ok',
      message: 'CloudOpsHub API is running',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health')
  health() {
    return {
      status: 'ok',
      service: 'CloudOpsHub Backend',
      version: '1.0.0',
    };
  }
}
