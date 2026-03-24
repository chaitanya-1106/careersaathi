from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "CareerSaathi API"
    app_env: str = "development"
    app_host: str = "0.0.0.0"
    app_port: int = 8000

    mongodb_uri: str = "mongodb://localhost:27017"
    mongodb_db: str = "careersaathi"

    neo4j_uri: str = "bolt://localhost:7687"
    neo4j_user: str = "neo4j"
    neo4j_password: str = "changeme"

    llm_provider: str = "mistral"
    llm_api_key: str = ""
    embedding_model: str = "all-MiniLM-L6-v2"
    enable_mock_external_apis: bool = True

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
