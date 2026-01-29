from pypdf import PdfReader
import sys

def extract_text(pdf_path):
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        return f"Error reading {pdf_path}: {e}"

if __name__ == "__main__":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    pdfs = ["Resume (1).pdf", "Shreyas_Shendge_7498807855.pdf"]
    for pdf in pdfs:
        print(f"--- CONTENT OF {pdf} ---")
        print(extract_text(pdf))
        print("\n" + "="*50 + "\n")
