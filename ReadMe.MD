# 🚀 API Back-end - Gerador de Quizzes Literários

Este é o servidor de **Back-end** da aplicação, desenvolvido em **Node.js** com o framework
**Express**. Ele funciona como uma camada intermediária segura (API Gateway) que gerencia as regras
de negócio, autenticação via chave de API e a comunicação com o banco de dados (Supabase) e
microsserviços de IA (n8n).

---

## 📋 Sumário

- [Tecnologias](#-tecnologias-e-recursos)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Como Rodar](#-como-rodar)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Middlewares](#-middlewares)
- [Estrutura MVC](#-estrutura-mvc)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Autores](#-autores)

---

## 🛠️ Tecnologias e Recursos

| Tecnologia    | Versão     | Descrição                              |
| ------------- | ---------- | -------------------------------------- |
| **Node.js**   | 18+        | Runtime JavaScript com ES Modules      |
| **Express**   | ^4.x       | Framework web rápido e minimalista     |
| **Prisma**    | ^5.x       | ORM moderno para banco de dados        |
| **Supabase**  | API REST   | Banco de dados PostgreSQL gerenciado   |
| **CORS**      | Habilitado | Comunicação segura com Front-end       |
| **Dotenv**    | ^16.x      | Gerenciamento de variáveis de ambiente |
| **n8n**       | Integração | Microsserviço de automação e IA        |
| **Gemini AI** | API        | Serviço de inteligência artificial     |

---

## 📂 Estrutura do Projeto

O projeto segue o padrão arquitetural **MVC** (Models, Views, Controllers) para manter o código
limpo, testável e escalável:

```text
ClubeLivro_BackEnd/
├── src/
│   ├── controllers/              # Lógica de negócio
│   │   ├── usuarioController.js
│   │   ├── livroController.js
│   │   ├── simuladosController.js
│   │   ├── personagemController.js
│   │   ├── conteudosController.js
│   │   ├── comunidadeController.js
│   │   ├── equipeController.js
│   │   ├── fotoController.js
│   │   └── sobreController.js
│   │
│   ├── models/                   # Modelagem de dados e queries
│   │   ├── UsuarioModel.js
│   │   ├── LivroModel.js
│   │   ├── SimuladosModel.js
│   │   ├── PersonagemModel.js
│   │   ├── ConteudosModel.js
│   │   ├── ComunidadeModel.js
│   │   ├── EquipeModel.js
│   │   └── SobreModel.js
│   │
│   ├── routes/                   # Definição dos endpoints
│   │   ├── usuarioRoute.js
│   │   ├── livroRoute.js
│   │   ├── simuladosRoute.js
│   │   ├── personagemRoute.js
│   │   ├── conteudosRoute.js
│   │   ├── comunidadeRoute.js
│   │   ├── equipeRoute.js
│   │   ├── fotoRoute.js
│   │   └── sobreRoute.js
│   │
│   ├── lib/
│   │   ├── helpers/              # Funções utilitárias
│   │   │   └── arquivoHelper.js
│   │   │
│   │   ├── middleware/           # Middlewares de segurança e processamento
│   │   │   ├── apiKey.js         # Validação de chave de API
│   │   │   └── fileGate.js       # Gerenciamento de uploads
│   │   │
│   │   └── services/             # Serviços externos e clientes
│   │       ├── prismaClient.js   # Cliente Prisma
│   │       ├── supabase.js       # Cliente Supabase
│   │       └── geminiSimuladosService.js  # Integração com Gemini AI
│   │
│   └── server.js                 # Ponto de entrada da aplicação
│
├── prisma/                       # Esquema e configuração do banco
│   ├── schema.prisma             # Definição das tabelas e relacionamentos
│   └── seed.js                   # Script para popular banco com dados iniciais
│
├── .env.example                  # Modelo de variáveis de ambiente
├── .gitignore                    # Arquivos ignorados pelo Git
├── package.json                  # Dependências e scripts do projeto
├── package-lock.json             # Lock file das dependências
├── prisma.config.js              # Configuração adicional do Prisma
├── support.js                    # Scripts auxiliares e utilitários
└── README.md                     # Este arquivo
```

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** v18 ou superior ([Download](https://nodejs.org/))
- **npm** v8 ou superior (geralmente vem com Node.js)
- **Git** ([Download](https://git-scm.com/))
- Uma conta no **Supabase** ([Criar conta](https://supabase.com/))
- Acesso às chaves de API da **Gemini AI**

---

## 🚀 Instalação

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/Fabiox7778/ClubeLivro_BackEnd.git
cd ClubeLivro_BackEnd
```

### 2️⃣ Instale as dependências

```cmd
npm install
```

### 3️⃣ Configure as variáveis de ambiente

Crie e edite o arquivo `.env` com suas credenciais.

---

## ⚙️ Configuração

### Variáveis de Ambiente Obrigatórias

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Servidor
PORT=3000
API_KEY='******'

# Banco de Dados (Supabase)
DATABASE_URL="postgresql://user:password@host:5432/database"
SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_KEY="sua-chave-anon-publica"
SUPABASE_SECRET_KEY="sua-chave-secreta-service-role"

# Autenticação
API_KEY="sua-chave-api-secreta"
GEMINI_API_KEY='sua-api-key'
OPENAI_API_KEY='sua-api-key'
OPENAI_MODEL='gpt-4o-mini'


# n8n (se usar)
N8N_WEBHOOK_URL="https://seu-n8n.com/webhook"

# CORS
CORS_ORIGIN="http://localhost:3000"
```

### Iniciando o Banco de Dados (Prisma)

```cmd
npx prisma migrate dev --name init
```

Para popular com dados iniciais:

```cmd
npx prisma db seed
```

---

## 🏃 Como Rodar

### Desenvolvimento (com auto-reload)

```cmd
npm run dev
```

O servidor estará disponível em: **http://localhost:3000**

### Produção

```cmd
npm start
```

### Visualizar dados no banco (Prisma Studio)

```cmd
npx prisma studio
```

---

## 🔌 Endpoints Principais

### Usuários

- `GET /api/usuarios` - Listar todos os usuários
- `POST /api/usuarios` - Criar novo usuário
- `GET /api/usuarios/:id` - Obter usuário por ID
- `PUT /api/usuarios/:id` - Atualizar usuário
- `DELETE /api/usuarios/:id` - Deletar usuário

### Livros

- `GET /api/livros` - Listar livros
- `POST /api/livros` - Criar novo livro
- `GET /api/livros/:id` - Obter livro por ID

### Simulados

- `GET /api/simulados` - Listar simulados
- `POST /api/simulados` - Criar novo simulado
- `GET /api/simulados/:id` - Obter simulado por ID

### Comunidades

- `GET /api/comunidades` - Listar comunidades
- `POST /api/comunidades` - Criar nova comunidade

### Fotos/Upload

- `POST /api/fotos/upload` - Fazer upload de imagem

**Para endpoints completos, revise os arquivos em `src/routes/`**

---

## 🔐 Variáveis de Ambiente Detalhadas

| Variável              | Obrigatória | Exemplo                 | Descrição                         |
| --------------------- | ----------- | ----------------------- | --------------------------------- |
| `PORT`                | Não         | 3000                    | Porta do servidor                 |
| `NODE_ENV`            | Sim         | development             | Ambiente (development/production) |
| `DATABASE_URL`        | Sim         | postgresql://...        | String de conexão do banco        |
| `SUPABASE_URL`        | Sim         | https://xxx.supabase.co | URL do projeto Supabase           |
| `SUPABASE_KEY`        | Sim         | eyJhbGc...              | Chave pública Supabase            |
| `SUPABASE_SECRET_KEY` | Sim         | eyJhbGc...              | Chave secreta Supabase            |
| `API_KEY`             | Sim         | sua-chave-api           | Chave para autenticação de rotas  |
| `GEMINI_API_KEY`      | Sim         | AIza...                 | Chave de API do Google Gemini     |
| `N8N_WEBHOOK_URL`     | Não         | https://xxx             | URL do webhook n8n                |
| `CORS_ORIGIN`         | Sim         | http://localhost:3000   | Origem autorizada para CORS       |

---

## 🧩 Middlewares

### apiKey.js

Valida a chave de API em rotas privadas. Use o middleware assim:

```javascript
import { apiKeyMiddleware } from '../lib/middleware/apiKey.js';

router.post('/rota-privada', apiKeyMiddleware, controlador);
```

### fileGate.js

Controla uploads de arquivos e gerencia o armazenamento em Supabase.

---

## 🏗️ Estrutura MVC

### Controllers (`src/controllers/`)

Contêm a **lógica de negócio** e fazem requisições aos models.

Exemplo: `usuarioController.js`

```javascript
export const criarUsuario = async (req, res) => {
    const usuario = await UsuarioModel.criar(req.body);
    res.json(usuario);
};
```

### Models (`src/models/`)

Contêm as **queries e operações** de banco de dados usando Prisma.

Exemplo: `UsuarioModel.js`

```javascript
export const UsuarioModel = {
    criar: (dados) => prisma.usuario.create({ data: dados }),
    listar: () => prisma.usuario.findMany(),
};
```

### Routes (`src/routes/`)

Definem os **endpoints** e associam aos controllers.

Exemplo: `usuarioRoute.js`

```javascript
router.post('/', usuarioController.criar);
router.get('/', usuarioController.listar);
```

---

## 📜 Scripts Disponíveis

| Script          | Comando                                | Descrição                        |
| --------------- | -------------------------------------- | -------------------------------- |
| Desenvolvimento | `npm run dev`                          | Inicia com nodemon (auto-reload) |
| Produção        | `npm start`                            | Inicia o servidor normalmente    |
| Migrações       | `npx prisma migrate dev --name <nome>` | Cria nova migração               |
| Seed            | `npx prisma db seed`                   | Popula banco com dados iniciais  |
| Studio          | `npx prisma studio`                    | Abre interface gráfica do banco  |
| Build           | `npm run build`                        | Compila o projeto (se aplicável) |

---

## 👥 Autores

- **Fabio Trevizolli** - Scrum Master
- **Danilo Jorje** - Product
- **Murilo Brustolin** - Desenvolvedor
- **Rebeca Alves** - Desenvolvedor
- **Yasmin Crisostomo** - Desenvolvedor
- **Luiz Felipe** - Desenvolvedor

---

**Última atualização**: Junho de 2026
