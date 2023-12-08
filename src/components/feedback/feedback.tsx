"use client";
import { FaStar as Star } from "react-icons/fa";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUrl } from "@/lib/config";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  grade: z.number(),
  feedbackText: z.string(),
});

const Feedback = ({ orderId }: { orderId: string | string[] }) => {
  const [grade, setGrade] = useState(0);
  const [showFeedbackBox, setShowFeedbackBox] = useState(false);
  const [answer, setAnswer] = useState("");
  const [hoverGrade, setHoverGrade] = useState(0);

  const { user } = useKindeBrowserClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grade: 0,
      feedbackText: "",
    },
  });

  const questions = [
    "Mikä sai sinut antamaan meille vain yhden tähden?",
    "Mitä voisimme tehdä paremmin saadaksemme enemmän kuin kaksi tähteä?",
    "Kerro, miten voisimme parantaa kokemustasi?",
    "Mikä teki kokemuksestasi lähes täydellisen, mutta ei aivan?",
    "Mahtavaa!",
  ];
  const textareaPlaceholder = [
    "Missä epäonnistuimme?",
    "Missä epäonnistuimme ja miten voisimme parantaa kokemustasi?",
    "Kerro, miten voisimme parantaa kokemustasi?",
    "Kerro hieman lisää, miten voisimme parantaa kokemustasi?",
    "Kerro hieman lisää kokemuksestasi.",
  ];

  const giveGrade = (grade: number) => {
    setGrade(grade);
    setShowFeedbackBox(true);
  };

  const sendAnswer = async (values: z.infer<typeof formSchema>) => {
    try {
      form.setValue("grade", grade);
      const url = `${baseUrl}/api/send-feedback`;
      const userId = user?.id;
      const body = {
        userId: userId,
        grade: form.getValues("grade"),
        feedback: form.getValues("feedbackText"),
        orderId: orderId,
        feedbackDate: new Date(),
      };
      await axios.post(url, body);
    } catch (error) {
      toast.error("Tilaus epäonnistui");
      console.log(error);
    }

    setShowFeedbackBox(false);
    // reload page
    window.location.reload();
  };

  const updateStars = () => {
    return (
      <div className="flex flex-row gap-x-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            onMouseEnter={() => setHoverGrade(star)}
            onMouseLeave={() => setHoverGrade(0)}
            className={cn(
              "h-10 w-10 transition-all",
              star <= Math.max(grade, hoverGrade)
                ? "text-yellow-400"
                : "text-slate-500 hover:text-yellow-400"
            )}
            onClick={() => {
              giveGrade(star);
              setShowFeedbackBox(true);
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {updateStars()}
      {showFeedbackBox && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(sendAnswer)}
            className="space-y-4 my-4"
          >
            <div id="question-box" className="flex flex-col">
              <p className="text-xl ">{questions[grade - 1]}</p>

              <FormField
                control={form.control}
                name="feedbackText"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="my-4"
                        placeholder={textareaPlaceholder[grade - 1]}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">{"Lähetä"}</Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default Feedback;
