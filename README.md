# CareerSaathi 2.0 — AI-Powered Career Guidance System (India)

Production-style hackathon prototype with **FastAPI + React + MongoDB + Neo4j + LangChain/FAISS**.

## 1) Architecture

- **Frontend**: React + Tailwind (`frontend/`)
- **Backend**: FastAPI (`backend/`)
- **Profile DB**: MongoDB
- **Knowledge Graph**: Neo4j
- **AI Layer**: LangChain + FAISS (RAG-ready local prototype)
- **External Integrations**: Mock Jobs/Scholarships/Mentors APIs

## 2) Features Implemented

1. Student profile engine (`/signup`, `/profile`)  
2. Psychometric test module (`/psychometric-test`)  
3. LLM + RAG pipeline (`/ask-ai`)  
4. Career roadmap generator (`/roadmap`)  
5. Knowledge graph APIs with Neo4j (`/graph`)  
6. Job + scholarship integration (`/jobs`, `/scholarships`)  
7. Multilingual support (English/Hindi translation layer)  
8. Mentor matching (`/mentors`)  
9. Career match score (psychometric response)  
10. Dashboard with opportunities/mentors

## 3) Folder Structure

```text
careersaathi/
├── backend/
│   ├── app/
│   │   ├── api/routes.py
│   │   ├── core/config.py
│   │   ├── db/{mongo.py,neo4j.py}
│   │   ├── schemas/
│   │   ├── services/
│   │   └── data/knowledge_base.txt
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── src/{pages,components,services}
│   ├── package.json
│   ├── .env.example
│   └── README.md
└── README.md
```

## 4) Local Setup

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 5) API Documentation

After starting backend, open:
- Swagger: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Required Endpoints
- `POST /signup`
- `POST /psychometric-test`
- `GET /profile`
- `POST /ask-ai`
- `GET /roadmap`
- `GET /jobs`
- `GET /scholarships`
- `GET /mentors`

## 6) Sample Data
- Knowledge base: `backend/app/data/knowledge_base.txt`
- Mentors/jobs/scholarships: `backend/app/services/opportunity_service.py`

## 7) Hackathon Notes
- Uses mock integrations where public APIs are unavailable.
- Designed to be modular and easy to extend for SIH-grade demos.
