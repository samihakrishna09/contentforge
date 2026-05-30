# ContentForge

AI-powered content generation platform built with React, Node.js, and the Groq API.

## Features

| Tool | Description |
| --- | --- |
| Blog Generator | Long-form articles, how-tos, listicles with streaming output |
| SEO Analyzer | Score content, fixes, meta suggestions, content gaps |
| Marketing Copy | Ads, email sequences, landing pages, social posts, press releases |
| Content Ideas | Trending topics with outlines, traffic estimates, keywords |
| Keyword Research | Primary and long-tail keywords, questions, content angles |
| Content Calendar | Multi-platform weekly content plans |
| Brand Voice | Analyze content to define brand personality and tone |
| Content Rewriter | Improve, simplify, expand, or rewrite content |
| Meta Generator | SEO titles, descriptions, OG tags, JSON-LD schema |

## Setup

1. Create a Groq API key at [console.groq.com](https://console.groq.com).
2. Copy `.env.example` to `.env`.
3. Add your Groq API key to `.env`.
4. Install dependencies:

```bash
npm install
cd server
npm install
cd ..
```

5. Run the app:

```bash
npm run dev
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:3001`

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| POST | `/api/blog/generate` | Stream blog article |
| POST | `/api/seo/analyze` | SEO analysis |
| POST | `/api/seo/meta` | Meta tag generation |
| POST | `/api/seo/keywords` | Keyword research |
| POST | `/api/marketing/generate` | Stream marketing copy |
| POST | `/api/ideas/generate` | Content ideas |
| POST | `/api/content/rewrite` | Stream rewritten content |
| POST | `/api/calendar/generate` | Content calendar |
| POST | `/api/brand/voice` | Brand voice analysis |

## Environment Variables

| Variable | Description |
| --- | --- |
| `GROQ_API_KEY` | Your Groq API key |
| `GROQ_MODEL` | Groq chat model, default `llama-3.3-70b-versatile` |
| `PORT` | Server port, default `3001` |
| `REACT_APP_API_URL` | API base URL, default `http://localhost:3001` |
