import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Send, Sparkles, MessageSquare, BookOpen, AlertCircle } from "lucide-react";
import { ChatMessage } from "../types";

interface IsabelleChatProps {
  onBack: () => void;
}

export default function IsabelleChat({ onBack }: IsabelleChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "안녕하세요, 우리 소중한 학생 주민님! 🐶🌸 마을의 행정 업무와 더불어 여러분의 정보 공부 학습 도우미를 맡은 여울이라고 해요!\n\n오늘 프로그래밍을 배우다가 꽉 막힌 부분이 있거나, 인공지능이 뭔지 도무지 아리송하다면 편하게 제게 여쭤보세요! 동물의 숲 주민들이 정성껏 비유를 들어 아주 쉽게 설명해 드릴게요. 무엇부터 시작할까요? 🐾",
      timestamp: new Date()
    }
  ]);

  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Suggested starter prompts for informatics students
  const suggestions = [
    { text: "배열(Array)이 뭔가요?", topic: "자료조직" },
    { text: "반복문(Loop)이 왜 필요해요?", topic: "프로그래밍 제어" },
    { text: "데이터 분석과 통계의 차이점은?", topic: "데이터분석" },
    { text: "인공지능 기계학습이 정말 머리가 좋나요?", topic: "인공지능과학" }
  ];

  // Auto-scroll logic
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text: string, topic?: string) => {
    if (!text.trim() || isLoading) return;

    setErrorNotice(null);
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, topic: topic || "일반 정보" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "서버와 대화에 실패했어요... 다시 시도해볼래요?");
      }

      const modelMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "model",
        content: data.reply,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setErrorNotice(
        "앗! 비밀 상담소 국선 안테나가 통신에 실패했나 봐요... 🐶💧 혹시 선생님께서 AI Studio Secrets 설정에 [GEMINI_API_KEY]를 올바르게 입력하셨는지 꼭 확인해 달라구리!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-2 px-1 font-sans select-none flex flex-col h-[calc(100vh-140px)]" id="isabelle-chat-district">
      {/* Mini Title bar */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-amber-50 text-sm font-display rounded-full shadow border-2 border-amber-300 transform active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
          마을 광장으로 돌아가기
        </button>
        <span className="bg-yellow-105 border-2 border-yellow-400 text-yellow-800 text-xs font-display px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
          🌸 여울이의 일대일 상담소
        </span>
      </div>

      {/* Main chat boundary layout (flex-1 expansion) */}
      <div className="flex-1 bg-white/95 border-4 border-amber-500 rounded-3xl p-4 shadow-md flex flex-col justify-between overflow-hidden">
        
        {/* Scroller messages list */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 mb-4">
          <AnimatePresence initial={false}>
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 items-start ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-xl shrink-0 shadow-inner ${
                    isUser ? "bg-amber-100 border-amber-300" : "bg-yellow-100 border-yellow-300"
                  }`}>
                    {isUser ? "🧑‍🎓" : "🐶"}
                  </div>

                  {/* Speech Dialog Area */}
                  <div className="max-w-[80%] flex flex-col">
                    <span className={`text-[10px] font-bold text-stone-400 mb-0.5 ${isUser ? "text-right" : "text-left"}`}>
                      {isUser ? "질문하는 학생 주민" : "마을 서기 여울이"}
                    </span>
                    
                    {/* Bubble box shape */}
                    <div className={`p-3.5 rounded-2xl border-2 shadow-sm text-xs md:text-sm whitespace-pre-wrap leading-relaxed ${
                      isUser
                        ? "bg-amber-500 border-amber-600 text-white rounded-tr-none font-bold"
                        : "bg-stone-50 border-stone-200 text-stone-800 rounded-tl-none font-medium"
                    }`}>
                      {m.content}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing state dots */}
          {isLoading && (
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-full border bg-yellow-100 border-yellow-300 flex items-center justify-center text-xl shrink-0 animate-bounce">
                🐶
              </div>
              <div>
                <span className="text-[10px] font-bold text-stone-400 block mb-0.5">여울이가 종이에 또박또박 적는 중...</span>
                <div className="bg-stone-50 border-2 border-stone-200 p-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            </div>
          )}

          {/* Error panel inside scroll */}
          {errorNotice && (
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 flex gap-3 text-red-800">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <h5 className="font-display text-sm">통신 연결 장애 안내구리!</h5>
                <p className="text-xs leading-relaxed font-bold mt-1">{errorNotice}</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Starter Buttons */}
        {messages.length === 1 && !isLoading && (
          <div className="mb-4 shrink-0">
            <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider block mb-2">⭐ 여울이가 추천하는 컴퓨터 대화 주제:</span>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((s) => (
                <button
                  key={s.text}
                  onClick={() => sendMessage(s.text, s.topic)}
                  className="bg-stone-50 hover:bg-stone-100 border-2 border-stone-200 hover:border-amber-400 text-stone-700 text-[11px] font-bold pl-3 pr-2 py-2 rounded-xl text-left cursor-pointer transition-all duration-200 flex items-center justify-between group active:scale-98"
                >
                  <span>{s.text}</span>
                  <BookOpen className="w-3.5 h-3.5 text-stone-405 group-hover:text-amber-500 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dialogue input bar forms */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(inputValue);
          }}
          className="flex gap-2 shrink-0 border-t border-stone-100 pt-3"
        >
          <div className="flex-1 bg-stone-50 border-2 border-stone-200 focus-within:border-amber-500 transition-colors rounded-2xl px-3 py-1.5 flex items-center gap-2">
            <span className="text-lg">🍃</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="여울이에게 쉬운 코딩 질문을 속시원히 던져보세요..."
              className="bg-transparent text-xs sm:text-sm text-stone-800 outline-none w-full font-bold"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-amber-500 hover:bg-amber-600 disabled:bg-stone-250 disabled:text-stone-400 text-white font-black px-4.5 py-2.5 rounded-2xl flex items-center gap-1.5 transition-colors cursor-pointer select-none text-xs sm:text-sm active:scale-95"
          >
            <span>상담하기</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
