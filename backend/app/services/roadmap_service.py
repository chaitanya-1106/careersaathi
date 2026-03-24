from app.schemas.roadmap import RoadmapResponse, RoadmapStep


ROADMAPS = {
    "Data Scientist": {
        "skills": ["Python", "SQL", "Statistics", "Machine Learning"],
        "exams": ["JEE/CUET (optional)", "GATE (optional for M.Tech)"],
        "resources": ["NPTEL", "Kaggle", "Coursera", "GitHub projects"],
        "steps": [
            ("0-12 months", "Complete Class 12 with PCM and strengthen maths."),
            ("Year 1-4", "Pursue B.Tech/BSc CS, build coding fundamentals."),
            ("Year 2-4", "Do internships and ML projects with real datasets."),
            ("Year 4+", "Apply for analyst/data science jobs and keep upskilling."),
        ],
    }
}


def generate_roadmap(career: str) -> RoadmapResponse:
    data = ROADMAPS.get(career, ROADMAPS["Data Scientist"])
    return RoadmapResponse(
        career=career,
        skills=data["skills"],
        exams=data["exams"],
        resources=data["resources"],
        steps=[RoadmapStep(timeline=t, action=a) for t, a in data["steps"]],
    )
