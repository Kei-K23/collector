export interface FormData {
  createdAt: Date;
  description: string;
  id: string;
  title: string;
  updatedAt: Date;
  userId: string;
}

export interface DetailFormData {
  data: {
    id: string;
    title: string;
    description?: string;
  };
}

export enum QuestionType {
  "SHORT_ANSWER" = "SHORT_ANSWER",
  "PARAGRAPH" = "PARAGRAPH",
  "MULTIPLE_CHOICE" = "MULTIPLE_CHOICE",
  "CHECKBOXES" = "CHECKBOXES",
  "DROPDOWN" = "DROPDOWN",
}
