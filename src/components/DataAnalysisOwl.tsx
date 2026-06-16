import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Filter, BookOpen, Star, RefreshCw, BarChart2 } from "lucide-react";
import { VILLAGERS_DATA, AVATAR_COLORS, AVATAR_EMOJIS } from "../data";
import { Villager } from "../types";

interface DataAnalysisOwlProps {
  onBack: () => void;
}

export default function DataAnalysisOwl({ onBack }: DataAnalysisOwlProps) {
  // Filters state
  const [hobbyFilter, setHobbyFilter] = useState<string>("ALL");
  const [fruitFilter, setFruitFilter] = useState<string>("ALL");
  const [highlightedGroup, setHighlightedGroup] = useState<string | null>(null);

  // Get list of all unique hobbies and fruits for drop-down filters
  const uniqueHobbies = useMemo(() => {
    const list = VILLAGERS_DATA.map((v) => v.hobby);
    return ["ALL", ...Array.from(new Set(list))];
  }, []);

  const uniqueFruits = useMemo(() => {
    const list = VILLAGERS_DATA.map((v) => v.favoriteFruit);
    return ["ALL", ...Array.from(new Set(list))];
  }, []);

  // Filtered dataset
  const filteredVillagers = useMemo(() => {
    return VILLAGERS_DATA.filter((v) => {
      const matchHobby = hobbyFilter === "ALL" || v.hobby === hobbyFilter;
      const matchFruit = fruitFilter === "ALL" || v.favoriteFruit === fruitFilter;
      return matchHobby && matchFruit;
    });
  }, [hobbyFilter, fruitFilter]);

  // Aggregate statistics for the chart based on favorite fruits!
  // It should show counts of: 사과, 복숭아, 체리, 오렌지, 배
  const fruitChartData = useMemo(() => {
    const counts: Record<string, number> = {
      "사과": 0,
      "복숭아": 0,
      "체리": 0,
      "오렌지": 0,
      "배": 0
    };

    // Count currently filtered subset, or all if we want constant comparison
    filteredVillagers.forEach((v) => {
      if (counts[v.favoriteFruit] !== undefined) {
        counts[v.favoriteFruit]++;
      }
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      emoji: name === "사과" ? "🍎" : name === "복숭아" ? "🍑" : name === "체리" ? "🍒" : name === "오렌지" ? "🍊" : "🍐",
      color: name === "사과" ? "bg-red-400" : name === "복숭아" ? "bg-pink-300" : name === "체리" ? "bg-rose-500" : name === "오렌지" ? "bg-amber-400" : "bg-emerald-400"
    }));
  }, [filteredVillagers]);

  // Reset filters
  const resetFilters = () => {
    setHobbyFilter("ALL");
    setFruitFilter("ALL");
    setHighlightedGroup(null);
  };

  return (
    <div className="max-w-5xl mx-auto py-3 px-2 font-sans select-none" id="data-analysis-district">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-amber-50 text-sm font-display rounded-full shadow border-2 border-amber-300 transform active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
          마을 광장으로 돌아가기
        </button>
        <span className="bg-amber-100 border-2 border-amber-400 text-amber-800 text-xs font-display px-3 py-1 rounded-full shadow-sm">
          🦉 2단원: 데이터 수집과 시각화
        </span>
      </div>

      {/* Main Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Dialog & Filters (4 cols) */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-4">
          
          {/* Owl Dialog Box */}
          <div className="bg-white/95 border-4 border-amber-700/80 rounded-3xl p-4 shadow-sm flex flex-col gap-3 relative">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-amber-100 border border-amber-400 rounded-full flex items-center justify-center text-3xl shadow-inner shrink-0 relative">
                🦉
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">MUSEUM CURATOR</span>
                <h4 className="font-display text-stone-900 text-base">부엉이 박사님 🦉</h4>
              </div>
            </div>
            
            <p className="text-xs md:text-sm text-stone-700 leading-relaxed font-semibold">
              "박물관에서는 고고학 화석 발견뿐만 아니라, **우리 주민들의 행복한 행동 조사**를 끊임없이 한답니다오! 데이터를 한눈에 흐름 있게 가공하는 기술이 바로 <span className="bg-amber-100 text-amber-800 px-1 font-bold rounded">데이터 분석(Data Analysis)</span>이지요! 한번 돋보기를 들고 필터를 눌러서 주민 통계를 탐구해보세요!"
            </p>
          </div>

          {/* Interactive Filters Panel */}
          <div className="bg-amber-50 border-4 border-amber-200 rounded-3xl p-4 shadow-inner flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
              <h4 className="font-display text-amber-900 text-xs flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-amber-700" />
                데이터 돋보기 필터링 조건
              </h4>
              <button
                onClick={resetFilters}
                className="text-[10px] text-amber-700 font-bold hover:underline flex items-center gap-0.5"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                모두 초기화
              </button>
            </div>

            {/* Filter 1: Hobbies */}
            <div>
              <label className="text-[11px] font-bold text-stone-500 uppercase tracking-tight block mb-1">
                🎨 주민들의 여가 생활(취미):
              </label>
              <select
                value={hobbyFilter}
                onChange={(e) => setHobbyFilter(e.target.value)}
                className="w-full bg-white border-2 border-amber-200 text-stone-800 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
              >
                {uniqueHobbies.map((h) => (
                  <option key={h} value={h}>
                    {h === "ALL" ? "🌟 전체 취미 보기" : `✨ ${h}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 2: Favorite Fruits */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight block mb-1">
                🍑 가장 좋아하는 과일:
              </label>
              <select
                value={fruitFilter}
                onChange={(e) => setFruitFilter(e.target.value)}
                className="w-full bg-white border-2 border-amber-200 text-stone-800 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
              >
                {uniqueFruits.map((f) => (
                  <option key={f} value={f}>
                    {f === "ALL" ? "🍓 전체 과일 보기" : `🍎 ${f}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Easy Guide to kids */}
            <div className="bg-white/90 border border-amber-200 rounded-xl p-3 text-[11px] text-stone-600 leading-relaxed font-sans">
              💡 **쉽게 생각하기**: 데이터를 무작정 들여다보면 헷갈리지만, **필터기(Filter)**를 씌우면 원하는 종류만 속속들이 모여서 눈이 번쩍 뜨인답니다오!
            </div>
          </div>
        </div>

        {/* Right Column: Visual Chart Drawing + Table List (8 cols) */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
          
          {/* Animated Custom SVG Chart displaying values */}
          <div className="bg-white border-4 border-amber-700/80 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-amber-100 pb-2">
              <div className="flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-amber-700" />
                <h4 className="font-display text-amber-950 text-base">필터된 주민들의 최애 과일 통계차트 📊</h4>
              </div>
              <span className="text-[11px] text-stone-400 font-mono">Real-time Chart Visualizer</span>
            </div>

            {/* Beautiful SVG Bar Chart */}
            <div className="flex flex-col gap-4 py-2">
              {fruitChartData.map((data, idx) => {
                const maxVal = Math.max(...fruitChartData.map(d => d.value), 1);
                const pct = (data.value / maxVal) * 80; // Bound to max 80% width

                return (
                  <div key={data.name} className="flex items-center gap-3">
                    {/* Fruit label with emoji */}
                    <div className="w-16 text-xs md:text-sm text-stone-700 font-bold flex items-center justify-end gap-1 select-none">
                      <span>{data.emoji}</span>
                      <span>{data.name}</span>
                    </div>

                    {/* Bar housing container */}
                    <div className="flex-1 bg-stone-100 h-6 rounded-full relative overflow-hidden flex items-center">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`h-full ${data.color} rounded-full relative flex items-center justify-end pr-2`}
                      >
                        {/* Shimmer light bar effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                      </motion.div>
                      
                      {/* Floating Count Number indicator */}
                      <span className="absolute left-[calc(var(--percentage)+8px)] pl-2 text-xs font-black text-amber-900 select-none">
                        {data.value}명
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-[10px] text-stone-400 text-center mt-3 tracking-tight">
              ※ 왼쪽 필터를 조절하면 차트의 막대기가 동물 친구들 수에 맞게 실시간으로 춤추듯이 쑥쑥 움직인답니다오!
            </p>
          </div>

          {/* Table List of targeted villagers matching filters */}
          <div className="bg-white border-4 border-amber-700/80 rounded-3xl p-5 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3.5 border-b border-amber-100 pb-2">
                <h4 className="font-display text-stone-900 text-sm">
                  🎯 조건에 맞는 이웃 주민 목록 ({filteredVillagers.length}명 찾음)
                </h4>
                <span className="text-[10px] font-sans font-black bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                  Classroom Database
                </span>
              </div>

              {/* Grid of cute cards layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-1">
                <AnimatePresence mode="popLayout">
                  {filteredVillagers.map((v) => (
                    <motion.div
                      key={v.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="border-2 border-amber-100 rounded-2xl p-3 bg-stone-50 hover:bg-stone-100/50 transition-colors flex items-center gap-3 relative"
                    >
                      {/* Round emoji icon */}
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-2xl shadow-inner ${AVATAR_COLORS[v.name] || "bg-stone-100 border-stone-300"}`}>
                        {AVATAR_EMOJIS[v.name] || "🐹"}
                      </div>

                      {/* Info details */}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-display text-stone-800 text-sm">{v.name}</span>
                          <span className="text-[9px] bg-amber-500/10 border border-amber-500/20 text-amber-700 px-1 rounded font-bold">
                            {v.type}
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-500 font-bold mt-0.5">
                          취미: {v.hobby} | 과일: {v.favoriteFruit}
                        </p>
                        <p className="text-[10px] italic text-amber-800 font-cozy font-black mt-1">
                          "{v.catchphrase}"
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* No villagers status */}
                {filteredVillagers.length === 0 && (
                  <div className="col-span-2 text-center py-10 font-bold text-stone-400 text-sm">
                    앗! 아무도 살지 않는 무인도가 되었어요 💨 <br /> 필터를 다른 것으로 돌려보세요구리!
                  </div>
                )}
              </div>
            </div>

            {/* Mini Quiz challenge footnote */}
            <div className="mt-4 pt-3 border-t border-dashed border-stone-200 text-right">
              <span className="text-[10px] font-sans font-bold text-stone-400">
                ⭐ 모둠 활동 제안: 선생님 지도를 받아 모둠 친구들의 최애 과일도 함께 실시간으로 카운트해보세요!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
