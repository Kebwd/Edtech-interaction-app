# Fraction Forest

A small, playable React learning interaction. Learners identify the fraction represented by shaded slices, receive immediate explanatory feedback, and continue or retry through four trail stops.

## Prerequisites

- Node.js 18 or later
- npm (included with Node.js)
- Docker, only if you want to use the container workflow

## Start locally

Install dependencies, then start the Vite development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

To create and serve a production build locally:

```bash
npm run build
npm run preview
```

## Environment variables

No environment variables are required. The app is a static client and does not read secrets, API keys, or backend configuration from `.env` files. The repository ignores local `.env` files so they are not accidentally committed.

## Run with Docker

Build the static site and serve it with nginx:

```bash
docker build -t fraction-forest .
docker run --rm -p 8080:80 fraction-forest
```

Open http://localhost:8080.

## Demo the main path

1. On the first trail stop, choose **3/4**. The app shows explanatory feedback.
2. Select **Next**, then choose **2/5**.
3. Select **Next**, then choose **5/6**.
4. Select **Next**, then choose **1/3**.
5. Select **Finish** to see the completion screen, then choose **Play again** to restart.

To demonstrate the retry/feedback path, choose any incorrect option first. The app identifies the selected answer as incorrect, reveals the correct fraction, and lets you continue after reviewing the explanation. **Start over** is available in the header at any time.

## Learning idea

The interaction maps to **retrieval practice**: recalling information and receiving feedback strengthens later recall. This is based on Roediger, H. L., & Karpicke, J. D. (2006), *Test-enhanced learning: Taking memory tests improves long-term retention*, **Psychological Science, 17**(3), 249–255. Each tap is a low-stakes retrieval attempt, and the response explains the numerator and denominator.
