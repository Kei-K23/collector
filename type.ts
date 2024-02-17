export interface FormData {
  createdAt: Date;
  description: string;
  id: string;
  title: string;
  updatedAt: Date;
  userId: string;
}

export type QuestionOptionArray = Array<{
  option: string;
  order: number;
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
  }>
>;

export interface DetailFormData {
  data: {
    id: string;
    title: string;
    description?: string;
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
