const express = require("express");
const Filter = require("bad-words");
const {
  getAdminMessage,
  getProtectedMessage,
  getPublicMessage,
  getDavinciMessage,
  getDalleMessage,
} = require("./messages.service");
const {
  checkRequiredPermissions,
  validateAccessToken,
} = require("../middleware/auth0.middleware.js");
const { AdminMessagesPermissions } = require("./messages-permissions");
const { rateLimitMiddleware } = require("../middleware/rate-limit.middleware");

const filter = new Filter();
const messagesRouter = express.Router();

messagesRouter.get("/public", (req, res) => {
  const message = getPublicMessage();

  res.status(200).json(message);
});

messagesRouter.get("/protected", validateAccessToken, (req, res) => {
  const message = getProtectedMessage();

  res.status(200).json(message);
});

messagesRouter.get(
  "/admin",
  validateAccessToken,
  checkRequiredPermissions([AdminMessagesPermissions.Read]),
  (req, res) => {
    const message = getAdminMessage();

    res.status(200).json(message);
  }
);

messagesRouter.post(
  "/davinci",
  validateAccessToken,
  rateLimitMiddleware,
  async (req, res) => {
    // Validate request body
    if (!req.body.prompt) {
      return res.status(400).send({
        message: "Missing required field 'prompt' in request body",
      });
    }

    try {
      const { prompt, user } = req.body;
      console.log("user", user, "limit", res.body.limit, "prompt", prompt);

      // Call OpenAI API
      const cleanPrompt = filter.isProfane(prompt)
        ? filter.clean(prompt)
        : prompt;

      const response = await getDavinciMessage(cleanPrompt, user);

      // Return response from OpenAI API
      res.status(200).send({
        bot: response.data.choices[0].message.content,
        limit: res.body.limit,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        error: "Something went wrong",
      });
    }
  }
);

messagesRouter.post(
  "/dalle",
  validateAccessToken,
  rateLimitMiddleware,
  async (req, res) => {
    const { prompt, user } = req.body;
    console.log("user", user, "limit", res.body.limit, "prompt", prompt);

    try {
      const response = await getDalleMessage(prompt);

      res.status(200).send({
        bot: response.data.data[0].url,
        limit: res.body.limit,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        error: "Something went wrong",
      });
    }
  }
);

module.exports = { messagesRouter };
