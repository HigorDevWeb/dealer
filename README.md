# Busca Inteligente - Formulário Moderno

Uma aplicação de busca personalizada com design impecável, construída com **Next.js 15**, **shadcn/ui** e **Tailwind CSS**.

![Dashboard Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Admin+Panel+Dashboard)

## ✨ Características

- 🎨 **Design Impecável**: Interface moderna com gradientes, animações e micro-interações
- 📱 **Totalmente Responsivo**: Otimizado para desktop, tablet e mobile
- 🌓 **Modo Escuro/Claro**: Toggle entre temas com persistência automática
- 📝 **Formulário Inteligente**: Validação em tempo real, estados de loading e exemplos rápidos
- 🔔 **Notificações Elegantes**: Toast notifications com Sonner para feedback visual
- 🎯 **UX Refinada**: Progress bar, estados de foco e validação visual
- ⚡ **Performance**: Built com Next.js 15 e Turbopack para desenvolvimento rápido
- 🚀 **Integração n8n**: Envio direto para webhook com tratamento de erros

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de interface do usuário
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Framework de CSS utilitário
- **shadcn/ui** - Componentes de interface reutilizáveis
- **Lucide React** - Ícones modernos
- **next-themes** - Gerenciamento de temas
- **Sonner** - Toast notifications elegantes

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone <seu-repositorio>
   cd admin-panel
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute o projeto em desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse o painel**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📋 Funcionalidades do Formulário

### 🔍 Busca Personalizada
- **Campos Inteligentes**: Grupo, Marca, Cidade e Estado com validação
- **Validação em Tempo Real**: Feedback visual imediato para cada campo
- **Progress Bar**: Indicador visual de completude do formulário
- **Exemplos Rápidos**: 4 exemplos pré-configurados para teste
- **Estados de Foco**: Highlight visual nos campos ativos

### 🎨 Design e UX
- **Gradientes Modernos**: Header com gradiente colorido
- **Animações Suaves**: Transições em todos os elementos
- **Loading States**: Spinner elegante durante envio
- **Toast Notifications**: Feedback visual com ações
- **Micro-interações**: Hover effects e scale animations

### 🚀 Integração
- **Webhook n8n**: Envio direto para sistema externo
- **Tratamento de Erros**: Mensagens claras e ações de retry
- **Limpeza Automática**: Formulário reseta após sucesso
- **Validação Robusta**: Todos os campos obrigatórios

## 🎨 Componentes Principais

### SearchForm
Formulário principal com:
- Design com gradientes e sombras
- Validação visual em tempo real
- Progress bar de completude
- Exemplos rápidos clicáveis
- Toast notifications integradas
- Estados de loading avançados

### AppSidebar
Sidebar minimalista com:
- Logo e branding personalizado
- Navegação focada na busca
- Toggle de tema
- Collapse automático em mobile

### Layout Responsivo
Interface adaptativa com:
- Background gradiente sutil
- Container centralizado
- Título com gradiente de texto
- Espaçamento otimizado

## 🔧 Personalização

### Adicionando Novos Componentes shadcn/ui

```bash
npx shadcn@latest add [component-name]
```

### Modificando o Tema

Os temas estão definidos em `src/app/globals.css`. Você pode:
- Alterar as cores principais
- Ajustar o raio de bordas
- Personalizar variáveis CSS

### Adicionando Novas Páginas

1. Crie um novo arquivo em `src/app/[nome-da-pagina]/page.tsx`
2. Adicione a rota na sidebar em `src/components/AppSidebar.tsx`

## 📱 Responsividade

O dashboard foi construído com mobile-first design:
- **Mobile**: Sidebar como drawer
- **Tablet**: Layout adaptado com grid responsivo
- **Desktop**: Sidebar fixa com layout completo

## 🎯 Próximos Passos

- [ ] Dashboard de resultados da busca
- [ ] Histórico de buscas realizadas
- [ ] Filtros avançados e salvos
- [ ] Exportação de resultados
- [ ] Analytics das buscas
- [ ] API de integração
- [ ] Autenticação de usuários
- [ ] Busca por voz

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades  
- Enviar pull requests
- Melhorar a documentação

---

**Desenvolvido com ❤️ usando Next.js, shadcn/ui e Sonner**
