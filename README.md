# 🏙️ Zela — Plataforma de Denúncias Urbanas

O **Zela** é um sistema desenvolvido para facilitar o registro, a localização e o acompanhamento de problemas urbanos encontrados pela população.

A proposta é permitir que cidadãos possam registrar ocorrências, informar sua localização e acompanhar o andamento das solicitações, enquanto os responsáveis podem organizar e atualizar o status das denúncias.

O projeto foi desenvolvido como parte dos estudos em **Engenharia de Software**, envolvendo conceitos de desenvolvimento de sistemas, modelagem, banco de dados, requisitos e **Análise de Pontos de Função (APF)**.

---

## 🎯 Objetivo

O principal objetivo do Zela é aproximar a população da gestão dos problemas urbanos, proporcionando uma maneira simples e organizada de registrar ocorrências.

Entre os problemas que podem ser registrados estão:

* 🕳️ Buracos nas vias
* 💡 Problemas de iluminação pública
* 🗑️ Acúmulo de lixo
* 🚧 Problemas de infraestrutura
* 🌳 Problemas relacionados a áreas públicas
* 📍 Outras ocorrências urbanas

---

## 🚀 Funcionalidades

### 👤 Usuários

* Cadastro de usuários
* Login no sistema
* Gerenciamento de informações do usuário

### 📢 Denúncias

* Cadastro de denúncias
* Descrição do problema
* Seleção da categoria
* Registro da localização
* Consulta das denúncias

### 🗺️ Localização

* Identificação do local da ocorrência
* Visualização das denúncias por localização
* Consulta de problemas registrados no mapa

### 🔄 Acompanhamento

As denúncias podem possuir diferentes estados, permitindo acompanhar sua evolução.

Exemplo:

```text
Pendente
   ↓
Em análise
   ↓
Em andamento
   ↓
Resolvida
```

---

## 🧩 Estrutura do Sistema

O sistema trabalha com diferentes informações relacionadas às denúncias e aos usuários.

Principais entidades:

```text
Usuário
   │
   └── Denúncias
          │
          ├── Categoria
          ├── Localização
          └── Histórico de Status
```

---

## 📊 Análise de Pontos de Função

Para estimar o tamanho funcional do sistema, foi utilizada a **Análise de Pontos de Função (APF)**.

A estimativa considera as funcionalidades disponibilizadas pelo sistema e os dados manipulados pela aplicação.

### Funções identificadas

| Funcionalidade                | Tipo             | Pontos de Função |
| ----------------------------- | ---------------- | ---------------: |
| Cadastro de usuário           | Entrada Externa  |                4 |
| Registro de denúncia          | Entrada Externa  |                4 |
| Consulta de denúncias no mapa | Consulta Externa |                4 |
| Atualização de status         | Entrada Externa  |                4 |
| Usuário                       | Arquivo de Dados |                7 |
| Denúncia                      | Arquivo de Dados |                7 |
| Categoria                     | Arquivo de Dados |                7 |
| Localização                   | Arquivo de Dados |                7 |
| Histórico de status           | Arquivo de Dados |                7 |

**Total de Pontos de Função Não Ajustados:** 51 PF

**Fator de Ajuste:** 0,89

**Total de Pontos de Função Ajustados:** 45,39 PF

Considerando o valor utilizado na estimativa de **R$ 488,00 por Ponto de Função**, o custo estimado do projeto é de aproximadamente:

### 💰 R$ 22.150,00

> A estimativa representa um cálculo acadêmico baseado nos parâmetros definidos para o projeto e não necessariamente corresponde ao custo real de desenvolvimento em produção.

---

## 🛠️ Tecnologias

As tecnologias utilizadas no projeto podem incluir:

* Java
* Spring Boot
* Spring Data JPA
* REST API
* Banco de Dados SQL
* HTML
* CSS
* JavaScript
* Git
* GitHub

---

## 📚 Conceitos Aplicados

Durante o desenvolvimento do projeto foram trabalhados conceitos de:

* Engenharia de Software
* Levantamento de requisitos
* Análise e modelagem de sistemas
* UML
* Banco de dados
* APIs REST
* CRUD
* Arquitetura de software
* Controle de usuários
* Gerenciamento de denúncias
* Análise de Pontos de Função
* Metodologias ágeis

---

## 📈 Possíveis melhorias

O projeto pode ser expandido futuramente com:

* [ ] Aplicativo mobile
* [ ] Sistema de notificações
* [ ] Integração com mapas
* [ ] Upload de imagens nas denúncias
* [ ] Geolocalização automática
* [ ] Dashboard administrativo
* [ ] Sistema de relatórios
* [ ] Filtros avançados de denúncias
* [ ] Histórico completo das ocorrências
* [ ] Sistema de avaliações
* [ ] Integração com órgãos públicos

---

## 👨‍💻 Autor

**Gabriel Coelho**

Estudante de Engenharia de Software e desenvolvedor em formação, com foco em desenvolvimento **Java, Spring Boot, Node.js e APIs REST**.

### 🔗 Contato

* GitHub: GabrielDSilva-bit
* LinkedIn: Gabriel da Silva Coelho

---

## 📄 Status do Projeto

🚧 **Em desenvolvimento**

O Zela é um projeto acadêmico e de portfólio que está sendo desenvolvido e aprimorado continuamente.

---

## 📌 Licença

Este projeto foi desenvolvido para fins acadêmicos e de aprendizado.
