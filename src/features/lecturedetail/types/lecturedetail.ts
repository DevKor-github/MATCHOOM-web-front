export type LectureTime = {
  start: string;
  end: string;
};

export type LectureDetailResponse = {
  id: number; // 강의 ID
  name: string; // 강의 이름
  instructor: string; // 강사 이름
  type: string; // 강의 유형
  maxCapacity: number; // 최대 수용 인원
  minCapacity: number; // 최소 수용 인원
  applyStart: string; // 신청 시작 시간
  applyEnd: string; // 신청 종료 시간
  room: string; // 강의실
  difficulty: number; // 난이도
  genre: number; // 장르
  description: string | null; // 강의 설명
  price: number; // 가격
};
