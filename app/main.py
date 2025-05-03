from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from prompts import furia_system_prompt
import openai
import os

# Inicializa a API FastAPI
app = FastAPI()

# Configura o CORS para permitir conexão com o front
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Classe para entrada do usuário
class ChatMessage(BaseModel):
    message: str

# Defina aqui sua chave da OpenAI
openai.api_key = "OPENAI_API_KEY"  

# Rota para comunicação com o FrontEnd
@app.post("/chat")
async def chat_with_furia_bot(chat: ChatMessage):
    try:
        response = openai.responses.create(
            model="gpt-3.5-turbo",
            input=[
                {"role": "system", "content": furia_system_prompt},
                {"role": "user", "content": chat.message}
            ]
        )
        answer = response.output_text.strip()
        return {"response": answer}

    except Exception as e:
        return {"response": f"Erro ao gerar resposta: {str(e)}"}

# Rota simples de teste
@app.get("/")
def root():
    return {"message": "FURIA Chatbot API rodando!"}
