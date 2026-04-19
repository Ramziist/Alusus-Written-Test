# Quick test plan

1. Run `alusus app.alusus`
2. Visit `http://localhost:8000/`
3. Confirm the Browse page loads with seeded documents
4. Search for `login`
5. Open the Admin tab
6. Login using:
   - username: `admin`
   - password: `admin123`
7. Import a markdown URL:
   - `https://raw.githubusercontent.com/Alusus/MarkdownTranslator/main/README.md`
8. Confirm the app switches back to Browse and shows the imported document
9. Open the imported document and confirm the markdown is rendered as HTML

## Negative checks

- Try a wrong login and confirm the error message appears
- Try importing an empty URL and confirm the error message appears
- Try importing the same URL twice and confirm duplicate rejection
