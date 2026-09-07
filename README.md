# Local AI Chatbot (React + FastAPI + Ollama)

A lightweight, local AI chatbot application built with a React frontend, a Python FastAPI backend, and powered by Ollama running the Qwen model. All components run completely offline and locally on your machine.

## Tech Stack

* **Frontend:** React, Vite / Create React App
* **Backend:** Python, FastAPI, Uvicorn, Requests / HTTPX
* **LLM Engine:** Ollama (Qwen model)

##Prerequisites
Ensure you have the following installed on your system:

* **Node.js** (v18+ recommended)
* **Python** (v3.10+ recommended)
* **Ollama** running locally

1. Set Up Ollama
Ensure Ollama is installed and pull the Qwen model:
  ollama pull qwen
  ollama serve

2. Set Up the Backend (FastAPI)
Navigate to the backend directory, create a virtual environment, and install dependencies:

cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt

To run: uvicorn main:app --reload --port 8000

3. Set Up the Frontend (React)
Open a new terminal window, navigate to the frontend directory, and start the development server:

commands:
  cd frontend
  npm install
  npm run dev




