import { motion } from "motion/react";
import { Leaf, Code, BarChart3, BrainCircuit, MessageSquare, ArrowRight } from "lucide-react";
import { LearningDistrict } from "../types";

interface IntroductionProps {
  onSelectDistrict: (district: LearningDistrict) => void;
}

export default function Introduction({ onSelectDistrict }: IntroductionProps) {
  const districts = [
    {
      id: LearningDistrict.PROGRAMMING,
      title: "1단원: 프로그래밍",
      subtitle: "너굴이의 변수 과일 바구니",
      descr: "컴퓨터 속 똑똑한 사자고지! 이름을 적어둔 바구니에 과일을 담고 바꾸면서 변수(Variable)의 원리를 깨달아요.",
      icon: Code,
      color: "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100",
      iconColor: "text-emerald-600 bg-emerald-100",
      badge: "초집중!",
      guideName: "너굴 🍃",
      guideDescr: "바구니에 담긴 사과 개수를 함께 마음대로 늘려보고 주물럭거려보는구리!"
    },
    {
      id: LearningDistrict.DATA_ANALYSIS,
      title: "2단원: 데이터 분석",
      subtitle: "부엉이의 주민 취향 통계조사",
      descr: "우리의 이웃 주민들이 좋아하는 과일과 취미 데이터를 필터링하고, 그래프로 그려서 진짜 데이터 분석을 시작해봐요.",
      icon: BarChart3,
      color: "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100",
      iconColor: "text-amber-600 bg-amber-100",
      badge: "가장 쉬움!",
      guideName: "부엉 🦉",
      guideDescr: "박물관 이웃들의 복잡한 취미 생활 데이터를 일사불란하게 정리해봅시다오!"
    },
    {
      id: LearningDistrict.AI_CLASSIFY,
      title: "3단원: 인공지능",
      subtitle: "깨비의 스마트 화석 감별사",
      descr: "진짜 화석과 일반 돌멩이를 여러 번 훈련시켜서, 컴퓨터 스스로 정답을 찾아내는 분류(Classification) AI를 만들어요.",
      icon: BrainCircuit,
      color: "bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100",
      iconColor: "text-teal-600 bg-teal-100",
      badge: "신기방기!",
      guideName: "깨비 👻",
      guideDescr: "돌멩이인지 반짝 화석인지 AI 기계에 가르쳐줘서 똑똑하게 감별해줘요!"
    },
    {
      id: LearningDistrict.CHAT_TUTOR,
      title: "4단원: 인공지능 실습",
      subtitle: "여울이의 비밀 코딩 상담소",
      descr: "언제나 여러분을 열렬히 응원하는 여울이와 따뜻하게 수다 떨며 어려운 질문들을 쉽고 다정하게 하나씩 물어보세요.",
      icon: MessageSquare,
      color: "bg-yellow-50 border-yellow-200 text-yellow-800 hover:bg-yellow-100",
      iconColor: "text-yellow-600 bg-yellow-100",
      badge: "고급 스마트!",
      guideName: "여울이 🐶",
      guideDescr: "어려운 컴퓨터 개념, 부끄러워 말고 제게 물어보세요! 친절하게 다 알려드릴게요."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 select-none" id="intro-container">
      {/* Town Welcome Signboard */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-amber-100/90 border-4 border-amber-700/80 rounded-3xl p-6 md:p-8 shadow-xl text-center mb-8 max-w-2xl mx-auto"
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-700 text-amber-50 px-4 py-1.5 rounded-full text-sm font-display tracking-wider border-2 border-amber-100 shadow flex items-center gap-1">
          <Leaf className="w-4 h-4 text-emerald-300 fill-emerald-300 animate-pulse" />
          KOREA HIGH SCHOOL INFORMATICS
        </div>

        <h1 className="text-3xl md:text-4xl font-display text-amber-900 mt-2 mb-3 tracking-wide">
          🌳 코딩 주민의 정보 배움숲
        </h1>
        <p className="text-sm md:text-base font-sans text-amber-800/90 leading-relaxed font-medium">
          컴퓨터를 잘 몰라도 괜찮아요! 사랑스러운 우리 이웃 주민들과 함께 사과 따기처럼 쉽고 재미있는 정보 수업 속으로 모험을 떠나볼까요? 🐶🌾
        </p>
      </motion.div>

      {/* Main Bell Welcome Dialog Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white/90 border-4 border-amber-500 rounded-3xl p-5 md:p-6 shadow-md mb-8 flex flex-col md:flex-row items-center gap-4 relative max-w-3xl mx-auto"
      >
        <div className="w-20 h-20 bg-yellow-100 border-2 border-yellow-400 rounded-full flex items-center justify-center text-4xl shadow-inner shrink-0 animate-bounce">
          🐶
        </div>
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block bg-amber-500 text-amber-50 text-xs px-2 py-0.5 rounded-full font-display mb-1.5 shadow-sm">
            마을 대표 여울이
          </span>
          <p className="text-amber-900 font-sans text-sm md:text-base font-bold leading-relaxed">
            "안녕하세요 선생님, 그리고 코딩 꿈나무 학생 여러분! 이 숲에서는 프로그래밍이 하나도 지루하지 않아요. 아래 네 개의 단원 구역 중 탐험하기를 원하는 구역을 꾹 눌러주세요! 🐾"
          </p>
        </div>
      </motion.div>

      {/* Bento-like Classroom Districts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {districts.map((d, index) => {
          const Icon = d.icon;
          return (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.08, type: "spring", stiffness: 100 }}
              onClick={() => onSelectDistrict(d.id)}
              className={`cursor-pointer rounded-3xl border-4 p-5 shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative flex flex-col justify-between ${d.color}`}
              id={`district-card-${d.id}`}
            >
              <div className="absolute right-4 top-4 bg-amber-500/10 text-amber-700 text-[10px] font-display px-2 py-0.5 rounded-full border border-amber-500/20 shadow-sm">
                {d.badge}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-2 rounded-2xl ${d.iconColor} shadow-inner`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-amber-800/60 font-sans uppercase tracking-wider">{d.title}</div>
                    <h3 className="text-lg font-display text-amber-950">{d.subtitle}</h3>
                  </div>
                </div>

                <p className="text-xs md:text-sm font-medium text-stone-700/95 leading-relaxed mt-1">
                  {d.descr}
                </p>
              </div>

              {/* Character Coach Footnote */}
              <div className="mt-4 pt-3 border-t border-dashed border-stone-300 flex items-center gap-2.5">
                <span className="text-xs bg-white border border-stone-300 rounded-full px-2 py-0.5 font-display text-stone-800 shadow-sm shrink-0">
                  {d.guideName}
                </span>
                <span className="text-[11px] text-stone-600 font-cozy font-medium italic overflow-hidden text-ellipsis whitespace-nowrap">
                  "{d.guideDescr}"
                </span>
              </div>

              <div className="absolute bottom-2.5 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-stone-700" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Classroom Setup Tips (Teacher helper) */}
      <div className="text-center">
        <p className="text-stone-500 text-[11px] font-sans font-medium">
          💡 **선생님 팁**: 각 단원은 학습 후 교재 대용 또는 모둠 활동으로 진행하면 아주 효과적이에요! 수다떨기 챗봇은 학생 한두 명씩 돌아가며 질문을 주고받는데 유용하답니다 🍃
        </p>
      </div>
    </div>
  );
}
