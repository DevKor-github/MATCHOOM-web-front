import { z } from 'zod';

export const creatorInfoSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  fileId: z.number().min(1, '썸네일을 선택해주세요'),
});

export const lectureEssentialInfoSchema = z
  .object({
    lectureTime: z
      .array(
        z.object({
          start: z.date(),
          end: z.date(),
        }),
      )
      .min(1, '강의 시간을 최소 1개 이상 입력해주세요'),
    room: z.string().min(1, '방을 입력해주세요'),
    price: z.number().min(1, '가격을 입력해주세요'),
    type: z.string(),
  })
  .refine((data) => data.lectureTime.every((time) => time.start < time.end), {
    path: ['lectureTime'],
    message: '강의 시작 시간이 종료 시간보다 빠를 수 없습니다.',
  });

export const lectureOptionalInfoSchema = z.object({
  difficulty: z.number().optional(),
  genre: z.number().optional(),
  description: z.string().max(500, '강의소개는 최대 500자입니다.').optional(),
  musicLink: z.string().optional(),
});

const baseReservationSchema = z.object({
  minCapacity: z.number().min(1, '최소 수강 인원을 입력해주세요'),
  maxCapacity: z.number().min(1, '최대 수강 인원을 입력해주세요'),
  applyTime: z.object({
    start: z
      .object({ diff: z.number(), time: z.string() })
      .strict('예약 시작 시간을 입력해주세요'),
    end: z
      .object({ diff: z.number(), time: z.string() })
      .strict('예약 종료 시간을 입력해주세요'),
  }),
});

export const reservationSchema = baseReservationSchema.refine(
  (data) => data.applyTime.start.diff !== data.applyTime.end.diff,
  {
    path: ['applyTime'],
    message: '신청 시작 시간이 종료 시간보다 빠를 수 없습니다.',
  },
);

export const TabType: { [key: number]: string } = {
  0: 'creatorInfo',
  1: 'lectureEssentialInfo',
  2: 'lectureOptionalInfo',
  3: 'reservation',
} as const;

export type TabTypeValues = (typeof TabType)[number];

export type CreatorInfoType = z.infer<typeof creatorInfoSchema>;
export type LectureEssentialInfoType = z.infer<
  typeof lectureEssentialInfoSchema
>;
export type LectureOptionalInfoType = z.infer<typeof lectureOptionalInfoSchema>;
export type ReservationType = z.infer<typeof reservationSchema>;

export type AddClassFormType = CreatorInfoType &
  LectureEssentialInfoType &
  Partial<LectureOptionalInfoType> &
  Partial<ReservationType>;

export const addClassSchema = z
  .object({
    name: creatorInfoSchema.shape.name,
    fileId: creatorInfoSchema.shape.fileId,
    lectureTime: z
      .array(
        z.object({
          start: z.date(),
          end: z.date(),
        }),
      )
      .min(1, '강의 시간을 최소 1개 이상 입력해주세요'),
    room: z.string().min(1, '방을 입력해주세요'),
    price: z.number().min(1, '가격을 입력해주세요'),
    type: z.string(),
    difficulty: lectureOptionalInfoSchema.shape.difficulty,
    genre: lectureOptionalInfoSchema.shape.genre,
    description: lectureOptionalInfoSchema.shape.description,
    musicLink: lectureOptionalInfoSchema.shape.musicLink,
    minCapacity: baseReservationSchema.shape.minCapacity,
    maxCapacity: baseReservationSchema.shape.maxCapacity,
    applyTime: baseReservationSchema.shape.applyTime,
  })
  .strict();
