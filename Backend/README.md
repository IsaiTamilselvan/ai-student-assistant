# 🎓 AI Student Support Assistant

A local Retrieval-Augmented Generation (RAG) web service built for college students, powered by FastAPI, LangChain, ChromaDB, and Ollama (`qwen2.5:3b` & `nomic-embed-text`).

## 🚀 Features
- **Local LLM Inference:** Runs 100% offline using Ollama, ensuring zero data privacy leaks.
- **RAG Architecture:** Queries a custom knowledge base (`college_faq.txt`) to prevent hallucinations.
- **Conversational Memory:** Retains multi-turn dialogue context using LangChain's buffer memory.
- **FastAPI Backend:** Exposes a high-performance REST API endpoint (`POST /chat`) with CORS enabled for frontend integration.

## 🛠️ Tech Stack
- **Python / FastAPI**
- **LangChain**
- **ChromaDB**
- **Ollama (Qwen 2.5:3b & Nomic Embeddings)**
