// import { QuestionArray, QuestionType } from "@/type";
// import React, { FormEvent, useEffect, useRef, useState } from "react";

// import { useQueryClient } from "@tanstack/react-query";

// import { useUser } from "@clerk/nextjs";
// import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// interface useFormBuilderProps {
//   questions: QuestionArray;
//   formId: string;
// }

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
};

// const useFormBuilder = ({ questions, formId }: useFormBuilderProps) => {
//   const { user } = useUser();
//   // edit questions
//   const [isEditing, setIsEditing] = useState<{
//     order: number;
//     isEditing: boolean;
//   }>({ order: 0, isEditing: false });

//   const formRef = useRef<HTMLFormElement | null>(null);
//   const [q, setQ] = useState<{
//     text: string;
//     id?: string;
//     description?: string;
//     type: QuestionType;
//     formId: string;
//     order: number;
//   }>({
//     text: "",
//     description: "",
//     type: QuestionType["SHORT_ANSWER"],
//     formId: "",
//     order: 0,
//   });
//   const queryClient = useQueryClient();

//   async function onSubmit(e: FormEvent) {
//     e.preventDefault();
//     if (!user) {
//       return;
//     }

//     console.log({
//       formId: formId,
//       text: q.text,
//       description: q.description,
//       type: q.type,
//       order: q.order,
//     });

//     if (q.id) {
//       console.log(q.id);
//     } else {
//       // const res = await fetch(`http://localhost:3300/api/questions`, {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Accept: "application/json",
//       //   },
//       //   body: JSON.stringify({
//       //     data: [
//       //       {
//       //         formId: formId,
//       //         text: q.text,
//       //         description: q.description,
//       //         type: q.type,
//       //         order: q.order,
//       //       },
//       //     ],
//       //   }),
//       // });
//       // const data = await res.json();
//       // if (data.success && data.status === 201) {
//       //   queryClient.invalidateQueries({
//       //     queryKey: ["forms", user?.id, formId],
//       //   });
//       //   setIsEditing({ order: 0, isEditing: false });
//       //   setQ({
//       //     text: "",
//       //     description: "",
//       //     type: QuestionType["SHORT_ANSWER"],
//       //     formId: "",
//       //     order: 0,
//       //     id: "",
//       //   });
//       // } else {
//       //   toast.error("Something went wrong!");
//       // }
//     }
//   }

//   function editQuestion(order: number, text: string, id?: string) {
//     setIsEditing({ order, isEditing: true });
//     if (id) {
//       setQ({ ...q, id });
//     }
//     setQ({ ...q, text });
//   }

//   // wrapper to detect if use click outside of the edit question
//   const wrapperRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     function handleClickOutside(event: any) {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         // Clicked outside the wrapperRef
//         if (isEditing.isEditing) {
//           // If editing is on, perform the necessary action here
//           setIsEditing({ order: 0, isEditing: false });
//         }
//       }
//     }

//     // Bind the event listener
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       // Unbind the event listener on component unmount
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [wrapperRef, isEditing, isEditing.isEditing]);

//   if (!questions.length) {
//     return null; // or any other fallback
//   }

//   return questions.map((question, index) => (
//     <div
//       ref={wrapperRef}
//       role="button"
//       onClick={() =>
//         editQuestion(question.order!, question.text!, question?.id)
//       }
//       key={index}
//       className="rounded-lg shadow-lg border  px-8 py-4 space-y-4 border-background"
//     >
//       {isEditing.order === question.order && isEditing.isEditing ? (
//         <div>
//           <form ref={formRef} onSubmit={onSubmit} className="space-y-8">
//             <Input
//               placeholder="e.g multi selection"
//               value={q.text}
//               name="text"
//               onChange={(e) => {
//                 setQ({
//                   ...q,
//                   text: e.target.value,
//                   order: question.order!,
//                   type: question.type!,
//                   id: question.id,
//                 });
//               }}
//             />

//             <Input
//               placeholder="e.g some description"
//               value={q.description}
//               onChange={(e) =>
//                 setQ({
//                   ...q,
//                   description: e.target.value,
//                 })
//               }
//             />

//             <Button type="submit">Save</Button>
//           </form>
//         </div>
//       ) : (
//         <>
//           <p className="text-lg">{question.text}</p>
//           <p className="border-b dark:border-b-slate-800 border-b-slate-300 pb-2">
//             {question.description}
//           </p>
//         </>
//       )}
//     </div>
//   ));
// };

// export default useFormBuilder;

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { QuestionArray, QuestionType } from "@/type";

interface useFormBuilderProps {
  questions: QuestionArray;
  formId: string;
  // onQuestionUpdate: (updatedQuestion: Question) => void;
}

interface Question {
  id?: string;
  text?: string;
  description?: string | null;
  type?: QuestionType;
  formId?: string;
  order?: number;
}

const useFormBuilder = ({
  questions,
  formId,
}: // onQuestionUpdate,
useFormBuilderProps) => {
  const { user } = useUser();
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const queryClient = useQueryClient();

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion({ ...question });
  };

  const handleSaveQuestion = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !editingQuestion) return;

    try {
      if (editingQuestion.id) {
        const res = await fetch(
          `http://localhost:3300/api/questions/${editingQuestion.id}/${formId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              text: editingQuestion.text,
              description: editingQuestion.description,
              type: editingQuestion.type,
              order: editingQuestion.order,
            }),
          }
        );

        const data = await res.json();
        if (data.success && data.status === 200) {
          queryClient.invalidateQueries({
            queryKey: ["forms", user?.id, formId],
          });
          setEditingQuestion(null);
          toast.success("Updated question successfully");
        } else {
          toast.error("Something went wrong!");
        }
      } else {
        const res = await fetch(`http://localhost:3300/api/questions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            data: [
              {
                formId: editingQuestion.formId,
                text: editingQuestion.text,
                description: editingQuestion.description,
                type: editingQuestion.type,
                order: editingQuestion.order,
              },
            ],
          }),
        });

        const data = await res.json();
        if (data.success && data.status === 201) {
          queryClient.invalidateQueries({
            queryKey: ["forms", user?.id, formId],
          });
          setEditingQuestion(null);
          toast.success("Added question successfully");
        } else {
          toast.error("Something went wrong!");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while saving the question.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!editingQuestion) return;
    setEditingQuestion({ ...editingQuestion, [name]: value });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setEditingQuestion(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {questions.map((question, index) => (
        <div
          key={index}
          className="rounded-lg shadow-lg border px-8 py-4 space-y-4 border-background"
        >
          {editingQuestion && editingQuestion.order === question.order ? (
            <form
              onSubmit={handleSaveQuestion}
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
              <Button type="submit">Save</Button>
            </form>
          ) : (
            <>
              <p className="text-lg">{question.text}</p>
              <p className="border-b dark:border-b-slate-800 border-b-slate-300 pb-2">
                {question.description}
              </p>
              <Button onClick={() => handleEditQuestion(question)}>Edit</Button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default useFormBuilder;
