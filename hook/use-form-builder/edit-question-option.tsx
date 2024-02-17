import { Input } from "@/components/ui/input";
import { Question, QuestionOptionArray, QuestionType } from "@/type";
import { Circle, PlusCircle, Square } from "lucide-react";
import React, { ChangeEvent, KeyboardEvent } from "react";
import DeleteQuestionOption from "./delete-question-option";
import { useParams } from "next/navigation";

type Option = {
  option: string;
  order: number;
};
interface EditQuestionOptionProps {
  question: Question;
  setEditingQuestionOption: (editingQuestionOption: number | undefined) => void;
  setQuestionOptions: React.Dispatch<React.SetStateAction<QuestionOptionArray>>;
  editingQuestionOption: number;
  questionOptions: QuestionOptionArray;
  type: QuestionType;
}

const EditQuestionOption = ({
  setEditingQuestionOption,
  editingQuestionOption,
  setQuestionOptions,
  questionOptions,
  type,
  question,
}: EditQuestionOptionProps) => {
  const { formId } = useParams();
  // add question option
  function incrementQuestionOption() {
    const prevLength = questionOptions.length;
    setQuestionOptions([
      ...questionOptions,
      {
        option: `Option ${prevLength + 1}`,
        order: prevLength + 1,
      },
    ]);
  }

  // when enter key is pressed, edit question option
  function onKeyDown(event: KeyboardEvent, index: number, option: Option) {
    if (event.key === "Enter") {
      setEditingQuestionOption(undefined);
      const updatedOptions = questionOptions.map((o, i) =>
        i === index ? { ...o, option: option.option } : o
      );
      setQuestionOptions(updatedOptions);
    }
  }

  // on change
  function onChange(
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    option: Option
  ) {
    setQuestionOptions((prevOptions: { option: string; order: number }[]) => {
      const newOptions = [...prevOptions];
      newOptions[index] = {
        ...option,
        option: e.target.value,
      };
      return newOptions;
    });
  }

  return (
    <>
      <ul className="space-y-2">
        {questionOptions.map((option, index) => {
          if (editingQuestionOption === index) {
            return (
              <Input
                key={index}
                value={option.option}
                defaultValue={option.option}
                onKeyDown={(e) => onKeyDown(e, index, option)}
                onChange={(e) => onChange(e, index, option)}
              />
            );
          } else {
            if (type === QuestionType["DROPDOWN"]) {
              return (
                <li
                  className="cursor-pointer hover:underline"
                  key={option.order}
                  onClick={() => setEditingQuestionOption(index)}
                >
                  <p>
                    {`${index + 1}.`} {option.option}
                  </p>
                </li>
              );
            } else if (type === QuestionType["CHECKBOXES"]) {
              return (
                <li
                  key={option.order}
                  className="flex items-center justify-between gap-2 cursor-pointer hover:underline "
                  onClick={() => setEditingQuestionOption(index)}
                >
                  <p className="flex items-center gap-2">
                    <Square className="w-4 h-4 text-muted-foreground" />{" "}
                    {option.option}
                  </p>
                  {questionOptions.length > 1 && (
                    <DeleteQuestionOption
                      formId={`${formId}`}
                      questionOptions={questionOptions}
                      questionOptionId={option.id!}
                      question={question}
                    />
                  )}
                </li>
              );
            } else if (type === QuestionType["MULTIPLE_CHOICE"]) {
              return (
                <li
                  key={option.order}
                  className="flex items-center gap-2 cursor-pointer hover:underline"
                  onClick={() => setEditingQuestionOption(index)}
                >
                  <p>
                    <Circle className="w-4 h-4 text-muted-foreground" />{" "}
                    {option.option}
                  </p>
                </li>
              );
            }
          }
        })}
        <li
          role="button"
          className=" text-muted-foreground flex items-center gap-2 "
          onClick={() => incrementQuestionOption()}
        >
          <PlusCircle className="w-4 h-4" /> add option
        </li>
      </ul>
    </>
  );
};

export default EditQuestionOption;
