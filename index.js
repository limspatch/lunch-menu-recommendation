
import { config } from "dotenv";
import OpenAI from "openai";
import readline from "readline";

config(); // load .env file

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set API Key
});

// Interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askGPT(question) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
      temperature: 0.7,
    });

    console.log("\n🤖 ChatGPT: " + response.choices[0].message.content);
    askForNextQuestion(); // Next question
  } catch (error) {
    console.error("❌ 오류 발생:", error.message);
  }
}

function askForNextQuestion() {
  rl.question("\n❓ 다른 질문이 있으면 입력하세요 (없으면 'exit' 입력): ", (newQuestion) => {
    if (newQuestion.toLowerCase() === "exit") {
      console.log("👋 종료합니다. 맛있게 드세요!");
      rl.close();
    } else {
      askGPT(newQuestion); // New question
    }
  });
}

// First question
askGPT("신촌에서 대학생들이 1만원 이하로 부담없이 먹을만한 점심 메뉴 추천해줘.");
