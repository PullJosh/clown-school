import { useCallback, useRef, useState } from "react";
import {
  ExerciseBox,
  HintIcon,
  NumberInput,
  confettiElement,
  shakeElement,
} from "./Exercise";

export interface NumberInputExercise {
  children: React.ReactNode;
  defaultAnswer?: string;
  checkAnswer: (answer: string) => boolean;
  hints?: React.ReactNode[];
}

export function NumberInputExercise({
  children,
  defaultAnswer = "",
  checkAnswer,
  hints = [],
}: NumberInputExercise) {
  const [answer, setAnswer] = useState(defaultAnswer);
  const [hintsRevealed, setHintsRevealed] = useState(0);

  const [correct, setCorrect] = useState<boolean | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (checkAnswer(answer)) {
        setCorrect(true);
        confettiElement(inputRef.current!);
      } else {
        setCorrect(false);
        shakeElement(inputRef.current!.parentElement!);
      }
      inputRef.current?.focus();
    },
    [answer, checkAnswer],
  );

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <ExerciseBox hints={hints} hintsRevealed={hintsRevealed}>
      <h4 className="font-headline text-lg font-semibold text-stone-700">
        Let's practice!
      </h4>
      {children}
      <form className="mt-6" onSubmit={handleSubmit}>
        <span className="mb-px block text-sm text-stone-500">Answer:</span>
        <div className="flex items-stretch space-x-2">
          <NumberInput
            ref={inputRef}
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
              setCorrect(null);
            }}
            correct={correct}
          />
          <button
            ref={submitButtonRef}
            type="submit"
            disabled={correct === true || answer === ""}
            className="text-md h-10 rounded-md bg-stone-800 px-4 text-stone-100 focus:outline-none focus:ring focus:ring-stone-500/20 disabled:opacity-50"
          >
            Check
          </button>
          {hintsRevealed < hints.length && (
            <button
              disabled={correct === true}
              className="text-md flex h-10 items-center space-x-2 rounded-md px-4 text-stone-600 focus:bg-stone-500/10 focus:outline-none focus:ring focus:ring-stone-500/20 hover:enabled:bg-stone-500/10 disabled:opacity-50"
              type="button"
              onClick={() => {
                setHintsRevealed((r) => r + 1);
              }}
            >
              <HintIcon className="h-5 w-5" />
              <span>Get hint</span>
            </button>
          )}
        </div>
      </form>
    </ExerciseBox>
  );
}
