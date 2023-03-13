const express = require("express");
const Filter = require("bad-words");
const {
  getAdminMessage,
  getProtectedMessage,
  getPublicMessage,
  // getDavinciMessage,
  // getDalleMessage,
} = require("./messages.service");
const {
  checkRequiredPermissions,
  validateAccessToken,
} = require("../middleware/auth0.middleware.js");
const { AdminMessagesPermissions } = require("./messages-permissions");
const { rateLimitMiddleware } = require("../middleware/rate-limit.middleware");

const filter = new Filter();
const messagesRouter = express.Router();

messagesRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

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

// messagesRouter.post("/davinci", rateLimitMiddleware, async (req, res) => {
//   console.log("1", req.body);
//   // console.log("2", prompt, user);

//   // Validate request body
//   if (!req.body.prompt) {
//     return res.status(400).send({
//       message: "Missing required field 'prompt' in request body",
//     });
//   }

//   try {
//     // Call OpenAI API
//     const { prompt, user } = req.body;
//     console.log("2", prompt, user);

//     const cleanPrompt = filter.isProfane(prompt)
//       ? filter.clean(prompt)
//       : prompt;
//     console.log(cleanPrompt);

//     const response = await getDavinciMessage(cleanPrompt, user);

//     console.log(response.data.choices[0].message.content);
//     console.log("3", user);
//     // Return response from OpenAI API
//     res.status(200).send({
//       bot: response.data.choices[0].message.content,
//       limit: res.body.limit,
//     });
//   } catch (error) {
//     // Log error and return a generic error message
//     console.error(error);
//     res.status(500).send({
//       error: "Something went wrong",
//     });
//   }
// });

// messagesRouter.post("/dalle", rateLimitMiddleware, async (req, res) => {
//   const { prompt, user } = req.body;

//   console.log("1", req.body);
//   console.log("2", prompt, user);

//   try {
//     const response = await getDalleMessage(prompt, user);

//     console.log(response.data.data[0].url);

//     res.status(200).send({
//       bot: response.data.data[0].url,
//       limit: res.body.limit,
//     });
//   } catch (error) {
//     // Log error and return a generic error message
//     console.error(error);
//     res.status(500).send({
//       error: "Something went wrong",
//     });
//   }
// });

module.exports = { messagesRouter };
