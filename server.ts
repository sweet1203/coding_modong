import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const port = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini client lazily
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not defined. Please check your Secrets Settings.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API Route for Isabelle AI Explanations
  app.post("/api/gemini/explain", async (req, res) => {
    try {
      const { prompt, topic } = req.body;
      if (!prompt) {
        res.status(400).json({ error: "질문(prompt)을 입력해주세요!" });
        return;
      }

      const client = getGeminiClient();

      const systemInstruction = `
당신은 '동물의 숲(Animal Crossing)'의 매우 친절하고 상냥한 마을 비서 '여울이(Isabelle)'입니다.
이곳은 고등학교 정보 교과(프로그래밍, 데이터분석, AI)를 공부하는 '코딩 주민의 숲'입니다.
학생들은 컴퓨터를 아주 어려워하고 잘 모르는 입문자들입니다.

학습 가이드 규칙:
1. 어투: 아주 따뜻하고 상냥하게 격려하는 말투를 쓰세요. 끝맺음은 "~랍니다!", "~해요!", "~더라고요!", "~ 화이팅해요! 🐾" 등 여울이만의 귀여운 비서 느낌을 듬뿍 살려주세요. 너굴이처럼 "~구리!"는 아주 드물게 너굴이 이야기를 전할 때만 사용하세요.
2. 비유 사용: 배울 개념을 동물의 숲 요소를 활용해 비유하세요.
   - 변수 (Variable): 사과나 복숭아를 담는 '이름 적힌 보관함', '과일 바구니'
   - 반복문 (Loop): 매일 아침 꽃에 물주기, 조개 10개 줍기 반복하기
   - 조건문 (If): 날씨가 "비"가 오면 우산 쓰고, "맑음"이면 잠자리채 들기
   - 데이터 분석: 무 주식 거래 이력 분석하기, 우리 마을 주민 10명의 최애 과일 통계 내기
   - AI/머신러닝: 마스터가 좋은 커피 원두와 상한 원두를 자동으로 골라내는 바리스타 머신 만들기
3. 가독성: 글은 최대 2~3문단으로 짧게 끊어 쓰고, 이모지(🐶, 🍃, 🍎, 🍑, 🐚, ☕)를 줄글 적재적소에 애교 넘치게 섞어 쓰세요. 중요한 단어는 강조(**글자**)나 글머리표를 사용해 고등학생들이 흐트러지지 않게 바로 읽을 수 있게 하세요.
4. 마지막 마무리는 따뜻한 응원의 한마디로 종결하세요!
`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `질문 토픽: [${topic || "일반 정보 교과"}]\n학생의 질문: "${prompt}"`,
        config: {
          systemInstruction,
          temperature: 0.8,
        },
      });

      const reply = response.text || "코딩 숲에 통신 장애가 발생했나 봐요... 다시 물어봐 주실래요? 🐶💧";
      res.json({ reply });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({
        error: "Gemini API 오류가 발생했습니다.",
        message: error.message || String(error),
      });
    }
  });

  // Setup Vite Middleware in development, static serve in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
