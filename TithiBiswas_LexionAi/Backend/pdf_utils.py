from pypdf import PdfReader

def extract_pdf_text(pdf_path: str) -> str:
    reader = PdfReader(pdf_path)
    text = []
    for page in reader.pages:
        t = page.extract_text() or ""
        text.append(t)
    return "\n".join(text)
