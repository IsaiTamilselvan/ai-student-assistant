from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_classic.chains import ConversationalRetrievalChain
from langchain_classic.memory import ConversationBufferMemory
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaEmbeddings, ChatOllama
from langchain_text_splitters import CharacterTextSplitter
import uuid


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

#-------------------------------------------------------------------------------
#-------------------------------------------------------------------------------

#load college faq text file
loader = TextLoader("college_faq.txt")
documents = loader.load()

#split text into chunks
text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = text_splitter.split_documents(documents)

#create vector for rag
embeddings = OllamaEmbeddings(model="nomic-embed-text")
vectorstore = Chroma.from_documents(chunks, embeddings)

##llm 
llm = ChatOllama(model="qwen2.5:3b", temperature=0)

sessions: dict[str, ConversationalRetrievalChain]={}

def get_chain_for_session(session_id: str) -> ConversationalRetrievalChain:
    if session_id not in sessions:
        memory = ConversationBufferMemory(
            memory_key="chat_history", return_messages=True
        )
        sessions[session_id] = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=vectorstore.as_retriever(),
            memory=memory,
        )
    return sessions[session_id]
#-------------------------------------------------------------------------------------------
#-------------------------------------------------------------------------------------------

class QueryRequest(BaseModel):
    question: str
    session_id: str | None =None

class QueryResponse(BaseModel):
    answer: str
    session_id: str

@app.post("/chat",response_model=QueryResponse)
def chat_endpoint(request: QueryRequest):
    session_id = request.session_id or str(uuid.uuid4())
    chain = get_chain_for_session(session_id)
    response = chain.invoke({"question": request.question})
    return QueryResponse(answer=response["answer"], session_id=session_id)