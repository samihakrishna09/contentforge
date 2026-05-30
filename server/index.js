require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const Groq = require("groq-sdk");

const app = express();
const port = process.env.PORT || 3001;
const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json({ limit: "1mb" }));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 30,
    standardHeaders: "draft-7",
    legacyHeaders: false
  })
);

const systemPrompt =
  "You are ContentForge, an expert content strategist, SEO editor, and conversion copywriter. Produce specific, structured, useful output. Avoid filler.";

function requireGroq(req, res, next) {
  if (!groq) {
    return res.status(500).json({
      error: "GROQ_API_KEY is missing. Create a .env file from .env.example and add your key."
    });
  }
  return next();
}

function getField(body, key, fallback = "") {
  return typeof body[key] === "string" && body[key].trim() ? body[key].trim() : fallback;
}

async function chatJson(prompt, temperature = 0.4) {
  const completion = await groq.chat.completions.create({
    model,
    temperature,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: `${systemPrompt} Return valid JSON only.` },
      { role: "user", content: prompt }
    ]
  });

  const content = completion.choices?.[0]?.message?.content || "{}";
  return JSON.parse(content);
}

async function streamMarkdown(res, prompt, temperature = 0.7) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  try {
    const stream = await groq.chat.completions.create({
      model,
      temperature,
      stream: true,
      messages: [
        { role: "system", content: `${systemPrompt} Use clean markdown with useful headings.` },
        { role: "user", content: prompt }
      ]
    });

    for await (const chunk of stream) {
      const token = chunk.choices?.[0]?.delta?.content || "";
      if (token) {
        res.write(`data: ${JSON.stringify({ token })}\n\n`);
      }
    }
    res.write(`event: done\ndata: ${JSON.stringify({ done: true })}\n\n`);
  } catch (error) {
    res.write(`event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`);
  } finally {
    res.end();
  }
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, model, groqConfigured: Boolean(groq) });
});

app.post("/api/blog/generate", requireGroq, async (req, res) => {
  const topic = getField(req.body, "topic");
  const audience = getField(req.body, "audience", "general readers");
  const format = getField(req.body, "format", "how-to article");
  const tone = getField(req.body, "tone", "clear and authoritative");
  const keywords = getField(req.body, "keywords", "none provided");

  await streamMarkdown(
    res,
    `Write a ${format} about "${topic}" for ${audience}. Tone: ${tone}. Include SEO keywords naturally: ${keywords}. Include title options, intro, detailed sections, examples, FAQ, and CTA.`
  );
});

app.post("/api/marketing/generate", requireGroq, async (req, res) => {
  const product = getField(req.body, "product");
  const audience = getField(req.body, "audience", "target customers");
  const assetType = getField(req.body, "assetType", "landing page copy");
  const offer = getField(req.body, "offer", "core product value");
  const tone = getField(req.body, "tone", "persuasive and concise");

  await streamMarkdown(
    res,
    `Create ${assetType} for ${product}. Audience: ${audience}. Offer: ${offer}. Tone: ${tone}. Include hooks, body copy, CTA variants, and optimization notes.`
  );
});

app.post("/api/content/rewrite", requireGroq, async (req, res) => {
  const mode = getField(req.body, "mode", "improve clarity");
  const tone = getField(req.body, "tone", "professional");
  const content = getField(req.body, "content");

  await streamMarkdown(res, `Rewrite the following content to ${mode}. Tone: ${tone}.\n\n${content}`, 0.5);
});

app.post("/api/seo/analyze", requireGroq, async (req, res, next) => {
  try {
    const keyword = getField(req.body, "keyword");
    const content = getField(req.body, "content");
    const result = await chatJson(`Analyze SEO for target keyword "${keyword}" and content below. Return JSON with score, summary, strengths, issues, quickFixes, metaTitle, metaDescription, contentGaps, and internalLinkIdeas.\n\n${content}`);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.post("/api/seo/meta", requireGroq, async (req, res, next) => {
  try {
    const topic = getField(req.body, "topic");
    const keyword = getField(req.body, "keyword");
    const brand = getField(req.body, "brand", "ContentForge");
    const result = await chatJson(`Generate SEO metadata for topic "${topic}", keyword "${keyword}", brand "${brand}". Return JSON with titles, descriptions, ogTags, twitterTags, canonicalSlug, and jsonLdSchema.`);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.post("/api/seo/keywords", requireGroq, async (req, res, next) => {
  try {
    const seed = getField(req.body, "seed");
    const audience = getField(req.body, "audience", "general search audience");
    const result = await chatJson(`Research keywords for seed topic "${seed}" and audience "${audience}". Return JSON with primaryKeywords, longTailKeywords, questions, competitorAngles, contentAngles, and clusters. Include estimated intent and difficulty labels.`);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.post("/api/ideas/generate", requireGroq, async (req, res, next) => {
  try {
    const niche = getField(req.body, "niche");
    const audience = getField(req.body, "audience", "target audience");
    const channel = getField(req.body, "channel", "blog");
    const result = await chatJson(`Generate content ideas for niche "${niche}", audience "${audience}", channel "${channel}". Return JSON with ideas array. Each idea needs title, angle, outline, keywords, trafficPotential, funnelStage, and whyNow.`, 0.8);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.post("/api/calendar/generate", requireGroq, async (req, res, next) => {
  try {
    const brand = getField(req.body, "brand");
    const platforms = getField(req.body, "platforms", "blog, LinkedIn, X, email");
    const goals = getField(req.body, "goals", "awareness and conversions");
    const result = await chatJson(`Create a weekly content calendar for "${brand}". Platforms: ${platforms}. Goals: ${goals}. Return JSON with weekTheme, calendar array, repurposingMap, and measurementPlan.`);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.post("/api/brand/voice", requireGroq, async (req, res, next) => {
  try {
    const samples = getField(req.body, "samples");
    const result = await chatJson(`Analyze these brand writing samples. Return JSON with personality, tone, vocabulary, sentenceStyle, dos, donts, sampleRewrite, and promptInstructions.\n\n${samples}`);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: error.message || "Something went wrong." });
});

app.listen(port, () => {
  console.log(`ContentForge API listening on http://localhost:${port}`);
});
