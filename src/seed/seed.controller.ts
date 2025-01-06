import { Controller, Delete, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/usuarios/decorators/get-usuario.decorator';
import { ValidRoles } from 'src/auth/usuarios/interfaces/valid-roles.interface';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get()

  seedExcute(){
    return this.seedService.executeSeeds()
  }

  @Delete()
  @Auth( ValidRoles.admin )
  async clearAllData(): Promise<string> {
    await this.seedService.clearDatabase();
    return 'Base de datos limpiada correctamente';
  }

}
