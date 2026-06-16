export enum LearningDistrict {
  INTRO = "INTRO",
  PROGRAMMING = "PROGRAMMING",
  DATA_ANALYSIS = "DATA_ANALYSIS",
  AI_CLASSIFY = "AI_CLASSIFY",
  CHAT_TUTOR = "CHAT_TUTOR"
}

export interface Villager {
  id: string;
  name: string;
  type: string; // e.g., 토끼, 고양이, 곰, 강아지
  hobby: string; // e.g., 낚시, 곤충 채집, 화석 발굴, 노래하기
  favoriteFruit: "사과" | "복숭아" | "체리" | "오렌지" | "배";
  catchphrase: string;
  personality: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  content: string;
  timestamp: Date;
}
