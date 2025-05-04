# 🐆 FURIA Chatbot

Um chatbot interativo desenvolvido para melhorar a experiência dos fãs do time de CS da FURIA, fornecendo respostas inteligentes e contextualizadas sobre o time, jogadores e partidas. A solução combina inteligência artificial com uma interface web moderna.

## 🚀 Tecnologias Utilizadas

### Front-end
- **Next.js (React)** – Framework para criação da interface web.
- **Tailwind CSS** – Estilização rápida e responsiva.
- **Vercel** – Deploy da aplicação front-end.

### Back-end
- **Python (Flask)** – API para integração com modelos de linguagem.
- **OpenAI API (GPT-3.5 Turbo / GPT-4.0/4.1)** – Geração das respostas do chatbot.
- **Render** – Hospedagem do back-end.

### Outros
- **Environment Variables** – Utilizadas para armazenar chaves de API de forma segura (`NEXT_PUBLIC_BACKEND_URL`, `OPENAI_API_KEY`, etc).
- **Axios** – Requisições HTTP do front-end para o back-end.

---

## 💡 Funcionalidade

O chatbot responde perguntas sobre o time da FURIA de forma contextualizada, usando um modelo da OpenAI. Os dados e a personalidade do bot podem ser ajustados no back-end via prompt.

---

## ⚙️ Como rodar localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/furia-chatbot.git
cd furia-chatbot
```

### 2. Configurar o ambiente

Substitua algumas linhas de código para o programa funcionar em ambiente local

- Em **page.tsx** (linha 47)

```javascript
//Troque
const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {

//Por
const response = await fetch("http://localhost:8000/chat", {   //Certifique-se que essa será sua porta hospedada no backend
```
