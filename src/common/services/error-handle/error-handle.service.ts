import { BadRequestException, Injectable, InternalServerErrorException, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class ErrorHandleService {
    private readonly logger = new Logger('ErrorHandleService');

    constructor() {
    }

    public errorHandle(error: any): never {
        if (!error) {
          this.logger.error('Error desconocido sin detalles.');
          throw new BadRequestException('Se produjo un error, pero no se proporcionaron detalles.');
        }
            
        if (error.code) {
          this.logger.error(`Código de error detectado: ${error.code}`, error.stack);
    
          switch (error.code) {
            case '23505': 
              throw new BadRequestException(`Duplicidad de datos: ${error.detail}`);
            // Puedes agregar más casos según lo necesario
            default:
              throw new InternalServerErrorException(`Error desconocido: ${error.message}`);
          }
        }
            
        this.logger.error('Error inesperado', error.stack);
        throw new InternalServerErrorException('Ocurrió un error inesperado.');
      }
}