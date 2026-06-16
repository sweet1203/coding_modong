import { Villager } from "./types";

export const VILLAGERS_DATA: Villager[] = [
  {
    id: "1",
    name: "여울이",
    type: "강아지",
    hobby: "꽃 가꾸기",
    favoriteFruit: "복숭아",
    catchphrase: "오늘도 힘차게 가볼까요? 🐶",
    personality: "친절함"
  },
  {
    id: "2",
    name: "너굴",
    type: "너구리",
    hobby: "무 주식 거래",
    favoriteFruit: "사과",
    catchphrase: "도전은 늘 즐거운 법이구리! 🍃",
    personality: "사업가"
  },
  {
    id: "3",
    name: "부엉",
    type: "부엉이",
    hobby: "화석 발굴",
    favoriteFruit: "체리",
    catchphrase: "조금 무섭지만 곤충도 연구해요! 🦉",
    personality: "학구적"
  },
  {
    id: "4",
    name: "쭈니",
    type: "다람쥐",
    hobby: "노래하기",
    favoriteFruit: "복숭아",
    catchphrase: "어차피 우린 다 귀여울 테니까요 🐿️",
    personality: "도도함"
  },
  {
    id: "5",
    name: "잭슨",
    type: "고양이",
    hobby: "차 마시기",
    favoriteFruit: "오렌지",
    catchphrase: "품격 있게 코딩 한 잔 어때요? 🐱",
    personality: "차분함"
  },
  {
    id: "6",
    name: "사이다",
    type: "고양이",
    hobby: "낚시",
    favoriteFruit: "배",
    catchphrase: "호라, 물고기가 잡힐 것 같아요! 🐟",
    personality: "아이돌"
  },
  {
    id: "7",
    name: "봉추",
    type: "아기곰",
    hobby: "운동하기",
    favoriteFruit: "사과",
    catchphrase: "오늘도 이두근 코딩 단련이다! 🐻",
    personality: "활발함"
  },
  {
    id: "8",
    name: "탁호",
    type: "문어",
    hobby: "요리하기",
    favoriteFruit: "체리",
    catchphrase: "배고프다... 맛난 거 먹자구리! 🐙",
    personality: "단순함"
  },
  {
    id: "9",
    name: "비앙카",
    type: "늑대",
    hobby: "곤충 채집",
    favoriteFruit: "오렌지",
    catchphrase: "나비 한 마리도 예술로 수집해요 🐺",
    personality: "성숙함"
  },
  {
    id: "10",
    name: "크리스틴",
    type: "토끼",
    hobby: "댄스하기",
    favoriteFruit: "복숭아",
    catchphrase: "무대 위에서 늘 빛나는 법이죠! 🐰",
    personality: "명랑함"
  }
];

export const AVATAR_COLORS: Record<string, string> = {
  "여울이": "bg-yellow-100 border-yellow-400 text-yellow-700",
  "너굴": "bg-emerald-100 border-emerald-400 text-emerald-700",
  "부엉": "bg-amber-100 border-amber-400 text-amber-700",
  "쭈니": "bg-slate-100 border-slate-400 text-slate-700",
  "잭슨": "bg-blue-100 border-blue-400 text-blue-700",
  "사이다": "bg-cyan-100 border-cyan-400 text-cyan-700",
  "봉추": "bg-orange-100 border-orange-400 text-orange-700",
  "탁호": "bg-red-100 border-red-400 text-red-700",
  "비앙카": "bg-indigo-100 border-indigo-400 text-indigo-700",
  "크리스틴": "bg-pink-100 border-pink-400 text-pink-700",
};

export const AVATAR_EMOJIS: Record<string, string> = {
  "여울이": "🐶",
  "너굴": "🍃",
  "부엉": "🦉",
  "쭈니": "🐿️",
  "잭슨": "👓",
  "사이다": "🐱",
  "봉추": "🐻",
  "탁호": "🐙",
  "비앙카": "🐺",
  "크리스틴": "🐰"
};
