export interface Circle {
  _id: string;
  logo: string;
  name: string;
  slogun: string;
  category: string;
  introducing: string;
  history: string;
  award: string;
  video: string;
  instagram: string;
  website: string;
}

export type SubmitStatusType =
  | "SUBMIT"
  | "FIRST"
  | "FIRSTREJECT"
  | "SECOND"
  | "SECONDREJECT"
  | "FINAL";
export const submitStatusString = {
  SUBMIT: "서류 제출",
  FIRST: "서류 합격",
  FIRSTREJECT: "서류 불합격",
  SECOND: "최종 합격",
  SECONDREJECT: "면접 불합격",
  FINAL: "최종 선택",
};
export interface Submit {
  _id: string;
  circle: string;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  status: SubmitStatusType;
}