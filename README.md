# AI Chat

    Build AI Chat in ReactJS by using OpenAI api (GPT-3.5, DALL-E)

![Open AI ChatGPT clone](https://res.cloudinary.com/myfinance/image/upload/v1678999771/MyFinance/preview_ai_whorwf.png)

_you can checkout the app [here](https://gptchat-clone.vercel.app)_

**_Tech used_**

- [openai API](https://platform.openai.com/)
- [auth0](https://auth0.com)

- [react](https://reactjs.org)
- [tailwindcss](https://tailwindcss.com)
- [react-markdown](https://github.com/remarkjs/react-markdown#readme)
- [express](https://expressjs.com)
- [redis](https://redis.io)

## Installation

### client

```bash
cd client && npm i
```

### server

```bash
cd server && npm i
```

## Configuration

### Server

1. obtain your openai api key from [here](https://openai.com)
2. `cd server`
3. copy `.env.example` to `.env`
4. add your openai api key inside `.env`
5. make sure you have added `.env` to your `.gitignore` file

### Client

1. `cd client`
2. copy `.env.example` to `.env`
3. add your Auth0 credentials inside `.env`
4. make sure you have added `.env` to your `.gitignore` file

### to run client

```bash
cd client
npm start
```

### to run server

```bash
cd server
npm start
```
