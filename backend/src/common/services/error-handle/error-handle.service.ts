import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ErrorHandleService {
  private readonly logger = new Logger('ErrorHandleService');
  constructor(){

  }
  public errorHandle(error: any){
      if(error.code === '23505')
          throw new BadRequestException(error.detail);
      this.logger.error(error);      
  }
}