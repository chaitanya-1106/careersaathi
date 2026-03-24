from pydantic import BaseModel


class RoadmapStep(BaseModel):
    timeline: str
    action: str


class RoadmapResponse(BaseModel):
    career: str
    skills: list[str]
    exams: list[str]
    resources: list[str]
    steps: list[RoadmapStep]
