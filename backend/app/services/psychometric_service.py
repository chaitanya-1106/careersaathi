from collections import Counter

CLUSTER_MAP = {
    "aptitude_logic": "Engineering",
    "aptitude_numerical": "Engineering",
    "personality_extrovert": "Business & Management",
    "personality_introvert": "Research & Analytics",
    "skills_biology": "Medical",
    "skills_creative": "Creative Arts",
    "skills_civics": "Government Jobs",
}


def evaluate_psychometric(answers: list[dict]) -> dict:
    picks = [CLUSTER_MAP.get(a.get("option"), "General") for a in answers]
    top = Counter(picks).most_common(1)[0]
    confidence = round(top[1] / max(len(answers), 1), 2)
    return {
        "cluster": top[0],
        "confidence": confidence,
        "career_match_score": int(60 + confidence * 40),
    }
