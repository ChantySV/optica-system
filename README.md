# Instalación y despliegue del Sistema

## Requisitos previos

- Node.js v18.x o superior
- Docker y Docker Compose
- PostgreSQL (opcional si prefieres no usar Docker)


# OpticaSystem API

1. Clonar el repositorio:
 ```bash 
    git clone https://github.com/ChantySV/optica-system.git 
    cd  optica-system
```

2. Instalar los packages del backend:
```bash
  cd backend
  npm install
```
3. Clonar el archivo ```.env.template``` 
```Bash
cp .env-template .env
```

4. (Opcional) Modificar los campos en el  archivo ```.env```

5. Instalar los packages del frontend:
```bash
  cd frontend
  npm install
```

6. Levantar la base de datos con docker:
``` bash 
docker-compose up -d
```

7. URL para ejecutar los seed en la base de datos con curl:

``` bash
curl http://localhost:4000/api/seed
```

7. Iniciar el sistema: 
- Backend
  ```bash
    cd ..
    cd backend
    npm run start:dev
  ```
- Fronted
  ```bash
    cd ..
    cd frontend
    npm run dev
  ```