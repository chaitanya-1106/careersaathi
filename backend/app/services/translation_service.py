TRANSLATIONS = {
    "hi": {
        "Recommended career cluster": "सुझावित करियर क्लस्टर",
        "Personalized guidance": "व्यक्तिगत मार्गदर्शन",
    }
}


def translate_text(text: str, lang: str) -> str:
    if lang != "hi":
        return text
    result = text
    for en, hi in TRANSLATIONS.get("hi", {}).items():
        result = result.replace(en, hi)
    return result
