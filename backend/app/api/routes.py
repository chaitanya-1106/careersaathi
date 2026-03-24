from datetime import datetime
from uuid import uuid4

from fastapi import APIRouter, HTTPException, Query

from app.db.mongo import db
from app.schemas.chat import AskAIRequest, AskAIResponse
from app.schemas.profile import StudentProfileIn
from app.schemas.psychometric import PsychometricRequest, PsychometricResponse
from app.services.graph_service import query_career_graph
from app.services.opportunity_service import get_jobs, get_mentors, get_scholarships
from app.services.psychometric_service import evaluate_psychometric
from app.services.rag_service import rag_service
from app.services.roadmap_service import generate_roadmap
from app.services.translation_service import translate_text

router = APIRouter()


@router.post("/signup")
async def signup(payload: StudentProfileIn):
    now = datetime.utcnow()
    doc = payload.model_dump()
    doc.update({"_id": str(uuid4()), "created_at": now, "updated_at": now})
    await db.profiles.insert_one(doc)
    doc["id"] = doc.pop("_id")
    return doc


@router.get("/profile")
async def get_profile(profile_id: str):
    profile = await db.profiles.find_one({"_id": profile_id})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    profile["id"] = profile.pop("_id")
    return profile


@router.post("/psychometric-test", response_model=PsychometricResponse)
async def psychometric_test(payload: PsychometricRequest):
    result = evaluate_psychometric([a.model_dump() for a in payload.answers])
    await db.psychometric.insert_one({"profile_id": payload.profile_id, **result, "created_at": datetime.utcnow()})
    return PsychometricResponse(profile_id=payload.profile_id, **result)


@router.post("/ask-ai", response_model=AskAIResponse)
async def ask_ai(payload: AskAIRequest):
    profile = await db.profiles.find_one({"_id": payload.profile_id})
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    summary = f"{profile['student_class']} {profile['stream']} from {profile['city']}"
    rag = rag_service.ask(payload.query, summary)
    return AskAIResponse(
        answer=translate_text(rag["answer"], payload.lang),
        citations=rag["citations"],
    )


@router.get("/roadmap")
async def roadmap(career: str = Query("Data Scientist")):
    return generate_roadmap(career)


@router.get("/jobs")
async def jobs(city: str | None = None):
    return {"jobs": get_jobs(city)}


@router.get("/scholarships")
async def scholarships(financial_background: str | None = None):
    return {"scholarships": get_scholarships(financial_background)}


@router.get("/mentors")
async def mentors(career_interest: str | None = None, city: str | None = None):
    return {"mentors": get_mentors(career_interest, city)}


@router.get("/graph")
async def graph(role: str = "Data Scientist"):
    return {"results": query_career_graph(role)}
