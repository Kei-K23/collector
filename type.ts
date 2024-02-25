export interface FormData {
  createdAt: Date;
  description: string;
  id: string;
  title: string;
  updatedAt: Date;
  userId: string;
}

export type AnswerOptionArray = Array<{
  answerId: string;
  createdAt: string;
  questionOptionId: string;
  id: string;
  updatedAt: string;
}>;

export type QuestionOptionArray = Array<{
  id?: string;
  option: string;
  order: number;
  answerOption: AnswerOptionArray;
}>;

export type Question = {
  createdAt?: Date | undefined;
  description?: string | null | undefined;
  formId?: string | undefined;
  id?: string | undefined;
  order?: number | undefined;
  questionOption?: QuestionOptionArray;
  text?: string | undefined;
  type?: QuestionType | undefined;
  updatedAt?: Date | undefined;
};

export type AnswerArray = Array<{
  questionId: string;
  responseId: string;
  id: string;
  text?: string;
  answerOption?: Array<{
    questionOptionId: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}>;

export type QuestionArray = Array<
  Partial<{
    createdAt: Date;
    description?: string | null;
    formId: string;
    id: string;
    order: number;
    questionOption?: QuestionOptionArray;
    text: string;
    type: QuestionType;
    updatedAt: Date;
    answer: AnswerArray;
  }>
>;

export interface DetailFormData {
  data: {
    id: string;
    title: string;
    description?: string;
    userId?: string;
    question?: QuestionArray;
  };
}

export enum QuestionType {
  "SHORT_ANSWER" = "SHORT_ANSWER",
  "PARAGRAPH" = "PARAGRAPH",
  "MULTIPLE_CHOICE" = "MULTIPLE_CHOICE",
  "CHECKBOXES" = "CHECKBOXES",
  "DROPDOWN" = "DROPDOWN",
}
