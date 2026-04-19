# DocAtlas / Markdown Documents Browser

A bilingual technical assessment project built with **Alusus** to import, store, search, and render Markdown documents as HTML through a simple web interface.

This repository contains **two implementations of the same app**:

- **English code** in the `md-to-html` folder
- **Arabic code** in the `md-to-html-ar` folder

It also contains a bilingual Markdown seed pack for testing:

- **`bilingual-markdown-seeds`** contains sample Markdown files in **English and Arabic**
- These files were written with **AI assistance** for testing, demo content, and search validation

---

## 1. Product Overview

### Goal
Build a web application that allows admins to import Markdown documents from URLs, then lets users browse and search those documents in a clean interface.

### Core Idea
The app turns Markdown-based technical content into a searchable internal documentation viewer.

### Why this app exists
This project was built as a technical test around:
- web app structure
- simple admin workflow
- Markdown ingestion
- search experience
- clean UI/UX
- Alusus language usage in both English and Arabic coding styles

---

## 2. What the App Does

### Main Features
- Admin login page
- Import Markdown documents from a URL
- Store documents in app state
- Browse imported documents
- Search documents by partial text match
- Render Markdown content as HTML for readable display
- Switch between admin workflow and browsing workflow

### Current Login
For the current MVP, login is intentionally simple and hardcoded:

- **Username:** `admin`
- **Password:** `admin123`

This is implemented using a simple conditional check and does **not** use a database yet.

---

## 3. Product Requirements Document (PRD)

### 3.1 Problem Statement
Teams often keep technical content in Markdown files across repositories. Reading and finding information across those files can be inconvenient without a dedicated interface.

### 3.2 Proposed Solution
Provide a lightweight documentation browser where:
- an admin imports Markdown files by URL
- the app fetches and stores the content
- users can search and read documents through a web UI

### 3.3 Target Users
- technical reviewers
- developers
- internal documentation readers
- hiring teams evaluating Alusus/web development skills

### 3.4 Scope
#### In Scope
- admin login
- Markdown import from URL
- document listing
- search by partial text
- Markdown-to-HTML rendering
- bilingual project layout

#### Out of Scope for Current MVP
- database persistence
- advanced authentication
- user accounts
- full-text indexing engine
- document deletion with confirmation workflow
- document version history

### 3.5 Functional Requirements
1. The system must provide an admin area.
2. The admin must be able to log in with the configured credentials.
3. The admin must be able to submit a Markdown URL.
4. The system must fetch and ingest the Markdown content.
5. The system must make imported documents visible in the browse area.
6. Users must be able to search documents using partial text matching.
7. The system must render Markdown content as HTML.
8. The system must provide a clear, simple, and easy-to-navigate UI.

### 3.6 Non-Functional Requirements
- simple setup
- readable code
- maintainable structure
- modern UI
- clear UX
- bilingual-friendly documentation
- fast local testing

---

## 4. Repository Structure

```text
.
├── md-to-html/                 # English implementation
├── md-to-html-ar/              # Arabic implementation
├── bilingual-markdown-seeds/   # AI-written Markdown test content in English and Arabic
└── README.md                   # Main project overview
```

### Folder Notes
- `md-to-html` contains the **English version** of the Alusus app
- `md-to-html-ar` contains the **Arabic version** of the Alusus app
- `bilingual-markdown-seeds` contains Markdown files for testing import, rendering, and search

---

## 5. Usage

### 5.1 Run the English Version
```bash
cd md-to-html
alusus app.alusus
```

Then open:
```text
http://localhost:8000/
```

### 5.2 Run the Arabic Version
```bash
cd md-to-html-ar
alusus app.alusus
```

Then open:
```text
http://localhost:8000/
```

> Run one version at a time so both apps do not try to use the same port.

---

## 6. How to Use the App

### Browse Flow
1. Open the app in the browser.
2. View the imported documents.
3. Use the search field to find documents by keyword.
4. Select a document to read its rendered HTML content.

### Admin Flow
1. Open the Admin section.
2. Log in using:
   - `admin`
   - `admin123`
3. Paste a direct Markdown URL.
4. Submit the import form.
5. Return to the browse page and confirm the document appears.

---

## 7. Testing the App with Seed Markdown Files

The `bilingual-markdown-seeds` folder contains sample Markdown documents in both Arabic and English.

These files were created with **AI assistance** and are meant for:
- import testing
- UI preview
- search validation
- rendered Markdown validation
- bilingual content testing

### Suggested Topics Included
- What is Alusus?
- How to be a good web developer
- Installing Alusus on Linux
- Installing Alusus on Windows
- Running a Hello World app

### Recommended Testing Method
Upload these Markdown files to a GitHub repository or any location that gives you a direct raw Markdown URL, then import those links through the app admin page.

---

## 8. Technical Notes

### Current Architecture
This project currently targets a lightweight MVP architecture:
- Alusus app entry point
- backend endpoints
- frontend UI assets
- in-memory document state

### Current Limitations
- no persistent database yet
- login is hardcoded
- imported content does not survive restart unless persistence is added
- search is currently simple partial matching

### Recommended Future Improvements
- add database persistence
- add document delete support
- add section extraction by headings
- add protected admin session
- add import validation and duplicate detection
- add better search ranking
- add document metadata

---

## 9. UI / UX Direction

The UI aims to be:
- modern
- clean
- minimal
- readable
- easy to navigate

The UX focuses on:
- fast access to search
- simple admin import flow
- low-friction testing
- clear separation between browsing and administration

---

## 10. Intended Evaluation Value

This project demonstrates:
- Alusus language usage
- Arabic and English code styles
- web app thinking
- route and feature design
- Markdown ingestion workflow
- practical UI/UX decisions
- repository organization for bilingual implementations

---

## 11. Credentials

```text
Username: admin
Password: admin123
```

---

## 12. Summary

This repository contains a bilingual Alusus web application for importing and browsing Markdown documents.

- English implementation: `md-to-html`
- Arabic implementation: `md-to-html-ar`
- Test Markdown pack: `bilingual-markdown-seeds`

It is designed as a practical MVP and a technical demonstration project for document ingestion, browsing, and search.
