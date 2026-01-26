import os
import uuid
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import google.generativeai as genai

from pdf_utils import extract_pdf_text
from rag import chunk_text, embed_chunks, embed_query
from vector_db import store_doc_chunks, retrieve_relevant_chunks

# Load env
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("Missing GEMINI_API_KEY in .env file")

genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://lexion-rag.vercel.app/",  # Replace with your actual Vercel URL
    "https://*.vercel.app",  # Allow all Vercel preview deployments
]


# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # in production restrict domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "../uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# in-memory store: doc_id -> short info
DOC_STORE = {}

def gemini_summary(text: str) -> str:
    # to avoid token overload, limit text
    clipped = text[:12000]
    prompt = f"""
Summarize the following document for students.
Give:
1) 8-12 bullet points
2) Important keywords
3) 5 possible exam questions

DOCUMENT:
{clipped}
"""
    res = gemini_model.generate_content(prompt)
    return res.text

def gemini_answer(context: str, question: str) -> str:
    prompt = f"""
You are a strict assistant.
Answer ONLY using the Context below.
If answer not present in Context, reply exactly:
Not found in document.

Context:
{context}

Question: {question}
"""
    res = gemini_model.generate_content(prompt)
    return res.text

@app.get("/")
def home():
    return {"status": "ok", "message": "Gemini RAG backend running"}

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        print(f"Received file: {file.filename}")
        
        if not file.filename.lower().endswith(".pdf"):
            return {"error": "Only PDF supported"}

        doc_id = str(uuid.uuid4())
        save_path = os.path.join(UPLOAD_DIR, f"{doc_id}.pdf")

        # save pdf
        content = await file.read()
        print(f"File size: {len(content)} bytes")
        
        with open(save_path, "wb") as f:
            f.write(content)
        print(f"File saved to: {save_path}")

        # extract text
        text = extract_pdf_text(save_path)
        print(f"Extracted text length: {len(text)}")
        
        if len(text.strip()) < 30:
            return {"error": "Could not extract text. PDF may be scanned image."}

        # chunk + embed + store vectors
        chunks = chunk_text(text)
        print(f"Created {len(chunks)} chunks")
        
        embeddings = embed_chunks(chunks)
        print(f"Generated embeddings")
        
        store_doc_chunks(doc_id, chunks, embeddings)
        print(f"Stored in vector DB")

        # create summary
        summary = gemini_summary(text)
        print(f"Generated summary")
    except Exception as e:
        print(f"ERROR during upload: {str(e)}")
        import traceback
        traceback.print_exc()
        return {"error": f"Upload failed: {str(e)}"}

    DOC_STORE[doc_id] = {
        "filename": file.filename,
        "chunks": len(chunks)
    }

    return {
        "doc_id": doc_id,
        "filename": file.filename,
        "chunks_stored": len(chunks),
        "summary": summary
    }

@app.post("/ask")
async def ask_question(payload: dict):
    doc_id = payload.get("doc_id")
    question = payload.get("question")

    if not doc_id or not question:
        return {"error": "doc_id and question required"}

    # embed query
    q_emb = embed_query(question)

    # retrieve top chunks
    top_chunks = retrieve_relevant_chunks(doc_id, q_emb, k=4)
    if not top_chunks:
        return {"answer": "Not found in document."}

    context = "\n\n".join(top_chunks)

    # ask gemini based on context
    answer = gemini_answer(context, question)

    return {
        "answer": answer,
        "context_chunks": top_chunks
    }
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)