EIntelligence - Brand Checker
=============================

A web application to check brand mentions and rankings using Google Gemini API, with CSV download support and top 3 brand insights. Built with **React + TailwindCSS** (frontend) and **Node.js + Express** (backend).

* * * * *

Features
--------

-   Check if a brand is mentioned for a given search query.

-   Get the ranking of the brand in the search results.

-   Download the results as CSV.

-   Optionally include top 3 brands in the download.

-   Fully responsive frontend with TailwindCSS.

-   API hosted on Render and frontend on Vercel.

* * * * *

Tech Stack
----------

**Frontend:** React, TailwindCSS, Vite\
**Backend:** Node.js, Express, Google Generative AI API\
**Hosting:** Vercel (frontend), Render (backend)\
**CSV Export:** Native browser download

* * * * *
Getting Started
-----------------
**Backend**
1. Navigate to the backend folder:
   ```bash
   cd backend
  ```
2. Install dependencies:
  ```bash
  npm install
  ```
3.Create a .env file:
  ```bash
  GEMINI_API_KEY=your_google_gemini_api_key
  PORT=8000
  ```
4. Run the server:
     ```bash
     npm start
     ```
Backend will run at http://localhost:8000.

  **frontend**
1. Navigate to the frontend folder:
   ```bash
   cd frontend
  ```

2. Install dependencies:
  ```bash
  npm install
  ```

3.Create a .env file:
  ```bash
  VITE_API_BASE_URL=http://localhost:8000/api
  ```

4. Run the server:
     ```bash
     npm run dev
     ```
Frontend will run at http://localhost:5173.

--------------------
Fuzzy Logic Matching

--------------------

This project uses **fuzzy logic** to detect brand mentions even if the spelling or formatting differs slightly from the original brand name.

Key points:

-   **Normalization:**

    -   Converts text to lowercase.

    -   Removes accents and diacritics.

    -   Removes content inside parentheses.

    -   Strips punctuation and collapses multiple spaces.

-   **Levenshtein Distance:**

    -   Measures the similarity between the search result and the brand name.

    -   A similarity threshold of **80%** is used to determine if a match exists.

-   **Benefit:**

    -   Handles typos, extra spaces, or minor variations in brand names.

    -   Provides more accurate detection than exact string matching.

### Example

| Search Result | Brand | Match |
| --- | --- | --- |
| `Indi-Go Airlines` | `IndiGo` | Yes |
| `indigo airline` | `IndiGo` | Yes |
| `McDonald's` | `mcdonalds` | Yes |
| `Alphabet(Google)` | `google` | Yes |


Deployment
----------

-   Backend hosted on Render: `https://eintelligence.onrender.com/api`

-   Frontend hosted on Vercel: `https://eintelligence.vercel.app`

 Author
------------

**Mann Shah**
