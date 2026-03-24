from pydantic import BaseModel


class PsychometricAnswer(BaseModel):
    question_id: str
    option: str


class PsychometricRequest(BaseModel):
    profile_id: str
    answers: list[PsychometricAnswer]


class PsychometricResponse(BaseModel):
    profile_id: str
    cluster: str
    confidence: float
    career_match_score: int
