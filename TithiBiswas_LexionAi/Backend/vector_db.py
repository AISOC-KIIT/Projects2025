import chromadb

# Stores vectors on disk in backend/vector_db_data
client = chromadb.PersistentClient(path="vector_db_data")
collection = client.get_or_create_collection("documents")

def store_doc_chunks(doc_id: str, chunks, embeddings):
    ids = [f"{doc_id}_{i}" for i in range(len(chunks))]
    metadatas = [{"doc_id": doc_id, "chunk_index": i} for i in range(len(chunks))]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadatas
    )

def retrieve_relevant_chunks(doc_id: str, query_embedding, k=4):
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=k,
        where={"doc_id": doc_id}
    )
    if not results["documents"]:
        return []
    return results["documents"][0]
