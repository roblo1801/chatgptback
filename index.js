import express from "express";
import cors from "cors";
import { OpenAIApi, Configuration } from "openai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

app.use(cors());
app.use(express.json());

app.post("/askme", (req, res) => {
  console.log("Received request");
  let prompt = req.body.prompt;

  openai
    // .createCompletion({
    //   model: "text-davinci-003",
    //   prompt,
    //   max_tokens: 4097 - prompt.length,
    //   temperature: 0.9,
    //   stream: true,
    // })
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      // max_tokens: 4097 - prompt.length,
      // temperature: 0.9,
      // stream: true,
    })
    .then((response) => {
      const answer = response.data.choices[0].message.content;
      // const answer = response.data
      //   .split("\n")
      //   .filter((line) => line.length > 12)
      //   .map((e) => JSON.parse(e.substring(6)))
      //   .map((e) => e.choices[0].text)
      //   .join("");

      res.json({ answer });
    })
    .catch((err) => {
      console.log(err.response);
      res.json({ answer: "Sorry, I don't know the answer to that." });
    });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${this.address().port}!`);
});
