import { forwardRef } from "react";
import classNames from "classnames";
import confetti from "canvas-confetti";

import "./Exercise.css";

/*
  Primitive input types:
  - Number
  - Latex
  - Multiple Choice
  - Graph elements (points, lines, etc.)

  Composed input types:
  - Table
  - Graph

  Composed input types are made up of primitive input types. They might
  have a fixed number of primitive inputs, but it could also be chosen
  by the user (for example, "add all the data points to the graph").

  When a user submits an answer, we either want to give corrective feedback
  or mark the answer as 100% correct. (Corrective feedback might mean that
  some parts/inputs are correct but others require changes.)

  Each exercise is so unique, we need to give lots of flexibility. Treat each
  one as its own custom-coded component.
*/

export interface ExerciseBoxProps {
  children: React.ReactNode;
  hints?: React.ReactNode[];
  hintsRevealed?: number;
}

export function ExerciseBox({
  children,
  hints = [],
  hintsRevealed = 0,
}: ExerciseBoxProps) {
  return (
    <section className="relative max-w-full overflow-hidden rounded-2xl bg-stone-200 p-8">
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-2xl">
        <DumbbellIcon className="absolute -right-4 top-0 w-48 rotate-12" />
      </div>
      <div className="relative">
        {children}

        {hintsRevealed > 0 && hints.length > 0 && (
          <div className="mt-4 space-y-2">
            {hints.slice(0, hintsRevealed).map((hint, index) => (
              <div key={index} className="rounded-md bg-stone-300 px-4 py-2">
                <strong>Hint:</strong> {hint}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function shakeElement(el: HTMLElement) {
  el.style.animation = "none";
  void el.offsetWidth; // force reflow
  el.style.animation = "shakeNo 600ms linear";
}

export function confettiElement(el: HTMLElement) {
  const rect = el.getBoundingClientRect();

  confetti({
    disableForReducedMotion: true,
    origin: {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    },
    spread: 70,
  });
}

export interface NumberInputProps {
  // answer: string;
  // setAnswer: React.Dispatch<React.SetStateAction<string>>;
  // answerStatus: null | { correct: boolean; stale: boolean };
  // setAnswerStatus: React.Dispatch<
  //   React.SetStateAction<null | { correct: boolean; stale: boolean }>
  // >;

  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  correct: boolean | null;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput({ value, onChange, correct }, ref) {
    return (
      <div className="relative">
        <input
          ref={ref}
          type="number"
          disabled={correct === true}
          className={classNames(
            "text-md h-10 w-48 rounded-md border px-4 focus:outline-none focus:ring",
            {
              "border-stone-400 bg-stone-100 text-stone-700 focus:border-stone-500 focus:ring-stone-500/20":
                correct === null,
              "border-red-400 bg-red-100 text-red-700 focus:border-red-700 focus:ring-red-500/30":
                correct === false,
              "border-green-600 bg-green-100 text-green-700 focus:border-green-700 focus:ring-green-500/30":
                correct === true,
              "pr-8": correct !== null,
            },
          )}
          value={value}
          onChange={onChange}
        />
        {correct !== null && (
          <AnswerStatusIcon
            className="absolute right-2 top-2 h-6 w-6 rounded"
            correct={correct}
          />
        )}
      </div>
    );
  },
);

export interface AnswerStatusIconProps {
  className?: string;
  correct: boolean;
}

export function AnswerStatusIcon({
  className,
  correct,
}: AnswerStatusIconProps) {
  return (
    <svg
      className={classNames(className, {
        "bg-red-700": !correct,
        "bg-green-700": correct,
      })}
      viewBox="0 0 18 18"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
    >
      <title>{correct ? "Correct" : "Incorrect"}</title>
      <g transform="matrix(1,0,0,1,-29,-25)">
        {!correct && (
          <>
            <path
              d="M33,29L43,39"
              className="stroke-stone-100"
              strokeWidth={2}
            />
            <path
              d="M33,39L43,29"
              className="stroke-stone-100"
              strokeWidth={2}
            />
          </>
        )}
        {correct && (
          <path
            d="M33,35L37,39L43,29"
            className="stroke-white"
            strokeWidth={2}
            fill="none"
          />
        )}
      </g>
    </svg>
  );
}

export interface DumbbellIconProps {
  className?: string;
}

export function DumbbellIcon({ className }: DumbbellIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 13 8"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: "1.5",
      }}
    >
      <g className="stroke-stone-300" transform="matrix(1,0,0,1,-29,-6)">
        <path d="M30,10L41,10" fill="none" strokeWidth={2} />
        <path d="M31,8L31,12" fill="none" strokeWidth={2} />
        <path d="M33,7L33,13" fill="none" strokeWidth={2} />
        <path d="M38,7L38,13" fill="none" strokeWidth={2} />
        <path d="M40,8L40,12" fill="none" strokeWidth={2} />
      </g>
    </svg>
  );
}

export interface HintIconProps {
  className?: string;
}

export function HintIcon({ className }: HintIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 18 18"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="matrix(1,0,0,1,-5,-25)"
      >
        <circle cx="14" cy="34" r="9" className="fill-stone-600" />
        <g>
          <g transform="matrix(1.5,0,0,1,5,22)">
            <ellipse
              cx="6"
              cy="17.5"
              rx="1"
              ry="1.5"
              className="fill-stone-200"
            />
          </g>
          <g transform="matrix(0.75,0,0,0.75,3.5,7)">
            <path
              d="M14,36C16.209,36 18,34.209 18,32C18,29.792 16.208,28 14,28C11.791,28 10,29.791 10,32"
              className="stroke-stone-200"
              fill="none"
              strokeWidth={2.67}
            />
          </g>
          <g transform="matrix(1,-1.97373e-16,-1.57898e-16,0.533333,-1.53951e-15,16.5333)">
            <path
              d="M14,32.75L14,36.5"
              className="stroke-stone-200"
              strokeWidth={2.5}
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
