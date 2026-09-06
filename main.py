from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_classic.chains import ConversationalRetrievalChain
from langchain_classic.memory import ConversationBufferMemory
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaEmbeddings, ChatOllama
from langchain_text_splitters import CharacterTextSplitter

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

#set memory (fixed 'return_messages')
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

##llm 
llm = ChatOllama(model="qwen2.5:3b", temperature=0)
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=vectorstore.as_retriever(), # fixed 'as_retriever'
    memory=memory
)
#-------------------------------------------------------------------------------------------
#-------------------------------------------------------------------------------------------

class QueryRequest(BaseModel):
    question: str

@app.post("/chat")
def chat_endpoint(request: QueryRequest):
    response = qa_chain.invoke({"question": request.question})
    return {"answer": response["answer"]}