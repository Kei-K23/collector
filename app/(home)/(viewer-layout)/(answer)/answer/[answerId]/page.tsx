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
import React from "react";
import AnswerBorder from "./_components/answer-border";
import { Button } from "@/components/ui/button";

interface AnswerIdPageProps {
  params: {
    answerId: string;
  };
}

const AnswerIdPage = ({ params }: AnswerIdPageProps) => {
  const { user } = useUser();

  const { isPending, data } = useQuery<DetailFormData>({
    queryKey: ["forms", user?.id, params?.answerId],
    queryFn: () =>
      fetch(
        `http://localhost:3300/api/forms/${user?.id}/${params?.answerId}`
      ).then((res) => res.json()),
  });

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

  function buildAnswerForm(question: Question, type: QuestionType) {
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
            <Input placeholder={question.type?.toLowerCase()} />
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
            <Textarea placeholder={question.type?.toLowerCase()}></Textarea>
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
            <Select>
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
              <RadioGroup defaultValue={`${question.questionOption[0].id}`}>
                {question.questionOption?.map((questionOption) => (
                  <div
                    key={questionOption.id}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={`${questionOption.id}`}
                      id={`${questionOption.id}`}
                    />
                    <Label htmlFor="option-one">{questionOption.option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </AnswerBorder>
        );
    }
  }

  return (
    <div className="pt-20 pb-16 mx-auto px-4 md:w-[700px] lg:w-[800px] xl:w-[750px] mt-10 mb-16 space-y-4">
      <div className="rounded-lg shadow-lg border  px-8 py-4 space-y-4 border-background">
        <p className="text-xl md:text-2xl font-bold">{data.data?.title}</p>
        <p>
          {data.data?.description ? data.data?.description : "no description"}
        </p>
      </div>
      <form className="space-y-3">
        {data.data?.question?.map((q) => buildAnswerForm(q, q.type!))}
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default AnswerIdPage;
