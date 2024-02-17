import { QuestionType } from "@/type";

export const defaultQuestionFormat = {
  shortAnswerQuestion: {
    text: "Untitled Question",
    description: "short answer text",
    type: QuestionType["SHORT_ANSWER"],
    formId: "",
    order: 0,
  },
  paragraphQuestion: {
    text: "Untitled Question",
    description: "long answer text",
    type: QuestionType["PARAGRAPH"],
    formId: "",
    order: 0,
  },
  dropdownQuestion: {
    text: "Untitled Question",
    description: "dropdown text",
  },
  multipleChoicesQuestion: {
    text: "Untitled Question",
    description: "multiple choices text",
  },
  checkboxesQuestion: {
    text: "Untitled Question",
    description: "checkboxes text",
  },
};

export const questionType = [
  "SHORT_ANSWER",
  "PARAGRAPH",
  "MULTIPLE_CHOICE",
  "CHECKBOXES",
  "DROPDOWN",
];
