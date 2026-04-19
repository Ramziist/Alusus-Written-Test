# DocAtlas runnable package

## Run

```bash
alusus app.alusus
```

Open:

```text
http://localhost:8000/
```

## What this version includes

- Alusus backend with WebPlatform backend endpoints and asset routes
- Static HTML/CSS/JS frontend for a modern UI
- Browse page with partial text search
- Admin page with demo login using `if (username === "admin" && password === "admin123")`
- Remote markdown import by direct URL
- In-memory storage for imported docs

## Notes

- Imported documents are stored in memory for the current server run.
- Remote import uses `curl` first, then `wget` as a fallback.
- Use direct raw markdown URLs when possible.

## Good test URL examples

- `https://raw.githubusercontent.com/Alusus/WebPlatform/main/README.md`
- `https://raw.githubusercontent.com/Alusus/MarkdownTranslator/main/README.md`
