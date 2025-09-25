import { Body, Controller, Inject, Injectable, OnModuleInit, Post } from '@nestjs/common';
import { CallsService } from './interface/calls.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@Controller('calls')
export class CallsController implements OnModuleInit {
  private callsService: CallsService;

  constructor(@Inject('CALLS_SERVICE') private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.callsService = this.client.getService<CallsService>('CallsService');
  }


  @Post()
  @ApiOperation({ summary: "Post to microservice" })
  @ApiResponse({ status: 201, description: "test" })
  create(): Observable<any> {
    return this.callsService.MakeCall({ hello: 'Hello from API Gateway' });
  }
}
