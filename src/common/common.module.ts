import { Global, Module } from '@nestjs/common';
import { ErrorHandleService } from './services/error-handle/error-handle.service';

@Global()
@Module({
  providers: [ErrorHandleService],
  exports:[ErrorHandleService]
})
export class CommonModule {}
