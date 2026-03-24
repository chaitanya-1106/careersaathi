from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.core.config import settings
from app.db.neo4j import close_driver
from app.services.graph_service import seed_graph


@asynccontextmanager
async def lifespan(_app: FastAPI):
    try:
        seed_graph()
    except Exception:
        pass
    yield
    close_driver()


app = FastAPI(title=settings.app_name, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)


@app.get("/")
async def health():
    return {"status": "ok", "service": settings.app_name}
