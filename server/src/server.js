const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const nocache = require("nocache");
const { Configuration, OpenAIApi } = require("openai");
const Filter = require("bad-words");
const { messagesRouter } = require("./messages/messages.router");
const { rateLimitMiddleware } = require("./middleware/rate-limit.middleware");
const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");
const { openai } = require("./config/ai-config");

const filter = new Filter();

dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const PORT = parseInt(process.env.PORT, 10);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

// Create OpenAI configuration
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// Create OpenAI API client
// const openai = new OpenAIApi(configuration);

// Create Express app
const app = express();
const apiRouter = express.Router();

app.use(express.json());
app.set("json spaces", 2);

app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        "default-src": ["'none'"],
        "frame-ancestors": ["'none'"],
      },
    },
    frameguard: {
      action: "deny",
    },
  })
);

app.use((req, res, next) => {
  res.contentType("application/json; charset=utf-8");
  next();
});
app.use(nocache());

app.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET, POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  })
);

app.use("/", apiRouter);
apiRouter.use("/messages", messagesRouter);

// ratelimiter middleware function
app.use("/davinci", rateLimitMiddleware);
app.use("/dalle", rateLimitMiddleware);

/**
 * POST /davinci
 * Returns a response from OpenAI's text completion model.
 */
app.post("/davinci", async (req, res) => {
  // Validate request body
  if (!req.body.prompt) {
    return res.status(400).send({
      error: 'Missing required field "prompt" in request body',
    });
  }

  try {
    // Call OpenAI API
    const { prompt, user } = req.body;
    const cleanPrompt = filter.isProfane(prompt)
      ? filter.clean(prompt)
      : prompt;
    console.log(cleanPrompt);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "you're an a AI assistant that replies to all my questions in markdown format.",
        },
        { role: "user", content: "hi" },
        { role: "assistant", content: "Hi! How can I help you?" },
        { role: "user", content: `${cleanPrompt}?` },
      ],
      user: user,
      temperature: 0.5,
      max_tokens: 500,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.2,
    });

    console.log(response.data.choices[0].message.content);
    console.log(user);
    // Return response from OpenAI API
    res.status(200).send({
      bot: response.data.choices[0].message.content,
      limit: res.body.limit,
    });
  } catch (error) {
    // Log error and return a generic error message
    console.error(error);
    res.status(500).send({
      error: "Something went wrong",
    });
  }
});

/**
 * POST /dalle
 * Returns a response from OpenAI's image generation model.
 */
app.post("/dalle", async (req, res) => {
  const { prompt, user } = req.body;

  try {
    const response = await openai.createImage({
      prompt: `${prompt}`,
      // user: user,
      n: 1,
      size: "256x256",
    });

    console.log(response.data.data[0].url);
    res.status(200).send({
      bot: response.data.data[0].url,
      limit: res.body.limit,
    });
  } catch (error) {
    // Log error and return a generic error message
    console.error(error);
    res.status(500).send({
      error: "Something went wrong",
    });
  }
});

app.use(errorHandler);
app.use(notFoundHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
