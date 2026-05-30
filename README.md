# ContentForge

ContentForge is a generative AI content creation platform built with React, Node.js, and the Groq API. It helps writers, marketers, SEO teams, and founders generate, analyze, rewrite, and plan content from one workspace.

The app uses large language models through Groq chat completions to produce long-form drafts, marketing copy, SEO analysis, keyword ideas, content calendars, brand voice profiles, metadata, and rewritten content.

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

## Workflow

1. Choose a content tool from the sidebar.
2. Enter the required inputs, such as topic, audience, keywords, brand, platform, or pasted content.
3. The React frontend sends the request to the Express API server.
4. The backend builds a focused prompt for the selected workflow and calls the Groq chat completions API.
5. Streaming tools return generated text token-by-token using Server-Sent Events.
6. Analysis tools return structured JSON that the frontend renders as readable sections.
7. Copy the generated output and use it in blog drafts, SEO briefs, campaigns, calendars, or metadata.

## Streaming

Yes, ContentForge uses SSE streaming.

Server-Sent Events are used for tools that generate longer text responses:

- Blog Generator: `/api/blog/generate`
- Marketing Copy: `/api/marketing/generate`
- Content Rewriter: `/api/content/rewrite`

The backend streams Groq response chunks as SSE events, and the React `useStream` hook reads those chunks in real time so generated content appears progressively in the UI.

Tools that need structured results, such as SEO analysis, keyword research, content ideas, calendars, brand voice, and metadata, return JSON instead of streaming text.

## Why Groq API?

ContentForge uses the Groq API because it provides fast LLM inference, which is especially useful for an interactive content generation app. Long-form tools like blog writing and rewriting benefit from low-latency token streaming, so users can see content appear in real time instead of waiting for a full response to finish.

Groq also supports modern open chat models, making it a good fit for experimenting with generative AI workflows such as content drafting, SEO analysis, keyword research, brand voice analysis, and marketing copy generation.

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
