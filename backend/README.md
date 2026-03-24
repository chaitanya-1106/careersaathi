# Backend (FastAPI)

## Run
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## APIs
- POST `/signup`
- POST `/psychometric-test`
- GET `/profile?profile_id=<id>`
- POST `/ask-ai`
- GET `/roadmap?career=Data Scientist`
- GET `/jobs?city=Delhi`
- GET `/scholarships?financial_background=Low`
- GET `/mentors?career_interest=Engineering&city=Delhi`
- GET `/graph?role=Data Scientist`
