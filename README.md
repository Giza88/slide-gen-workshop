# Quick start — clone, install, run

##1. Clone

   git clone <repo-url>
   
   cd slide-gen-workshop

##2. Backend (Python)

   cd backend
   
   Environment variables, Update `.env` file with required values before starting.

   ### create venv and activate (Windows)

   python -m venv .venv
   .venv\Scripts\activate

   ### or macOS / Linux

   python3 -m venv .venv
   source .venv/bin/activate
   

   pip install -r requirements.txt

   ### run backend (development)

   uvicorn main:app --reload

## 4. Frontend (JS)
   
   open new terminal
   cd frontend
   npm install
   npm run dev

##5. Environment
   - Backend defaults to port 8000; frontend (Vite) defaults to 5173.

open the frontend URL shown by Vite (usually http://localhost:5173) and verify the backend at http://localhost:8000/docs
