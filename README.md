# 🐆 FURIA Chatbot

Um chatbot interativo desenvolvido para melhorar a experiência dos fãs do time de CS da FURIA, fornecendo respostas inteligentes e contextualizadas sobre o time, jogadores e partidas. A solução combina inteligência artificial com uma interface web moderna.

## 🚀 Tecnologias Utilizadas

### Front-end
- **Next.js (React)** – Framework para criação da interface web.
- **Tailwind CSS** – Estilização rápida e responsiva.
- **Vercel** – Deploy da aplicação front-end.

### Back-end
- **Python (Flask)** – API para integração com modelos de linguagem.
- **OpenAI API (GPT-4.1-mini)** – Geração das respostas do chatbot.
- **Render** – Hospedagem do back-end.

### Outros
- **Environment Variables** – Utilizadas para armazenar chaves de API de forma segura (`NEXT_PUBLIC_BACKEND_URL`, `OPENAI_API_KEY`, etc).

---

## 💡 Funcionalidade

O chatbot responde perguntas sobre o time da FURIA de forma contextualizada, usando um modelo da OpenAI. Os dados e a personalidade do bot podem ser ajustados no back-end via prompt.

---

## 🔎 Acesse em

https://furia-chatbot-gray.vercel.app

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

- Em **main.py** 

```python
//Troque
allow_origins=origins       //Linha 19
//Por
allow_origins=[*]

//Troque
openai.api_key = os.getenv("OPENAI_API_KEY")         //Linha 30
//Por
openai.api_key = "OPENAI_API_KEY"       //Coloque aqui sua chave própria para a API da OpenAi
```

Fique à vontade para alterar e testar outros modelos disponíveis pela OpenAi

### 3. Instalar as dependências

- Front-end

```bash
# Dentro do diretório raiz
cd frontend
npm install
```

- Back-end

```bash
# Dentro do diretório raiz
python3 -m venv venv

source venv/Scripts/activate      ## Para Linux
.\venv\Scripts\Activate           ## Para Windows PowerShell

pip install -r requirements.txt

```

### 4. Rodar o projeto
- **Back-end** (sempre em primeiro)

```bash
# Dentro do diretório raiz
uvicorn app.main:app
```

Acesse o back-end em http://localhost:8000

- **Front-end** 

```bash
# Em ./frontend
npm run dev
```

Acesse o front-end em http://localhost:3000

