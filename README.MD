# API-Refund

A **API Refund** é uma aplicação desenvolvida para gerenciar solicitações de remmbolsos, permitindo que usuários se registrem, criem solicitações para vários tipos de casos, podendo enviar imagens nas suas solicitações além visualizar suas solicitações.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção de aplicações web.
- **PostgreSQL**: Banco de dados SQL para armazenamento de dados.
- **JWT (JSON Web Tokens)**: Sistema de autenticação para garantir a segurança das rotas.
- **Prisma**: ORM para realizar registros no banco de dados.
- **Multer**: Biblioteca usada para upload de arquivos

## Instalação

### Pré-requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado em sua máquina. Você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/).
- **Docker**: Tenha o Docker instalado e em funcionamento. Mais informações em [https://www.docker.com/](https://www.docker.com/).

### Passos para Instalação

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/SamuelColaco/API-Daily-Diet.git

2. **Ir para o Diretório**
    ```bash
    cd API-Refund
3. **Instalar as Dependências**
    ```bash
    npm install
4. **Crie um arquivo .env na raiz do projeto**
    E coloque nele essas variavéis de ambiente

    DATABASE_URL="escreva a url do banco de dados aqui (postgresql://user:password@db:5432/refund)"
    AUTH_SECRET="Escreva seu secret aqui"
5. **Rode o Servidor**
    ```bash
    npm run dev
    'O servidor estará disponivél em http://localhost:3333'

## Docker

- **Comando para rodar o docker-compose**
    ```docker
    docker-compose up -d
- **Comando para verificar o container rodando**
    ```docker
    docker ps ou docker-compose ps
- **Comando para parar o container**
    ```docker
    docker-compose down

## EndPoints

### POST
    URL: /session
    Propósito: Cria um token JWT
    Body: {
        "email":"email do usuário",
        "password":"senha do usuário"
    }
    Message: {
	"token": "Token JWT aparece_aqui"
    }
    StatusCode: 201(Created)

    URL: /users
    Propósito: Cria um novo usuário
    Body: {
	"name": "nome",
	"email": "email",
	"password": "senha".
    "role": "employee" ou "manager"(Caso não seja atribuido um cargo irá ser "employee" de padrão)
    }
    Message: {
        "Usuário cadastrado"
    }
    StatusCode: 201(Created)

    URL: /refund
    Propósito: Cadastra um reembolso
    Body: {
        "name": "nome do reembolso",
        "amount": "quantidade do reembolso",
        "category": "Categoria do reembolso, enum contendo: "accommodation","food", "others", "services","transport",
        "filename": "nome do arquivo de imagem",
    }
    Header: 
        Authorization: Bearer seu_token_aqui
    Message: {
        "Solicitação feita"
    }
    StatusCode: 201(Created)

### GET
    URL: /users
    Propósito: Lista todos os usuários
    Body: Não prescisa passar nada
    Header: 
        Authorization: Bearer seu_token_aqui
    Reposta: [
	{
		"id": "Id do usuário em formato UUID",
		"name": "Nome",
		"email": "email",
		"password_hash": "Senha em formato HASH: $2b$08$aRjpep6EFNnHSBVctXG09.ALi0Y87hlC52Eb5aURXTVhNCB9ugw46",
		"role": "Cargo do usuário. (Caso não seja atribuido um o cargo aparecerá como "employee")",
		"createdAt": " Data da criação do usuário: 2025-03-06T11:45:53.476Z",
		"updatedAt": "Data da ultima vez que ele foi atualizado: 2025-03-06T12:09:56.320Z"
	},
    ]
    StatusCode: 200(Ok)

     URL: /refund
     Propósito: Lista todas as refeições
    Body: Não prescisa passar nada
    Header: 
        Authorization: Bearer seu_token_aqui
    Reposta: [
	{
		"id": "Id do reembolso em formato UUID",
		"name": "Nome",
        "amount": "Quantidade do reembolso",
        "Category": "Categoria do reembolso",
        "filename": "Nome do arquivo",
        "userId": Id do usuário que fez a solicitação,
		"createdAt": " Data da criação do usuário: 2025-03-06T11:45:53.476Z",
		"updatedAt": "Data da ultima vez que ele foi atualizado: 2025-03-06T12:09:56.320Z"
	},
    ]
    StatusCode: 200(Ok)


        URL: /refund/:id
        Propósito: Lista os reembolsos de determinado usuário
    Body: Não prescisa passar nada
    Header: 
        Authorization: Bearer seu_token_aqui
    Reposta:{
        "refunds": [
            {
                "id": "Id do reembolso  em  formato UUID",
                "userId": "Id do usuário que cadastrou o reembolso",
                "name": "Nome do reembolso",
                "amount": "Quantidade do reembolso",
                "Category": "Categoria do reembolso",
                "filename": "Nome do arquivo",
                "createdAt": " Data da criação do usuário: 2025-03-06T11:45:53.476Z",
		        "updatedAt": "Data da ultima vez que ele foi atualizado: 2025-03-06T12:09:56.320Z"
            }
        ]      
        }
    StatusCode: 200(Ok)


    URL: /uploads/nomeDoArquivoDeImagem
    Propósito: Visualização da foto passada
    Body: Não prescisa passar nada
    Header: 
        Authorization: Bearer seu_token_aqui
    Reposta: {
       Foto do arquivo passado
    }
    StatusCode: 200(Ok)


### PUT

    URL: /users/:id
    Prpósito: Atualiza um usuário
    Body: {
        Passa o quer atualizar do usuário, por exemplo: {
	        "password": "nova senha"
        }
    }
    Message: {
        "Usuário atualizado com sucesso"
    }
    StatusCode: 200(Ok)

    URL: /refund/:id
    Propósito: Atualiza um reembolso
    Body: {
        Passa o quer atualizar do reembolso, por exemplo: {
	        "name": "novo nome do reembolso"
        }
    }
    Message: {
        "Update feito com sucesso"
    }
    StatusCode: 200(Ok)

    
### Delete

    URL: /user/:id
    Prpósito: Deleta um usuário
    Body: Não passa nada
    Message: {
        "Deletado com sucesso"
    }
    StatusCode: 200(Ok)

    URL: /refund/:id
    Propósito: Deleta um reembolso
    Body:  Não passa nada
    Message: {
        "Deletado com sucesso"
    }
    StatusCode: 200(Ok)



## Testes

- **Para executar os testes**
    ```bash
    npm run test
