from pathlib import Path

from langchain.schema import Document
from langchain_community.vectorstores import FAISS

KB_PATH = Path(__file__).resolve().parents[1] / "data" / "knowledge_base.txt"


class TinyEmbeddings:
    def embed_documents(self, texts):
        return [[float(len(t) % 10)] * 8 for t in texts]

    def embed_query(self, text):
        return [float(len(text) % 10)] * 8


class RAGService:
    def __init__(self):
        self.vectorstore = self._build_index()

    def _build_index(self):
        lines = [line.strip() for line in KB_PATH.read_text().splitlines() if line.strip()]
        docs = [Document(page_content=line, metadata={"source": "knowledge_base"}) for line in lines]
        return FAISS.from_documents(docs, TinyEmbeddings())

    def ask(self, query: str, profile_summary: str) -> dict:
        docs = self.vectorstore.similarity_search(query, k=3)
        context = " ".join(d.page_content for d in docs)
        answer = (
            f"Personalized guidance: Based on your profile ({profile_summary}), "
            f"here is context-aware advice: {context}"
        )
        return {
            "answer": answer,
            "citations": [d.page_content for d in docs],
        }


rag_service = RAGService()
