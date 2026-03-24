from pydantic import BaseModel


class AskAIRequest(BaseModel):
    profile_id: str
    query: str
    lang: str = "en"


class AskAIResponse(BaseModel):
    answer: str
    citations: list[str]
