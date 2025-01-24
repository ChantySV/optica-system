import { Injectable } from '@nestjs/common';
import { ErrorHandleService } from 'src/common/services/error-handle/error-handle.service';
import { ProductosService } from 'src/proveedores-productos/productos/productos.service';
import { ProveedoresService } from 'src/proveedores-productos/proveedores/proveedores.service';
import { RolesService } from 'src/auth/roles/roles.service';
import { PersonalService } from 'src/personal/personal.service';
import { UsuariosService } from 'src/auth/usuarios/usuarios.service';

import { DataSource } from 'typeorm';
import { ColoresService } from 'src/mtrabajos/colores/colores.service';
import { TratamientosService } from 'src/mtrabajos/tratamientos/tratamientos.service';

import { seedPersonal } from './data/personal-data';
import { seedProductos } from './data/productos-data';
import { seedProveedores } from './data/proveedores-data';
import { seedRoles } from './data/rol-data';
import { seedUsuarios } from './data/usuario-data';
import { seedColores } from './data/color-data';
import { seedTratamientos } from './data/tratamiento-data';

@Injectable()
export class SeedService {

  constructor(    
    
    private readonly rolesService: RolesService,
    private readonly proveedoresService: ProveedoresService,
    private readonly productosService: ProductosService,
    private readonly usuariosService: UsuariosService,
    private readonly personalService: PersonalService,    
    private readonly colorService: ColoresService,    
    private readonly tramamientoService: TratamientosService,    

    private readonly dataSource: DataSource,
    private readonly errorHandleService: ErrorHandleService
  ) { }

  async clearDatabase(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {      
      await queryRunner.query('SET session_replication_role = replica');

      const entities = this.dataSource.entityMetadatas;

      for (const entity of entities) {
        const tableName = entity.tableName;
        await queryRunner.query(`TRUNCATE TABLE "${tableName}" CASCADE`);
      }
      
      await queryRunner.query('SET session_replication_role = DEFAULT');
    } finally {
      await queryRunner.release();
    }
  }

  async executeSeeds() {
    try {    
      await this.seedRoles();
      await this.seedProveedores();
      await this.seedProductos();
      await this.seedPersonal();
      await this.seedUsuarios();
      await this.seedColor()
      await this.seedTratamiento()
      
    } catch (error) {
      this.errorHandleService.errorHandle(error)
    }
  }

  private async seedRoles() {
    for (const role of seedRoles) {
      await this.rolesService.create(role);
    }
  }

  private async seedProveedores() {
    for (const proveedor of seedProveedores) {
      await this.proveedoresService.create(proveedor);
    }
  }

  private async seedProductos() {
    for (const producto of seedProductos) {      
      await this.productosService.create(producto);
    }
  }

  private async seedUsuarios() {
    for (const usuario of seedUsuarios) {
      await this.usuariosService.create(usuario);
    }
  }

  private async seedPersonal() {
    for (const personal of seedPersonal) {
      await this.personalService.create(personal);
    }
  }


  private async seedColor() {
    for (const color of seedColores) {
      await this.colorService.create(color);
    }
  }

  private async seedTratamiento() {
    for (const tratamiento of seedTratamientos) {
      await this.tramamientoService.create(tratamiento);
    }
  }

  


}

