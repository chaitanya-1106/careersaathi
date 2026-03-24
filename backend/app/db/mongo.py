from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import settings


mongo_client = AsyncIOMotorClient(settings.mongodb_uri)
db = mongo_client[settings.mongodb_db]
