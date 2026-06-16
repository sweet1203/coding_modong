import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Play, RefreshCw, Sparkles, Check, HelpCircle } from "lucide-react";

interface ProgrammingBasketProps {
  onBack: () => void;
}

export default function ProgrammingBasket({ onBack }: ProgrammingBasketProps) {
  // Simulator state variables
  const [basketName, setBasketName] = useState<string>("my_basket");
  const [fruitType, setFruitType] = useState<"apple" | "peach" | "cherry">("peach");
  const [fruitCount, setFruitCount] = useState<number>(3);
  const [ownerName, setOwnerName] = useState<string>("너굴");

  // Input states for the "Playground code editor"
  const [codeName, setCodeName] = useState<string>("my_basket");
  const [codeFruit, setCodeFruit] = useState<string>("복숭아");
  const [codeCount, setCodeCount] = useState<string>("3");
  const [codeOwner, setCodeOwner] = useState<string>("너굴");

  // Compilation/Execution state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Quiz missions
  const [activeMission, setActiveMission] = useState<number>(1);
  const [missionCleared, setMissionCleared] = useState<Record<number, boolean>>({
    1: false,
    2: false
  });

  const runCodeSimulator = () => {
    setIsRunning(true);
    setErrorMessage("");

    // Simulate half-second latency for cute processing
    setTimeout(() => {
      setIsRunning(false);

      // Verify input values and validate them
      const cleanName = codeName.trim().replace(/[^a-zA-Z0-9_]/g, "");
      if (!cleanName) {
        setErrorMessage("⚠️ 변수 이름은 영어 알파벳, 숫자, 밑줄(_)만 가능해요구리!");
        return;
      }
      if (cleanName.match(/^[0-9]/)) {
        setErrorMessage("⚠️ 아앗! 변수 이름 첫 글자는 숫자로 시작할 수 없답니다구리!");
        return;
      }

      // Convert fruit
      let chosenFruit: "apple" | "peach" | "cherry" = "peach";
      const cleanFruit = codeFruit.trim();
      if (cleanFruit === "사과" || cleanFruit.toLowerCase() === "apple") {
        chosenFruit = "apple";
      } else if (cleanFruit === "복숭아" || cleanFruit.toLowerCase() === "peach") {
        chosenFruit = "peach";
      } else if (cleanFruit === "체리" || cleanFruit.toLowerCase() === "cherry") {
        chosenFruit = "cherry";
      } else {
        setErrorMessage(`⚠️ 변수에 담을 수 없는 과일이에요! '사과', '복숭아', '체리' 중에서만 직접 입력해달라구리!`);
        return;
      }

      // Parse integer count
      const numCount = parseInt(codeCount.trim(), 10);
      if (isNaN(numCount) || numCount < 0) {
        setErrorMessage("⚠️ 개수에는 올바른 양의 정수(참된 숫자)를 써주세요구리!");
        return;
      }
      if (numCount > 10) {
        setErrorMessage("⚠️ 아앗! 바구니가 주체하지 못하고 너무 넘쳐나서 최대 10개까지만 과일을 넣어달라구리!");
        return;
      }

      // If valid, apply changes
      setBasketName(cleanName);
      setFruitType(chosenFruit);
      setFruitCount(numCount);
      setOwnerName(codeOwner.trim() || "이웃주민");
      setIsSuccess(true);

      // Simple animation flash
      setTimeout(() => setIsSuccess(false), 800);

      // Evaluate missions
      if (activeMission === 1) {
        // Mission 1: "사과"가 담긴 "apple_box" 변수를 만들고 개수는 정확히 7개로 설정하기!
        if (cleanName === "apple_box" && chosenFruit === "apple" && numCount === 7) {
          setMissionCleared(prev => ({ ...prev, 1: true }));
        }
      } else if (activeMission === 2) {
        // Mission 2: "복숭아"가 담긴 "dream_box" 변수를 만들고 주인(owner)을 "여울이"로 바꾸기!
        if (cleanName === "dream_box" && chosenFruit === "peach" && codeOwner.trim() === "여울이") {
          setMissionCleared(prev => ({ ...prev, 2: true }));
        }
      }
    }, 550);
  };

  const loadMissionTemplate = (missionId: number) => {
    setActiveMission(missionId);
    if (missionId === 1) {
      setCodeName("basket");
      setCodeFruit("사과");
      setCodeCount("5");
      setCodeOwner("너굴");
    } else {
      setCodeName("basket");
      setCodeFruit("복숭아");
      setCodeCount("3");
      setCodeOwner("쭈니");
    }
  };

  const resetAllSimulator = () => {
    setBasketName("my_basket");
    setFruitType("peach");
    setFruitCount(3);
    setOwnerName("너굴");
    setCodeName("my_basket");
    setCodeFruit("복숭아");
    setCodeCount("3");
    setCodeOwner("너굴");
    setErrorMessage("");
  };

  // Get matching Korean terms
  const getKoreanFruitName = (f: "apple" | "peach" | "cherry") => {
    if (f === "apple") return "사과 🍎";
    if (f === "peach") return "복숭아 🍑";
    return "체리 🍒";
  };

  return (
    <div className="max-w-5xl mx-auto py-3 px-2 font-sans select-none" id="programming-basket-district">
      {/* Back button and page title */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-amber-50 text-sm font-display rounded-full shadow border-2 border-amber-300 transform active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
          마을 광장으로 돌아가기
        </button>
        <span className="bg-emerald-100 border-2 border-emerald-400 text-emerald-800 text-xs font-display px-3 py-1 rounded-full shadow-sm">
          🍃 1단원: 프로그래밍과 변수
        </span>
      </div>

      {/* Main Grid Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Character Dialogue & Interactive Code Editor (7 cols) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-5">
          {/* Tom Nook Coach Card */}
          <div className="bg-white/90 border-4 border-emerald-500 rounded-3xl p-4 md:p-5 shadow-sm flex items-start gap-4">
            <div className="w-16 h-16 bg-emerald-100 border-2 border-emerald-400 rounded-full flex items-center justify-center text-3xl shadow-inner shrink-0 relative">
              🍃
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[9px] px-1 rounded-md font-bold">너굴</span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-display text-emerald-800 mb-1">변수(Variable)란 무엇일까구리?</h3>
              <p className="text-xs md:text-sm text-stone-700 leading-relaxed font-semibold">
                "컴퓨터는 기억력이 아주 똑똑하지만 동시에 백지상태 같아구리! 우린 컴퓨터 안에 과일을 담듯이 **정보를 안전하게 담아둘 이름 적힌 바구니**를 만드는데, 이걸 바로 <span className="text-emerald-700 underline font-bold bg-emerald-50 px-1">변수(Variable)</span>라고 부른단다. 바구니 이름에 정보를 마구 바꾸어 담을 수 있어서 '변하는 수' 변수구리!"
              </p>
            </div>
          </div>

          {/* Interactive Code Form Sheet (Mimicking an easy code editor) */}
          <div className="bg-stone-800 rounded-3xl border-4 border-stone-700 p-5 shadow-inner text-white flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-stone-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="text-xs text-stone-400 font-mono ml-1">nook_py_editor.exe</span>
                </div>
                <div className="text-[10px] text-emerald-300 font-mono animate-pulse">● READY FOR PLAYGROUND</div>
              </div>

              {/* Pseudo Python Syntax Fields */}
              <div className="space-y-4 font-mono text-xs md:text-sm pt-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <span className="text-emerald-400 shrink-0 select-none"># 1. 과일 바구니(변수)의 이름을 지어주세요구리:</span>
                </div>
                <div className="flex items-center gap-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 focus-within:border-emerald-400 transition-colors">
                  <input
                    type="text"
                    value={codeName}
                    onChange={(e) => setCodeName(e.target.value)}
                    className="bg-transparent text-white outline-none w-full font-mono font-bold text-sm"
                    placeholder="my_basket"
                  />
                  <span className="text-stone-500 font-bold select-none">= ...</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 pt-2">
                  <span className="text-emerald-400 shrink-0 select-none"># 2. 바구니에 담을 과일 종류 (사과 / 복숭아 / 체리):</span>
                </div>
                <div className="flex items-center gap-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 focus-within:border-emerald-400 transition-colors">
                  <span className="text-stone-500 select-none">"</span>
                  <input
                    type="text"
                    value={codeFruit}
                    onChange={(e) => setCodeFruit(e.target.value)}
                    className="bg-transparent text-white outline-none w-full font-mono text-sm"
                    placeholder="복숭아"
                  />
                  <span className="text-stone-500 select-none">"</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div>
                    <span className="text-emerald-400 block mb-1 select-none"># 3. 담길 과일의 개수 (최대 10개):</span>
                    <div className="flex items-center gap-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 focus-within:border-emerald-400 transition-colors">
                      <input
                        type="number"
                        value={codeCount}
                        onChange={(e) => setCodeCount(e.target.value)}
                        className="bg-transparent text-white outline-none w-full font-mono text-sm"
                        min="1"
                        max="10"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-emerald-400 block mb-1 select-none"># 4. 바구니 주인 이름:</span>
                    <div className="flex items-center gap-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 focus-within:border-emerald-400 transition-colors">
                      <span className="text-stone-500 select-none">"</span>
                      <input
                        type="text"
                        value={codeOwner}
                        onChange={(e) => setCodeOwner(e.target.value)}
                        className="bg-transparent text-white outline-none w-full font-mono text-sm"
                        placeholder="너굴"
                      />
                      <span className="text-stone-500 select-none">"</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error panel if output is invalid */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-red-900/40 border border-red-500 text-red-200 p-2.5 rounded-xl text-xs font-mono"
                >
                  {errorMessage}
                </motion.div>
              )}
            </div>

            {/* Run Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={runCodeSimulator}
                disabled={isRunning}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-stone-600 text-stone-900 font-bold px-4 py-2.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow transition-all duration-200 text-sm select-none"
              >
                {isRunning ? (
                  <span className="w-4 h-4 border-2 border-stone-900 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <Play className="w-4 h-4 fill-stone-900 text-stone-900" />
                )}
                스마트 과일 바구니 실행하기 (Run)
              </button>
              <button
                onClick={resetAllSimulator}
                className="bg-stone-700 hover:bg-stone-600 text-stone-300 font-bold px-4 py-2.5 rounded-2xl flex items-center justify-center gap-1.5 transition-colors text-xs select-none cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                초기화
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Fruit Basket Renderer & Missions (5 cols) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col gap-5">
          
          {/* Mission Challenge Block */}
          <div className="bg-amber-50 border-4 border-amber-300 rounded-3xl p-4 md:p-5 shadow-sm">
            <h4 className="font-display text-amber-900 text-sm mb-3 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              오늘의 너굴 퀘스트 미션!
            </h4>

            {/* Selector buttons */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => loadMissionTemplate(1)}
                className={`flex-1 text-xs px-3 py-1.5 rounded-full font-display border transition-all ${
                  activeMission === 1
                    ? "bg-amber-500 text-white border-amber-600"
                    : "bg-white text-stone-600 border-stone-300 hover:bg-stone-50"
                }`}
              >
                미션 1 {missionCleared[1] ? "✅" : "💡"}
              </button>
              <button
                onClick={() => loadMissionTemplate(2)}
                className={`flex-1 text-xs px-3 py-1.5 rounded-full font-display border transition-all ${
                  activeMission === 2
                    ? "bg-amber-500 text-white border-amber-600"
                    : "bg-white text-stone-600 border-stone-300 hover:bg-stone-50"
                }`}
              >
                미션 2 {missionCleared[2] ? "✅" : "💡"}
              </button>
            </div>

            {/* Mission text */}
            <div className="bg-white border-2 border-amber-200 rounded-2xl p-3 text-stone-700 text-xs leading-relaxed font-semibold">
              {activeMission === 1 ? (
                <>
                  <p className="text-amber-800 font-bold mb-1">🎯 사과 7개 바구니 완성하기!</p>
                  <p>바구니 이름 변수를 <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono">apple_box</code>로 짓고, 과일은 <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded">사과</code>, 개수는 정확히 <code className="bg-amber-100 text-amber-900 px-1 font-mono rounded">7</code>개로 설정해 실행하라구리!</p>
                </>
              ) : (
                <>
                  <p className="text-amber-800 font-bold mb-1">🎯 여울이의 꿈의 복숭아 상자!</p>
                  <p>바구니 이름 변수를 <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono">dream_box</code>로 바꾼 다음, 복숭아와 지지율을 담은 뒤 주인(소유자)을 <code className="bg-amber-100 text-amber-900 px-1 rounded">여울이</code>로 변경해 실행하라구리!</p>
                </>
              )}
            </div>

            {/* cleared message */}
            {missionCleared[activeMission] && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 bg-emerald-500 text-stone-950 p-2 text-center text-xs font-display rounded-full border-2 border-emerald-300 flex items-center justify-center gap-1"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                퀘스트 미션 클리어 성공구리!! 🍃🎉
              </motion.div>
            )}
          </div>

          {/* Visual Container representing our "Variable memory box" */}
          <div className="bg-white/95 border-4 border-amber-700 rounded-3xl p-5 shadow-md flex-1 flex flex-col justify-between relative overflow-hidden" id="visual-basket-display">
            
            {/* Soft decorative cloud backgrounds */}
            <div className="absolute top-4 left-6 text-stone-100 text-3xl font-bold font-sans pointer-events-none uppercase">MEM-BOX</div>
            
            {/* Variable Sign-Post label board */}
            <div className="text-center relative z-10">
              <span className="text-[10px] font-bold text-stone-400 tracking-wider block uppercase mb-1">COMPUTER BASKET RAM</span>
              <div className="inline-block bg-amber-700 text-amber-50 border-2 border-amber-600 rounded-2xl px-4 py-1.5 shadow font-mono font-bold text-sm tracking-wide transform -rotate-1">
                🧺 변수 이름(Name): <span className="text-yellow-300 font-black">{basketName}</span>
              </div>
            </div>

            {/* Interactive cartoon wood basket rendering inside RAM */}
            <div className="my-6 flex-1 flex flex-col justify-center items-center relative min-h-[160px]">
              
              {/* Wooden Table Shelf board */}
              <div className="absolute bottom-3 w-4/5 h-3 bg-amber-200 border-b-2 border-amber-400 rounded-full z-0"></div>

              {/* Cute fruits inside the basket container */}
              <div className="w-48 h-32 relative z-20 flex flex-wrap items-center justify-center content-end p-2 pb-6 gap-2">
                <AnimatePresence>
                  {Array.from({ length: fruitCount }).map((_, index) => (
                    <motion.div
                      key={`${fruitType}-${index}`}
                      initial={{ scale: 0, y: -80, rotate: index * 12 }}
                      animate={{ scale: 1, y: 0, rotate: index * 5 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 120, delay: index * 0.04 }}
                      className="text-4xl filter drop-shadow hover:scale-125 transition-transform cursor-pointer"
                      title={getKoreanFruitName(fruitType)}
                    >
                      {fruitType === "apple" && "🍎"}
                      {fruitType === "peach" && "🍑"}
                      {fruitType === "cherry" && "🍒"}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Empty status message */}
                {fruitCount === 0 && (
                  <div className="text-center text-xs text-stone-400 font-bold py-8">
                    바구니가 텅 비었어요 <br /> 바구니 정보를 담아주세요 💨
                  </div>
                )}
              </div>

              {/* Physical front cart representing variable enclosure */}
              <div className="w-52 h-14 bg-amber-500 border-4 border-amber-700/85 rounded-b-3xl rounded-t-lg shadow-md absolute bottom-0 z-30 flex items-center justify-center">
                <div className="bg-amber-100 px-3 py-1 border-2 border-amber-600 rounded-lg text-[11px] font-black text-amber-800 font-sans tracking-tight">
                  소유자: <span className="text-stone-950 font-bold">{ownerName}</span>
                </div>
              </div>
            </div>

            {/* Footnote summary describing state */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 text-stone-700 text-xs relative z-10">
              <div className="text-[10px] font-bold text-amber-700/60 uppercase mb-0.5">CURRENT VARIABLE DECLARATION CODE</div>
              <div className="font-mono text-[11px] bg-stone-900 text-yellow-300 p-2.5 rounded-xl border border-stone-800 leading-relaxed font-bold">
                <span className="text-emerald-400">{basketName}</span> = <span className="text-yellow-100">"{getKoreanFruitName(fruitType).split(" ")[0]}"</span><br />
                <span className="text-emerald-400">{basketName}_갯수</span> = <span className="text-purple-300">{fruitCount}</span><br />
                <span className="text-emerald-400">{basketName}_주인</span> = <span className="text-yellow-100">"{ownerName}"</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
