# 🏙️ ZELA - Zeladoria Urbana Mobile

O **ZELA** é um aplicativo mobile desenvolvido com React Native e Expo, projetado para permitir que cidadãos relatem problemas urbanos (como buracos na via, iluminação pública deficiente e lixo irregular) de forma simples, rápida e acessível.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [React Native](https://reactnative.dev/)
- **Plataforma & Execução:** [Expo](https://expo.dev/) (SDK 51+)
- **Roteamento:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Linguagem:** JavaScript (ES6+)
- **Ícones & Vetores:** `@expo/vector-icons` e `react-native-svg`
- **Animações:** `Animated` API (Native Driver)

---

## 🏗️ Arquitetura do Projeto (MVC)

O projeto adota o padrão de arquitetura **MVC (Model-View-Controller)**:

```text
src/
├── app/              # VIEW / CONTROLLER: Telas e gerenciamento de rotas
│   ├── _layout.jsx   # Configuração do Stack Navigation
│   ├── index.jsx     # Tela de Boas-Vindas (Welcome)
│   ├── login.jsx     # Tela de Autenticação
│   └── cadastro.jsx  # Tela de Registro de Usuário
└── components/       # VIEW: Componentes reutilizáveis (Ilustrações SVG, etc.)
```

---

## 🚀 Como Instalar e Rodar Localmente

Siga os passos abaixo para executar o aplicativo em ambiente de desenvolvimento local.

### 📋 Pré-requisitos

- Node.js instalado na máquina (versão 18 LTS ou superior).
- Aplicativo Expo Go instalado no seu celular (disponível na Google Play Store ou App Store).
- O computador e o celular devem estar conectados à mesma rede Wi-Fi.

### 📥 Passo a Passo

**1. Clonar o repositório:**

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
```

**2. Acessar a pasta do projeto:**

```bash
cd SEU-REPOSITORIO
```

**3. Instalar as dependências do projeto:**

```bash
npm install
```

**4. Iniciar o servidor do Expo:**

```bash
npx expo start
```

**5. Executar no Celular (Expo Go):**

- Abra o app Expo Go no seu dispositivo móvel.
- Escaneie o QR Code exibido no terminal (no Android, use o scanner do Expo Go; no iOS, use a Câmera nativa).

> 💡 **Dica de Solução de Problemas:** Se houver erros de cache ou alteração brusca de componentes, inicie o servidor limpando o cache com:
> ```bash
> npx expo start -c
> ```
