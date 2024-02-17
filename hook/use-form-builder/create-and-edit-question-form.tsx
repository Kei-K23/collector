import React, { useState } from "react";
import { handleQuestionRequest } from "./handle-request";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QueryClient } from "@tanstack/react-query";
import { Question, QuestionOptionArray, QuestionType } from "@/type";
import EditQuestionOption from "./edit-question-option";
import { defaultQuestionFormat } from "./default-form";
import SelectQuestionType from "./select-question-type";

interface CreateAndEditQuestionFormProps {
  userId: string;
  formId: string;
  editingQuestionOption: number;
  setEditingQuestionOption: (editingQuestionOption: number | undefined) => void;
  editingQuestion: Question;
  setEditingQuestion: (question: Question | null) => void;
  queryClient: QueryClient;
  formRef: React.MutableRefObject<HTMLFormElement | null>;
}

const CreateAndEditQuestionForm = ({
  userId,
  formId,
  editingQuestion,
  setEditingQuestion,
  queryClient,
  formRef,
  setEditingQuestionOption,
  editingQuestionOption,
}: CreateAndEditQuestionFormProps) => {
  const [questionOptions, setQuestionOptions] = useState<QuestionOptionArray>(
    editingQuestion.questionOption ?? []
  );

  // form input onchange handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!editingQuestion) return;
    setEditingQuestion({ ...editingQuestion, [name]: value });
  };

  return (
    <form
      onSubmit={(e) =>
        handleQuestionRequest({
          e,
          editingQuestion,
          setEditingQuestion,
          userId: userId,
          formId: formId,
          queryClient,
          questionOption: questionOptions,
        })
      }
      ref={formRef}
      className="space-y-8"
    >
      <Input
        placeholder="e.g. multi selection"
        value={editingQuestion.text}
        name="text"
        onChange={handleChange}
      />

      <Input
        placeholder="e.g. some description"
        value={editingQuestion.description!}
        name="description"
        onChange={handleChange}
      />

      {editingQuestion.type === QuestionType["DROPDOWN"] &&
        questionOptions.length > 0 && (
          <>
            <EditQuestionOption
              questionOptions={questionOptions}
              editingQuestionOption={editingQuestionOption}
              setEditingQuestionOption={setEditingQuestionOption}
              setQuestionOptions={setQuestionOptions}
            />
          </>
        )}

      <SelectQuestionType
        setQuestionOptions={setQuestionOptions}
        setEditingQuestion={setEditingQuestion}
        editingQuestion={editingQuestion}
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default CreateAndEditQuestionForm;
