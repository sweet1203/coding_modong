import { useState } from "react";
import { motion } from "motion/react";
import { Leaf, GraduationCap, Github } from "lucide-react";
import { LearningDistrict } from "./types";
import Introduction from "./components/Introduction";
import ProgrammingBasket from "./components/ProgrammingBasket";
import DataAnalysisOwl from "./components/DataAnalysisOwl";
import AiClassifierFossil from "./components/AiClassifierFossil";
import IsabelleChat from "./components/IsabelleChat";

export default function App() {
  const [activeDistrict, setActiveDistrict] = useState<LearningDistrict>(LearningDistrict.INTRO);

  const getDistrictTitle = () => {
    switch (activeDistrict) {
      case LearningDistrict.PROGRAMMING:
        return "1단원 구역: 너굴이의 프로그래밍 바구니 🧺";
      case LearningDistrict.DATA_ANALYSIS:
        return "2단원 구역: 부엉이의 주민 취향 통계 분석관 🦉";
      case LearningDistrict.AI_CLASSIFY:
        return "3단원 구역: 마스터의 스마트 화석 감별사 로봇 ⚙️";
      case LearningDistrict.CHAT_TUTOR:
        return "4단원 구역: 여울이의 일대일 코딩 비밀 상담소 🐶";
      default:
        return "정보 주민의 배움숲 광장";
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f9f1] bg-radial from-[#edf6eb] to-[#e4f0e2] text-stone-800 pb-12 flex flex-col justify-between selection:bg-amber-250 selection:text-amber-950">
      
      {/* Top Cute Town Header */}
      <header className="bg-white/80 backdrop-blur border-b-4 border-[#cbdcc6] py-3.5 px-4 md:px-6 sticky top-0 z-50 shadow-sm shrink-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          
          {/* Logo sign */}
          <div 
            onClick={() => setActiveDistrict(LearningDistrict.INTRO)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center border-2 border-emerald-600 shadow group-hover:rotate-12 transition-transform duration-300">
              <Leaf className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h2 className="font-display text-emerald-900 text-lg tracking-wide leading-none flex items-center gap-1">
                코딩 주민의 배움 숲
              </h2>
              <span className="text-[10px] text-stone-400 font-sans font-bold flex items-center gap-0.5">
                <GraduationCap className="w-3 h-3 text-emerald-500" />
                고등학교 정보 교과 가이드학습 놀이터
              </span>
            </div>
          </div>

          {/* Current town status indicator */}
          <div className="hidden sm:flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/60 px-3.5 py-1.5 rounded-full shadow-inner">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="text-[11px] font-sans font-black text-emerald-800">
              {getDistrictTitle()}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container Stage (Animated content swap) */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 flex flex-col justify-start">
        <div className="flex-1 w-full relative">
          
          {/* Introduction block */}
          {activeDistrict === LearningDistrict.INTRO && (
            <Introduction onSelectDistrict={setActiveDistrict} />
          )}

          {/* Variable chapter district */}
          {activeDistrict === LearningDistrict.PROGRAMMING && (
            <ProgrammingBasket onBack={() => setActiveDistrict(LearningDistrict.INTRO)} />
          )}

          {/* Data Analysis district */}
          {activeDistrict === LearningDistrict.DATA_ANALYSIS && (
            <DataAnalysisOwl onBack={() => setActiveDistrict(LearningDistrict.INTRO)} />
          )}

          {/* AI Classifier district */}
          {activeDistrict === LearningDistrict.AI_CLASSIFY && (
            <AiClassifierFossil onBack={() => setActiveDistrict(LearningDistrict.INTRO)} />
          )}

          {/* Isabelle Chat Tutor District */}
          {activeDistrict === LearningDistrict.CHAT_TUTOR && (
            <IsabelleChat onBack={() => setActiveDistrict(LearningDistrict.INTRO)} />
          )}

        </div>
      </main>

      {/* Cozy layout grass-themed Footer */}
      <footer className="text-center py-6 shrink-0 mt-8 border-t-2 border-[#d9ecd5]/40 text-stone-400/90 font-sans flex flex-col gap-1 items-center">
        <div className="flex items-center gap-1.5 justify-center mb-0.5">
          <Leaf className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
          <span className="text-xs font-bold text-stone-500">
            🌳 코딩 주민의 배움 숲 — 정보 교과서가 가장 즐거워용!
          </span>
        </div>
        <p className="text-[10px] uppercase font-sans tracking-widest font-extrabold text-stone-400/70">
          Created for High School Informatics Teachers & Students • 2026 Sandbox Town
        </p>
      </footer>
    </div>
  );
}
