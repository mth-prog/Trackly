# 🎯 Trackly

<div align="center">
  <img src="https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white" alt="Electron" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
</div>

<p align="center">
  <strong>Sistema completo para gerenciamento e acompanhamento de hábitos</strong>
</p>

<p align="center">
  Uma aplicação desktop moderna que ajuda você a criar, acompanhar e visualizar seus hábitos diários com um mapa de calor inspirado no GitHub.
</p>

## ✨ Funcionalidades

### 🏗️ **Gerenciamento de Hábitos**
- ➕ Criar novos hábitos com nome e descrição
- 📝 Listar todos os hábitos cadastrados
- 🔍 Buscar hábitos específicos
- ✏️ Atualizar informações dos hábitos
- 🗑️ Exclusão segura (soft delete)

### 📅 **Controle Diário**
- 📆 Selecionar data específica para registro
- ✅ Marcar hábitos como concluídos
- 🚫 Prevenção contra registros duplicados no mesmo dia
- 💾 Persistência automática dos dados

### 📊 **Visualização e Estatísticas**
- 🔥 **Mapa de calor** estilo GitHub para visualizar consistência
- 📈 Histórico completo por ano
- 🎯 Indicadores visuais de progresso
- 📱 Interface responsiva e intuitiva

## 🛠️ Stack Tecnológica

### Frontend
- **[Electron](https://electronjs.org/)** - Framework para aplicações desktop
- **[React 19](https://react.dev/)** - Biblioteca para interfaces
- **[TypeScript](https://typescriptlang.org/)** - Linguagem tipada
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de estilos
- **[React Router DOM](https://reactrouter.com/)** - Roteamento

### Backend & Dados
- **[Better SQLite3](https://github.com/WiseLibs/better-sqlite3)** - Banco de dados local
- **[Electron IPC](https://www.electronjs.org/docs/api/ipc-main)** - Comunicação entre processos

### UI Components
- **[Radix UI](https://radix-ui.com/)** - Componentes primitivos
- **[Phosphor Icons](https://phosphoricons.com/)** - Ícones modernos
- **JetBrains Mono** - Fonte tipográfica

### Ferramentas
- **[Electron Vite](https://electron-vite.org/)** - Build tool otimizada
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - Code quality
- **[Electron Builder](https://www.electron.build/)** - Empacotamento
- **GitHub Actions** - CI/CD automatizado

## 🚀 Instalação e Uso

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v18+)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/trackly.git
cd trackly

# Instale as dependências
npm install
```

### Desenvolvimento
```bash
# Inicia o modo de desenvolvimento com hot-reload
npm run dev
```

### Build para Produção
```bash
# Build geral
npm run build

# Build específico por plataforma
npm run build:win     # Windows
npm run build:mac     # macOS
npm run build:linux   # Linux
```

### Outras opções
```bash
# Linting e formatação
npm run lint
npm run format

# Preview da aplicação
npm run start

# Build sem empacotamento
npm run build:unpack
```

## 📁 Estrutura do Projeto

```
trackly/
├── src/
│   ├── main/                 # Processo principal do Electron
│   │   ├── database/         # Configuração e schemas do SQLite
│   │   ├── ipc/              # Handlers IPC
│   │   └── index.ts          # Entry point principal
│   ├── preload/              # Scripts de preload
│   │   └── index.ts          # APIs expostas ao renderer
│   └── renderer/             # Interface React
│       └── src/
│           ├── components/   # Componentes reutilizáveis
│           ├── pages/        # Páginas da aplicação
│           ├── styles/       # Estilos globais
│           └── utils/        # Utilitários
├── build/                    # Assets de build
├── .github/workflows/        # GitHub Actions
└── out/                      # Aplicação compilada
```

## 🗄️ Estrutura do Banco de Dados

### Tabela `habito`
- `id` - Chave primária
- `nome` - Nome do hábito (obrigatório)
- `descricao` - Descrição opcional
- `is_deleted` - Flag para exclusão lógica

### Tabela `diario`
- `id` - Chave primária
- `data` - Data no formato dd/mm/aaaa
- `id_habito` - Referência ao hábito
- `is_feito` - Status de conclusão

## 🔄 Fluxo de Funcionamento

1. **Criação**: Usuário cria hábitos na página de cadastro
2. **Seleção**: No dashboard, seleciona data e hábitos a serem feitos
3. **Registro**: Sistema salva no banco evitando duplicatas
4. **Visualização**: Mapa de calor mostra progresso ao longo do tempo
5. **Análise**: Usuário pode filtrar por ano e acompanhar consistência

## 🚀 Deploy e Distribuição

### GitHub Actions
O projeto inclui workflow automatizado para:
- ✅ Build automático em macOS e Windows
- 📦 Geração de executáveis
- 🚀 Release automático com tags

### Plataformas Suportadas
- 🪟 **Windows** - .exe com instalador NSIS
- 🍎 **macOS** - .dmg com assinatura
- 🐧 **Linux** - AppImage, Snap, DEB

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  <p>Feito com ❤️ para ajudar você a construir hábitos consistentes</p>
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
</div>