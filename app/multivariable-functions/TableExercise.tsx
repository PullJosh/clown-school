import { useCallback, useRef, useState } from "react";
import {
  ExerciseBox,
  HintIcon,
  confettiElement,
  shakeElement,
} from "./Exercise";
import { useExerciseSetContext } from "./ExerciseSet";
import { DataTable, DataTableInput } from "./DataTable";
import { Latex } from "../../components/Latex";
import classNames from "classnames";

interface TableExerciseProps {
  children: React.ReactNode;
  hints?: React.ReactNode[];
}

export function TableExercise({ children, hints = [] }: TableExerciseProps) {
  const { onCheck, goToNext } = useExerciseSetContext();

  const [answer, setAnswer] = useState(["", "", ""]);
  const [hintsRevealed, setHintsRevealed] = useState(0);

  const [correct, setCorrect] = useState<(boolean | null)[]>([
    null,
    null,
    null,
  ]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null]);

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (allCorrect(correct) && goToNext) {
        goToNext();
        return;
      }

      const newCorrect = checkAnswer(answer);
      setCorrect(newCorrect);

      if (allCorrect(newCorrect)) {
        confettiElement(submitButtonRef.current!);
        submitButtonRef.current!.focus();
      } else {
        const firstIncorrectIndex = newCorrect.findIndex((c) => !c);
        inputRefs.current[firstIncorrectIndex]?.focus();
        shakeElement(submitButtonRef.current!);
      }

      onCheck?.(allCorrect(newCorrect));
    },
    [correct, goToNext, answer, onCheck],
  );

  return (
    <ExerciseBox hints={hints} hintsRevealed={hintsRevealed}>
      <h4 className="font-headline text-lg font-semibold text-stone-700">
        Let's practice!
      </h4>
      {children}
      <form className="mt-6" onSubmit={handleSubmit}>
        <span className="mb-px block text-sm text-stone-500">Answer:</span>
        <DataTable
          direction="vertical"
          headers={[
            { title: <Latex value="a" /> },
            { title: <Latex value="b" /> },
            { title: <Latex value={String.raw`f(a, b)`} /> },
          ]}
          data={[
            [0, 1, 2],
            [3, 4, 5],
            new Array(3).fill(null).map((_, i) => (
              <DataTableInput
                ref={(el) => (inputRefs.current[i] = el)}
                key={i}
                correct={correct[i]}
                disabled={correct[i] === true}
                className={classNames({
                  "bg-red-100": correct[i] === false,
                  "bg-green-100": correct[i] === true,
                })}
                value={answer[i]}
                onChange={(newValue) => {
                  setAnswer([
                    ...answer.slice(0, i),
                    newValue,
                    ...answer.slice(i + 1),
                  ]);
                  setCorrect((correct) => {
                    let newCorrect = [...correct];
                    newCorrect[i] = null;
                    return newCorrect;
                  });
                }}
              />
            )),
          ]}
        />
        <div className="mt-2 flex items-stretch space-x-2">
          <button
            ref={submitButtonRef}
            type="submit"
            disabled={
              (allCorrect(correct) || anyInvalid(answer)) &&
              !(allCorrect(correct) && goToNext)
            }
            className="text-md h-10 rounded-md bg-stone-800 px-4 text-stone-100 focus:outline-none focus:ring focus:ring-stone-500/20 disabled:opacity-50"
          >
            {allCorrect(correct) && goToNext ? "Next" : "Check"}
          </button>
          {hintsRevealed < hints.length && (
            <button
              disabled={allCorrect(correct)}
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

function allCorrect(correct: (boolean | null)[]) {
  return correct.every((c) => c === true);
}

function anyInvalid(answer: string[]) {
  return answer.some((a) => a === "");
}

function checkAnswer(answer: string[]) {
  return [
    Number(answer[0]) === 0,
    Number(answer[1]) === 8,
    Number(answer[2]) === 20,
  ];
}
