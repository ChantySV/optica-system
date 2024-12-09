import { Controller, Delete, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get()

  seedExcute(){
    return this.seedService.executeSeeds()
  }

  @Delete()
  async clearAllData(): Promise<string> {
    await this.seedService.clearDatabase();
    return 'Base de datos limpiada correctamente';
  }

}
