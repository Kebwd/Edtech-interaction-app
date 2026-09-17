# Fraction Forest

A small, playable React learning interaction. Learners identify the fraction represented by shaded slices, receive immediate explanatory feedback, and continue or retry through four trail stops.

## Learning idea

The interaction maps to **retrieval practice**: recalling information and receiving feedback strengthens later recall. This is based on Roediger, H. L., & Karpicke, J. D. (2006), *Test-enhanced learning: Taking memory tests improves long-term retention*, **Psychological Science, 17**(3), 249–255. Each tap is a low-stakes retrieval attempt, and the response explains the numerator and denominator.

## Run locally

```bash
npm install
npm run dev
```

## Run with Docker

```bash
docker build -t fraction-forest .
docker run --rm -p 8080:80 fraction-forest
```

Open http://localhost:8080.
