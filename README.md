# Fraction Forest

A small, playable React learning interaction. Learners identify fractions represented by shaded shapes, marked number lines, and highlighted grouped objects, receive matching explanatory feedback, and continue or retry through four trail stops.

## Audience and limits

This prototype is intended for a primary or junior-secondary learner, or for a teacher demonstrating a short fraction activity. It is a small four-question prototype, not a classroom-ready product or a full learning management system.

There are no learner accounts, personal data collection, audio uploads, backend services, or secrets. No learner data is retained. A full-class version would need persistent learner progress, teacher reporting, and broader content and accessibility testing.
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

To demonstrate the hint-first path, choose any incorrect option first. The app gives a representation-matched hint without revealing the answer, then lets you try again. A second incorrect attempt reveals the correct fraction and explains the marked point, highlighted objects, or shaded parts as appropriate. **Not sure** provides a non-punitive clue, keeps the same question available, and adds that item to mastery review without increasing the incorrect-attempt count. Any question missed in the main round returns in a clearly labeled, spaced mastery retry sequence with the same representation before completion; retry questions must be completed. The completion screen reports both the score and whether fraction identification was mastered. **Start over** is available in the header at any time.

## Learning idea

The interaction maps to **retrieval practice**: recalling information and receiving feedback strengthens later recall. This is based on Roediger, H. L., & Karpicke, J. D. (2006), *Test-enhanced learning: Taking memory tests improves long-term retention*, **Psychological Science, 17**(3), 249–255. Each tap is a low-stakes retrieval attempt; hint-first feedback supports another retrieval attempt, multiple visual representations build connections, and spaced mastery retries revisit missed fractions.
## Demo Video
https://github.com/user-attachments/assets/6224070a-2931-4c31-8b3b-60b08b3e61fd

