# 🔵 Agora Vai

Aplicação **Full Stack (SPA)** desenvolvida como projeto pessoal durante o Bootcamp **Accenture – Java & Cloud (DIO)**.

O **Agora Vai** é uma aplicação voltada para **produtividade, bem-estar e qualidade de vida no ambiente de trabalho**, com foco em profissionais de tecnologia e pessoas que passam longos períodos sentadas.

---

## 🚀 Objetivo do Projeto

O projeto tem como objetivo unir:

- Desenvolvimento backend com Java + Spring Boot
- Interface moderna e responsiva com React
- Boas práticas de QA (Qualidade de Software)
- Experiência de usuário (UX)
- Automação de testes

Além disso, representa a integração entre **backend, frontend e qualidade de software em um produto funcional real**.

---

## 🔵 Funcionalidades

-  Temporizadores para pausas, hidratação e alongamentos  
-  Organização de exercícios por grupos corporais  
-  Cronômetro visual com feedback sonoro  
-  Integração com vídeos do YouTube (guias de alongamento e hidratação)  
-  Integração com Spotify  
-  Uso de IA generativa (Gemini) para interação e suporte  
-  Interface SPA com navegação fluida  
-  Layout responsivo (desktop, tablet e mobile)

---

## 🔵 Visão de Qualidade (QA)

O projeto foi desenvolvido com foco em qualidade desde o início:

- Fluxos de usuário previsíveis e consistentes  
- Validação de UX e estabilidade da interface  
- Testes manuais contínuos durante o desenvolvimento  
- Testes automatizados no backend  
- Uso de MockMvc para validação de endpoints REST  
- JUnit 5 para testes unitários  

---

## 🔵 Stack Tecnológica

### Backend
- Java 21
- Spring Boot 3
- Maven
- JUnit 5
- MockMvc

### Frontend
- React
- JSX
- Vite
- CSS3

### Arquitetura
- SPA (Single Page Application)
- API REST

### DevOps / Deploy
- Git & GitHub
- Vercel (deploy frontend)

### Integrações
- YouTube API (conteúdo de exercícios)
- Spotify
- Gemini (IA generativa)

---

## 🔵 Endpoint Principal

### Status da aplicação

```http
GET /api/status/{nome}

Exemplo:

GET /api/status/Roberto

Resposta esperada:

{
  "message": "Olá Roberto, Agora Vai está funcionando!"
}
▶️ Como Executar o Projeto
Backend (Spring Boot)
./mvnw spring-boot:run

Acesse:

http://localhost:8080
Testes Automatizados
./mvnw test
Frontend (React)
npm install
npm run dev
🔵 Estrutura do Projeto
agora-vai/
│
├── backend/
│   ├── src/main/java
│   ├── src/test/java
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
📌 Deploy
Frontend: Vercel
https://agora-vai-frontend.vercel.app/

GitHub:
https://github.com/robertocyanes/agora-vai.git

🔵 Sobre o Projeto

Este projeto representa minha evolução como:

Desenvolvedor Backend Java
Profissional de QA (Qualidade de Software)
Entusiasta de experiência do usuário

Foi construído como um projeto real de portfólio, integrando desenvolvimento, testes e produto.

🔵 Status

✔ Finalizado (MVP funcional)
🔄 Aplicação em melhoria contínua
