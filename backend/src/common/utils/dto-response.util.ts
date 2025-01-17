export function mapToDto<T>(entity: T, fields: (keyof T)[]): Partial<T> {
    const dto: Partial<T> = {};
    
    fields.forEach(field => {
      dto[field] = entity[field];
    });
  
    return dto;
  }
  