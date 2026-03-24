from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class StudentProfileIn(BaseModel):
    name: str = Field(min_length=2)
    student_class: Literal["10th", "12th", "Graduate"]
    stream: Literal["PCM", "PCB", "Commerce", "Arts"]
    marks: float = Field(ge=0, le=100)
    interests: list[str] = Field(min_length=1)
    financial_background: Literal["Low", "Medium", "High"]
    area_type: Literal["Rural", "Urban"]
    city: str


class StudentProfile(StudentProfileIn):
    id: str
    created_at: datetime
    updated_at: datetime
