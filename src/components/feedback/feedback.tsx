"use client";
import { FaStar as Star } from "react-icons/fa";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

const Feedback = ({}) => {
  const [grade, setGrade] = useState(0);
  const [showFeedbackBox, setShowFeedbackBox] = useState(false);
  const [answer, setAnswer] = useState("");
  const [hoverGrade, setHoverGrade] = useState(0);
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

  const sendAnswer = () => {
    console.log(
      `Arvio: ${grade} tähteä, Kysymys: ${
        questions[grade - 1]
      }, Vastaus: ${answer}`
    );
    // Tässä tallennus tietokantaan? (käyttäjän profiiliin // Tehdään feedback table)
    setShowFeedbackBox(false);
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
        <div id="question-box" className="flex flex-col">
          <p className="text-xl ">{questions[grade - 1]}</p>
          <Textarea
            placeholder={textareaPlaceholder[grade - 1]}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Button onClick={sendAnswer}>Lähetä</Button>
        </div>
      )}
    </div>
  );
};

export default Feedback;
