"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModalStore } from "@/store/modal-store";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).optional(),
});

export function UpdateFormModal() {
  const { user } = useUser();
  const { isOpen, modalType, onClose, modalData } = useModalStore();

  const formId = modalData?.form?.data.id;
  const title = modalData?.form?.data.title;
  const description = modalData?.form?.data?.description;

  const queryClient = useQueryClient();

  const open = isOpen && modalType === "updateForm";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      description,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      return;
    }

    const res = await fetch(
      `http://localhost:3300/api/forms/${user.id}/${formId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
        }),
      }
    );

    const data = await res.json();

    if (data.success && data.status === 200) {
      queryClient.invalidateQueries({ queryKey: ["forms", user?.id, formId] });
      onClose();
      toast.success("Form updated successfully");
    } else {
      toast.error("Something went wrong!");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit form</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g multi selection"
                      {...field}
                      defaultValue={title}
                    />
                  </FormControl>
                  <FormDescription>Title for your new form.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g some description"
                      {...field}
                      defaultValue={description}
                    />
                  </FormControl>
                  <FormDescription>
                    Description for your new form.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
