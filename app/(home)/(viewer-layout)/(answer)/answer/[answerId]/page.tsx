"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DetailFormData, Question, QuestionType } from "@/type";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import AnswerBorder from "./_components/answer-border";
import { Button } from "@/components/ui/button";

interface AnswerIdPageProps {
  params: {
    answerId: string;
  };
}

const AnswerIdPage = ({ params }: AnswerIdPageProps) => {
  const { user } = useUser();

  // State variable to hold form data as an array of objects
  const [formDataArray, setFormDataArray] = useState<
    Array<{
      questionId: string;
      text?: string;
      answerOption?: Array<{
        questionOptionId: string;
      }>;
    }>
  >([]);

  // Function to handle changes in form inputs
  // Function to handle changes in form inputs
  const handleInputChange = (
    questionId: string,
    text?: string,
    answerOption?: Array<{
      questionOptionId: string;
    }>
  ) => {
    // Check if the question is already in the formDataArray
    const existingIndex = formDataArray.findIndex(
      (data) => data.questionId === questionId
    );

    if (existingIndex !== -1) {
      // Update the answer if the question exists
      setFormDataArray((prevFormDataArray) => {
        const newDataArray = [...prevFormDataArray];
        newDataArray[existingIndex].text = text;
        newDataArray[existingIndex].answerOption = answerOption;
        return newDataArray;
      });
    } else {
      // Add the new question and its answer to the formDataArray
      setFormDataArray((prevFormDataArray) => [
        ...prevFormDataArray,
        { questionId, text, answerOption },
      ]);
    }
  };

  const { isPending, data, isSuccess } = useQuery<DetailFormData>({
    queryKey: ["forms", user?.id, params?.answerId],
    queryFn: () =>
      fetch(
        `http://localhost:3300/api/forms/${user?.id}/${params?.answerId}`
      ).then((res) => res.json()),
  });

  useEffect(() => {
    if (isPending) return;

    if (isSuccess) {
      data.data?.question?.map((q) => {
        if (
          q.questionOption &&
          (q.type === QuestionType.DROPDOWN ||
            q.type === QuestionType.MULTIPLE_CHOICE)
        ) {
          setFormDataArray((prevFormDataArray) => [
            ...prevFormDataArray,
            {
              questionId: q.id!,
              answerOption: [
                {
                  questionOptionId: q.questionOption[0].id!,
                },
              ],
            },
          ]);
        }
      });
    }
  }, [isSuccess]);

  // TODO:: Loading
  if (isPending) {
    return <div>Loading...</div>;
  }

  // TODO:: Not found
  if (!data) {
    return (
      <div>
        <h2>No form</h2>
      </div>
    );
  }

  function buildAnswerForm({
    question,
    type,
    handleInputChange,
  }: {
    question: Question;
    type: QuestionType;
    handleInputChange: (
      questionId: string,
      text?: string | undefined,
      answerOption?:
        | {
            questionOptionId: string;
          }[]
        | undefined
    ) => void;
  }) {
    switch (type) {
      case QuestionType.SHORT_ANSWER:
        return (
          <AnswerBorder>
            <div className="flex flex-col gap-y-2">
              {question.text && (
                <Label className="text-lg">{question.text}</Label>
              )}
              {question.description && (
                <span className=" text-sm text-muted-foreground">
                  {question.description}
                </span>
              )}
            </div>
            <Input
              placeholder={question.type?.toLowerCase()}
              onChange={(e) => handleInputChange(question.id!, e.target.value)}
            />
          </AnswerBorder>
        );
      case QuestionType.PARAGRAPH:
        return (
          <AnswerBorder>
            <div className="flex flex-col gap-y-2">
              {question.text && (
                <Label className="text-lg">{question.text}</Label>
              )}
              {question.description && (
                <span className=" text-sm text-muted-foreground">
                  {question.description}
                </span>
              )}
            </div>
            <Textarea
              placeholder={question.type?.toLowerCase()}
              onChange={(e) => handleInputChange(question.id!, e.target.value)}
            ></Textarea>
          </AnswerBorder>
        );
      case QuestionType.DROPDOWN:
        return (
          <AnswerBorder>
            <div className="flex flex-col gap-y-2">
              {question.text && (
                <Label className="text-lg">{question.text}</Label>
              )}
              {question.description && (
                <span className=" text-sm text-muted-foreground">
                  {question.description}
                </span>
              )}
            </div>
            <Select
              onValueChange={(selectedValue) =>
                handleInputChange(question.id!, undefined, [
                  { questionOptionId: selectedValue },
                ])
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Multiple choice" />
              </SelectTrigger>
              <SelectContent>
                {question.questionOption?.map((questionOption) => (
                  <SelectItem
                    key={questionOption.id}
                    value={`${questionOption.id}`}
                  >
                    {questionOption.option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AnswerBorder>
        );
      case QuestionType.CHECKBOXES:
        return (
          <AnswerBorder>
            <div className="flex flex-col gap-y-2">
              {question.text && (
                <Label className="text-lg">{question.text}</Label>
              )}
              {question.description && (
                <span className=" text-sm text-muted-foreground">
                  {question.description}
                </span>
              )}
            </div>
            {question.questionOption?.map((questionOption) => (
              <div
                key={questionOption.id}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  onCheckedChange={(isChecked) => {
                    setFormDataArray((prevFormDataArray) => {
                      const isExist = prevFormDataArray?.some(
                        (prevFormData) =>
                          prevFormData.questionId === question.id
                      );

                      if (isExist) {
                        return prevFormDataArray.map((prevFormData) => {
                          if (prevFormData.questionId === question.id) {
                            return {
                              ...prevFormData,
                              answerOption: isChecked
                                ? [
                                    ...prevFormData.answerOption!,
                                    { questionOptionId: questionOption.id },
                                  ]
                                : prevFormData.answerOption?.filter(
                                    (prevAnswerOption) =>
                                      prevAnswerOption.questionOptionId !==
                                      questionOption.id
                                  ),
                            };
                          }
                          return prevFormData;
                        });
                      } else {
                        return [
                          ...prevFormDataArray,
                          {
                            questionId: question.id!,
                            answerOption: isChecked
                              ? [{ questionOptionId: questionOption.id }]
                              : [],
                          },
                        ];
                      }
                    });
                  }}
                  id={`${questionOption.id}`}
                  className="cursor-pointer"
                />
                <label
                  htmlFor={`${questionOption.id}`}
                  className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {questionOption.option}
                </label>
              </div>
            ))}
          </AnswerBorder>
        );
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <AnswerBorder>
            <div className="flex flex-col gap-y-2">
              {question.text && (
                <Label className="text-lg">{question.text}</Label>
              )}
              {question.description && (
                <span className=" text-sm text-muted-foreground">
                  {question.description}
                </span>
              )}
            </div>
            {question.questionOption && question.questionOption.length > 0 && (
              <RadioGroup
                onValueChange={(e: string) => {
                  setFormDataArray((prevFormDataArray) => {
                    const isExist = prevFormDataArray?.some(
                      (prevFormData) => prevFormData.questionId === question.id
                    );

                    if (isExist) {
                      return prevFormDataArray.map((prevFormData) => {
                        if (prevFormData.questionId === question.id) {
                          return {
                            ...prevFormData,
                            answerOption: [{ questionOptionId: e }],
                          };
                        }
                        return prevFormData;
                      });
                    } else {
                      return [
                        ...prevFormDataArray,
                        {
                          questionId: question.id!,
                          answerOption: [{ questionOptionId: e }],
                        },
                      ];
                    }
                  });
                }}
                defaultValue={`${question.questionOption[0].id}`}
              >
                {question.questionOption?.map((questionOption) => (
                  <div
                    key={questionOption.id}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={`${questionOption.id}`}
                      id={`${questionOption.id}`}
                    />
                    <Label htmlFor={`${questionOption.id}`}>
                      {questionOption.option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </AnswerBorder>
        );
    }
  }

  console.log(formDataArray);

  return (
    <div className="pt-20 pb-16 mx-auto px-4 md:w-[700px] lg:w-[800px] xl:w-[750px] mt-10 mb-16 space-y-4">
      <div className="rounded-lg shadow-lg border  px-8 py-4 space-y-4 border-background">
        <p className="text-xl md:text-2xl font-bold">{data.data?.title}</p>
        <p>
          {data.data?.description ? data.data?.description : "no description"}
        </p>
      </div>
      <form className="space-y-3">
        {data.data?.question?.map((q) =>
          buildAnswerForm({ question: q, type: q.type!, handleInputChange })
        )}
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default AnswerIdPage;
