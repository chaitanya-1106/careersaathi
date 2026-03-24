from typing import Any


MOCK_JOBS = [
    {"title": "Junior Data Analyst", "city": "Bengaluru", "source": "NCS", "salary": "4-7 LPA"},
    {"title": "Graduate Engineer Trainee", "city": "Pune", "source": "LinkedIn", "salary": "3.5-6 LPA"},
]

MOCK_SCHOLARSHIPS = [
    {"name": "NSP Merit Scholarship", "eligibility": "Class 12+", "amount": "Up to ₹50,000"},
    {"name": "AICTE Pragati", "eligibility": "Girls in technical education", "amount": "₹50,000/year"},
]

MOCK_MENTORS = [
    {"name": "Riya Sharma", "career_interest": "Engineering", "city": "Delhi", "language": "Hindi/English"},
    {"name": "Aman Verma", "career_interest": "Government Jobs", "city": "Lucknow", "language": "Hindi"},
]


def get_jobs(city: str | None = None) -> list[dict[str, Any]]:
    if not city:
        return MOCK_JOBS
    return [job for job in MOCK_JOBS if job["city"].lower() == city.lower()] or MOCK_JOBS


def get_scholarships(financial_background: str | None = None) -> list[dict[str, Any]]:
    if financial_background == "Low":
        return MOCK_SCHOLARSHIPS
    return MOCK_SCHOLARSHIPS


def get_mentors(career_interest: str | None = None, city: str | None = None) -> list[dict[str, Any]]:
    mentors = MOCK_MENTORS
    if career_interest:
        mentors = [m for m in mentors if m["career_interest"].lower() == career_interest.lower()] or mentors
    if city:
        mentors = [m for m in mentors if m["city"].lower() == city.lower()] or mentors
    return mentors
