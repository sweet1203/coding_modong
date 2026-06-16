import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Sparkles, Brain, Cpu, Play, CheckCircle2, RotateCcw } from "lucide-react";

interface AiClassifierFossilProps {
  onBack: () => void;
}

interface TrainingSample {
  id: string;
  type: "fossil" | "stone";
  color: "blue" | "grey";
  texture: "shiny" | "dull";
}

export default function AiClassifierFossil({ onBack }: AiClassifierFossilProps) {
  // Current items we can drag or add
  const [trainingData, setTrainingData] = useState<TrainingSample[]>([
    { id: "1", type: "fossil", color: "blue", texture: "shiny" },
    { id: "2", type: "stone", color: "grey", texture: "dull" },
  ]);

  // Model training status
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [isTrained, setIsTrained] = useState<boolean>(false);

  // Testing stage
  const [testItem, setTestItem] = useState<{ color: "blue" | "grey"; texture: "shiny" | "dull" }>({
    color: "blue",
    texture: "shiny"
  });
  const [prediction, setPrediction] = useState<{ label: string; confidence: number } | null>(null);

  // State counts
  const fossilCount = trainingData.filter(d => d.type === "fossil").length;
  const stoneCount = trainingData.filter(d => d.type === "stone").length;

  const addSample = (type: "fossil" | "stone", color: "blue" | "grey", texture: "shiny" | "dull") => {
    if (trainingData.length >= 12) return; // Prevent infinite clutter
    const newSample: TrainingSample = {
      id: Math.random().toString(),
      type,
      color,
      texture
    };
    setTrainingData([...trainingData, newSample]);
    // Reset trained status if new data is added, forcing retraining
    setIsTrained(false);
    setPrediction(null);
  };

  const clearTrainingData = () => {
    setTrainingData([]);
    setIsTrained(false);
    setPrediction(null);
  };

  const trainModel = () => {
    if (trainingData.length < 4) return;
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
      setIsTrained(true);
    }, 1800);
  };

  const runTestClassification = () => {
    if (!isTrained) return;

    // Simple heuristic-based classification representing the trained "decision boundaries"
    // Blue + Shiny = Fossil (High confidence)
    // Grey + Dull = Stone (High confidence)
    // Grey + Shiny = Stone with some crystal sparks (Confused)
    // Blue + Dull = Clay Fossil/Stone (Confused)
    let label = "일반 돌멩이";
    let confidence = 50;

    const { color, texture } = testItem;

    if (color === "blue" && texture === "shiny") {
      // High match with trained fossils
      label = "진짜 화석";
      confidence = Math.min(85 + (fossilCount * 3), 99);
    } else if (color === "grey" && texture === "dull") {
      // High match with trained stones
      label = "일반 돌멩이";
      confidence = Math.min(85 + (stoneCount * 3), 99);
    } else if (color === "blue" && texture === "dull") {
      // Hybrid
      if (fossilCount >= stoneCount) {
        label = "진짜 화석";
        confidence = 65;
      } else {
        label = "일반 돌멩이";
        confidence = 58;
      }
    } else {
      // grey + shiny
      if (stoneCount >= fossilCount) {
        label = "일반 돌멩이";
        confidence = 72;
      } else {
        label = "진짜 화석";
        confidence = 60;
      }
    }

    setPrediction({ label, confidence });
  };

  return (
    <div className="max-w-5xl mx-auto py-3 px-2 font-sans select-none" id="ai-classifier-district">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-amber-50 text-sm font-display rounded-full shadow border-2 border-amber-300 transform active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
          마을 광장으로 돌아가기
        </button>
        <span className="bg-teal-100 border-2 border-teal-400 text-teal-800 text-xs font-display px-3 py-1 rounded-full shadow-sm">
          ⚙️ 3단원: 인공지능과 지도학습
        </span>
      </div>

      {/* Main content split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left column: Dialog, theory and adding examples (5 cols) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-4">
          
          {/* Coffee Pigeon Brewster dialogue */}
          <div className="bg-white/95 border-4 border-amber-700 rounded-3xl p-4 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-stone-100 border border-stone-300 rounded-full flex items-center justify-center text-3xl shadow-inner shrink-0 leading-none">
                ☕
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">ROASTER MASTER</span>
                <h4 className="font-display text-stone-900 text-base">마스터 바리스타 ☕</h4>
              </div>
            </div>

            <p className="text-xs md:text-sm text-stone-700 leading-relaxed font-semibold">
              "카페에서는 매일 양질의 원두와 손상된 검은 원두를 분류하곤 한답니다... 인공지능에게 정답이 적힌 교과서 데이터를 반복해서 보여주는 학습 방식을 <span className="bg-teal-100 text-teal-900 px-1 font-bold rounded">지도 학습(Supervised Learning)</span>이라고 부르지요... 자, 정답을 가르쳐주는 원두 훈련사가 되어보세요..."
            </p>
          </div>

          {/* Interactive Lesson Card */}
          <div className="bg-teal-50 border-4 border-teal-200 rounded-3xl p-4 shadow-inner">
            <h4 className="font-display text-teal-950 text-xs mb-2 flex items-center gap-1 uppercase tracking-wider">
              🎮 AI 지도 학습 훈련소 교실
            </h4>
            
            <p className="text-[11px] text-stone-700 leading-relaxed font-sans font-medium mb-3">
              원하는 샘플 버튼을 꾹 꾹 눌러서 아래의 **"교과서 훈련 데이터베이스"**에 인공지능이 참고할 모범 정답들을 쌓아주세요.
            </p>

            {/* Quick adding buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => addSample("fossil", "blue", "shiny")}
                className="w-full bg-blue-100 hover:bg-blue-200 text-blue-900 border-2 border-blue-300 rounded-2xl px-3 py-2 text-xs font-bold font-sans flex items-center justify-between cursor-pointer active:scale-98 transition-transform"
              >
                <span>⭐ 파랗고 빛나는 [진짜 화석] 추가</span>
                <span className="text-xl">🌟</span>
              </button>
              <button
                onClick={() => addSample("stone", "grey", "dull")}
                className="w-full bg-stone-100 hover:bg-stone-200 text-stone-900 border-2 border-stone-300 rounded-2xl px-3 py-2 text-xs font-bold font-sans flex items-center justify-between cursor-pointer active:scale-98 transition-transform"
              >
                <span>🪨 잿빛이고 평범한 [돌멩이] 추가</span>
                <span className="text-xl">🪨</span>
              </button>
            </div>

            <div className="text-[10px] text-stone-500 mt-3 italic leading-relaxed text-center font-bold">
              ※ 인공지능 훈련을 하려면 양쪽 데이터가 적어도 각각 2개 이상 필요하답니다!
            </div>
          </div>
        </div>

        {/* Right column: DB, training actions, and AI classification predictions (7 cols) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-5">
          
          {/* DB & Training Area */}
          <div className="bg-white border-4 border-amber-700 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-amber-100 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-teal-600" />
                <h4 className="font-display text-stone-950 text-sm">교과서 정답 목록 (Training Dataset)</h4>
              </div>
              <button
                onClick={clearTrainingData}
                className="text-[10px] text-red-600 font-bold hover:underline flex items-center gap-0.5"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                전체 비우기
              </button>
            </div>

            {/* Counts */}
            <div className="flex gap-4 mb-4 text-xs font-bold text-stone-700">
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-1">
                화석 정답 예시: <span className="text-blue-700 text-sm font-black">{fossilCount}개</span>
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1">
                돌멩이 정답 예시: <span className="text-stone-700 text-sm font-black">{stoneCount}개</span>
              </div>
            </div>

            {/* Icons grid inside DB */}
            <div className="flex flex-wrap gap-2.5 max-h-[140px] overflow-y-auto p-1 border border-stone-100 rounded-xl bg-stone-50/50 mb-4 min-h-[60px] items-center">
              {trainingData.map((d) => (
                <div
                  key={d.id}
                  className={`px-2.5 py-1.5 rounded-xl border-2 font-display text-xs flex items-center gap-1 relative ${
                    d.type === "fossil" ? "bg-blue-100 border-blue-300 text-blue-800" : "bg-stone-200 border-stone-300 text-stone-800"
                  }`}
                >
                  <span className="text-base">{d.type === "fossil" ? "🌟" : "🪨"}</span>
                  <span>{d.type === "fossil" ? "화석" : "돌맹이"}</span>
                  <span className="text-[8px] opacity-70">({d.color === "blue" ? "파" : "회"},{d.texture === "shiny" ? "반" : "무"})</span>
                </div>
              ))}
              {trainingData.length === 0 && (
                <div className="text-center w-full text-xs text-stone-400 py-4 font-bold">
                  샘플 버튼을 눌러 지도학습 가르침 데이터를 쌓아주세요! 🐾
                </div>
              )}
            </div>

            {/* Training run button */}
            <button
              onClick={trainModel}
              disabled={isTraining || trainingData.length < 4}
              className={`w-full font-display text-sm py-2.5 rounded-2xl border-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                trainingData.length < 4
                  ? "bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600 border-teal-600 text-stone-900 font-bold active:scale-98"
              }`}
            >
              <Cpu className="w-4 h-4" />
              {isTraining ? "인공지능 뇌 가동 학습 중..." : isTrained ? "인공지능 학습 성공! (준비완료) ✨" : "인공지능 뇌 신경 학습시키기 (Train)"}
            </button>
          </div>

          {/* TESTING & PREDICTION AREA */}
          <div className="bg-white border-4 border-amber-700 rounded-3xl p-5 shadow-sm">
            <h4 className="font-display text-stone-950 text-sm mb-3 border-b border-amber-100 pb-2 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-teal-600" />
              학습 완료된 AI에게 수수께끼 돌 감별시키기 (Test)
            </h4>

            {/* Interactive mystery item setup */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Feature selector */}
              <div className="bg-stone-50 rounded-2xl p-3 border-2 border-stone-250 flex flex-col gap-2">
                <span className="text-xs font-bold text-stone-600 uppercase block mb-1">🔍 수수께끼 광석 특징 세팅:</span>
                
                {/* Color option */}
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>색상(Color):</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => { setTestItem(prev => ({ ...prev, color: "blue" })); setPrediction(null); }}
                      className={`px-2 py-0.5 rounded-md border ${testItem.color === "blue" ? "bg-blue-500 text-white border-blue-600" : "bg-white border-stone-300"}`}
                    >
                      파란색
                    </button>
                    <button
                      onClick={() => { setTestItem(prev => ({ ...prev, color: "grey" })); setPrediction(null); }}
                      className={`px-2 py-0.5 rounded-md border ${testItem.color === "grey" ? "bg-stone-500 text-white border-stone-600" : "bg-white border-stone-300"}`}
                    >
                      회색
                    </button>
                  </div>
                </div>

                {/* Texture/shiny option */}
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>빛깔(Glow):</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => { setTestItem(prev => ({ ...prev, texture: "shiny" })); setPrediction(null); }}
                      className={`px-2 py-0.5 rounded-md border ${testItem.texture === "shiny" ? "bg-yellow-500 text-stone-900 border-yellow-600" : "bg-white border-stone-300"}`}
                    >
                      반짝거림
                    </button>
                    <button
                      onClick={() => { setTestItem(prev => ({ ...prev, texture: "dull" })); setPrediction(null); }}
                      className={`px-2 py-0.5 rounded-md border ${testItem.texture === "dull" ? "bg-stone-400 text-white border-stone-500" : "bg-white border-stone-300"}`}
                    >
                      푸석푸석
                    </button>
                  </div>
                </div>
              </div>

              {/* Action output show */}
              <div className="border-2 border-dashed border-stone-250 rounded-2xl p-3 flex flex-col justify-center items-center text-center">
                <span className="text-[10px] font-sans font-bold text-stone-400 mb-2">MYSTERY ITEM</span>
                <div className="text-4xl filter drop-shadow animate-pulse">
                  {testItem.color === "blue" && testItem.texture === "shiny" && "🌟❓"}
                  {testItem.color === "grey" && testItem.texture === "dull" && "🪨❓"}
                  {testItem.color === "blue" && testItem.texture === "dull" && "💎❓"}
                  {testItem.color === "grey" && testItem.texture === "shiny" && "🪙❓"}
                </div>
                <span className="text-[10px] text-stone-500 font-bold mt-1">
                  ({testItem.color === "blue" ? "파란" : "회색"} 광석 / {testItem.texture === "shiny" ? "반짝반짝" : "푸석푸석"})
                </span>
              </div>
            </div>

            {/* Test button run */}
            <button
              onClick={runTestClassification}
              disabled={!isTrained}
              className={`w-full font-display text-xs py-2 rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                isTrained
                  ? "bg-amber-500 hover:bg-amber-600 text-white border-2 border-amber-600 shadow"
                  : "bg-stone-100 border border-stone-300 text-stone-400 cursor-not-allowed"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              인공지능 감별 알고리즘 가동하기 (Classify)
            </button>

            {/* Verdict Display */}
            {prediction && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 bg-teal-50 border-2 border-teal-400 rounded-2xl p-3 flex items-center justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-teal-700 block">AI CLASSIFICATION STATUS</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xl">🤖</span>
                    <h5 className="font-display text-stone-900 text-sm">
                      이 물건은 <span className="text-teal-700 font-extrabold underline">{prediction.label}</span> 입니다!
                    </h5>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-stone-400 font-bold uppercase block">CONFIDENCE</span>
                  <span className="font-display text-teal-800 text-xs bg-teal-100/80 px-2 py-0.5 rounded-full border border-teal-300 shadow-inner">
                    확률: {prediction.confidence}%
                  </span>
                </div>
              </motion.div>
            )}

            {!isTrained && (
              <div className="text-center text-[11px] text-stone-400 font-bold italic mt-4">
                ※ 먼저 윗부분에서 교과서 샘플을 입력한 후에 "인공지능 뇌 신경 학습시키기" 버튼을 가동해보세요!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
