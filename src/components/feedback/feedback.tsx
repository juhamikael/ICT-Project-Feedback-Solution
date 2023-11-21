"use client"
import { FaStar as Star } from "react-icons/fa";
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Textarea } from "../ui/textarea";

const Feedback = ({}) => {
    const [grade, setGrade] = useState(0);
    const [showFeedbackBox, setShowFeedbackBox] = useState(false);
    const [answer, setAnswer] = useState('');

    const questions = [
        "Mikä sai sinut antamaan meille vain yhden tähden?",
        "Mitä voisimme tehdä paremmin saadaksemme enemmän kuin kaksi tähteä?",
        "Kerro, miten voisimme parantaa kokemustasi?",
        "Mikä teki kokemuksestasi lähes täydellisen, mutta ei aivan?",
        "Mahtavaa!"
      ];

      const giveGrade = (grade:number) => {
        setGrade(grade);
        setShowFeedbackBox(true);
      };

      const sendAnswer = () => {
        console.log(`Arvio: ${grade} tähteä, Kysymys: ${questions[grade - 1]}, Vastaus: ${answer}`);
        // Tässä tallennus tietokantaan? (käyttäjän profiiliin // Tehdään feedback table)
        setShowFeedbackBox(false);
      };

      const updateStars = () => {
        return (
            <div className="flex flex-row gap-x-3">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                    key={star}
                    className={cn('h-28 w-28',star <= grade ? 'text-yellow-400' : 'text-slate-500')}
                    onClick={() => giveGrade(star)}
                    />
                ))}
            </div>
        );
      };

      const showFeedbackBoxfn = () => {
        setShowFeedbackBox(!showFeedbackBox)
        
      };

  return (
    <div>
      <div>feedback</div>
      {updateStars()}
      {/*<Button onClick={showFeedbackBoxfn}>Näytä palaute</Button>*/}
      <Button onClick={() => showFeedbackBoxfn()}>Anna palaute</Button>
        {showFeedbackBox  && <div id="question-box" className="flex flex-col">
                    <p className="text-3xl text-center">{questions[grade -1]}</p>
                    <Textarea placeholder="Kerro meille hieman lisää..." onChange={(e) => setAnswer(e.target.value)} />
                    <Button onClick={sendAnswer}>Tallenna</Button>
                </div>}
    </div>
  );
};

export default Feedback;

