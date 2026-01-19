from sentence_transformers import SentenceTransformer

# light + fast embedding model (good for weak laptops)
embed_model = SentenceTransformer("all-MiniLM-L6-v2")

def chunk_text(text: str, chunk_size=800, overlap=150):
    chunks = []
    start = 0
    text = text.replace("\r", " ")
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += chunk_size - overlap
    return [c.strip() for c in chunks if c.strip()]

def embed_chunks(chunks):
    return embed_model.encode(chunks).tolist()

def embed_query(query: str):
    return embed_model.encode([query]).tolist()[0]
