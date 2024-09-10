# Projeto Comigo Tech

Este projeto é uma aplicação web composta por um backend em Node.js e um frontend em React. O backend utiliza Prisma para ORM e PostgreSQL como banco de dados. O frontend é construído com Vite e React.


## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- Prisma
- PostgreSQL
- JWT para autenticação
- Winston para logging
- Prometheus para monitoramento

### Frontend
- React
- Vite
- Tailwind CSS

## Configuração do Ambiente

### Backend

1. **Clone o repositório**:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio/backend

2. **Execute o projeto com o container docker**
   ```bash
   docker-compose up --build
    ```

### Front-End

1. Instale as dependencias 
   
   ```node
    npm install  
    ```

2. Crie um arquivo .env com o endereço local do container docker com a API 
   
   ```env
    VITE_API_URL = "http://localhost:3000"
    ```

3. Execute o projeto com npm
   
   ```shell
    npm run dev
    ```