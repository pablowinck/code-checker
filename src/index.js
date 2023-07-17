require("dotenv").config();
const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");
const FileWalker = require("./FileWalker.js");
const AIMessage = require("./AIMessage.js");

const sourcePath = "./src";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const MAX_LENGTH = 2048;
const RATE_LIMIT_SECONDS = 5;
let counter = 0;

const fileWalker = new FileWalker(sourcePath, async (path) => {
  counter++;
  const fileContent = fs.readFileSync(path, "utf8");

  if (fileContent.length > MAX_LENGTH) {
    console.log(`File ${path} is too long`);
    return;
  }

  await new Promise((resolve) =>
    setTimeout(resolve, RATE_LIMIT_SECONDS * 1000 * counter),
  );

  try {
    console.time(`File ${path} processed`);
    console.log(`Processing file ${path}...`);

    const { messages } = new AIMessage(fileContent);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages,
      temperature: 1,
      max_tokens: MAX_LENGTH,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    fs.writeFileSync(
      `last_output_${new Date().getTime()}.json`,
      JSON.stringify(response.data.choices),
      "utf8",
    );

    const { content } = response.data.choices[0].message;

    if (`${content}`.toUpperCase() === "NO_FIXES") {
      console.log(`No fixes for file ${path}`);
      return;
    }

    console.log(`Writing file ${path}...`, content);

    fs.writeFileSync(path, content, "utf8");
    console.log(`File ${path} written`);
    console.timeEnd(`File ${path} processed`);
  } catch (error) {
    console.error(`[${path}] -- Error processing the file\n`, error);
  }
});

async function main() {
  await fileWalker.walk();
}

main();
