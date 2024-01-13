import {
  Children,
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { AnswerStatusIcon } from "./Exercise";

interface ExerciseSetContextValue {
  onCheck: (correct: boolean) => void;
  goToNext: (() => void) | null;
}

const ExerciseSetContext = createContext<ExerciseSetContextValue>({
  onCheck: () => {},
  goToNext: null,
});

export function useExerciseSetContext() {
  return useContext(ExerciseSetContext);
}

export interface ExerciseSetProps {
  children: React.ReactNode;
}

export function ExerciseSet({ children }: ExerciseSetProps) {
  const count = Children.count(children);

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [correct, setCorrect] = useState<(boolean | null)[]>(
    new Array(count).fill(null),
  );

  const ref = useRef<HTMLDivElement>(null);
  const isFirstScroll = useRef(true);
  const [animating, setAnimating] = useState(false);

  useLayoutEffect(() => {
    const exerciseElem = ref.current!.children[exerciseIndex] as HTMLElement;

    setAnimating(true);
    smoothScrollTo(ref.current!, {
      left: exerciseElem.offsetLeft,
      top: 0,
      duration: isFirstScroll.current ? 0 : 500,
      ease: easeInOut,
    });
    ref.current!.style.height = `${exerciseElem.offsetHeight}px`;
    ref.current!.style.transition = "height 500ms ease-in-out";
    setTimeout(() => {
      setAnimating(false);
    }, 500);

    isFirstScroll.current = false;
  }, [exerciseIndex]);

  const goToNext = useCallback(() => {
    if (!animating) {
      setExerciseIndex((i) => i + 1);
    }
  }, [animating]);

  const maxUnlocked = correct.findLastIndex((c) => c === true) + 1;

  return (
    <div className="relative">
      <button
        disabled={exerciseIndex === 0 || animating}
        className={classNames(
          "absolute -left-2 bottom-10 top-0 w-16 -translate-x-full rounded-2xl transition-opacity hover:bg-stone-300/20 focus:bg-stone-500/10 focus:outline-none focus:ring focus:ring-stone-500/20",
          { "opacity-0": exerciseIndex === 0 },
        )}
        onClick={() => setExerciseIndex(exerciseIndex - 1)}
      >
        <svg className="h-16 w-16" viewBox="0 0 32 32">
          <path
            className="stroke-stone-400"
            d="M 20 8 L 12 16 L 20 24"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>
      <div
        ref={ref}
        className="relative flex items-start space-x-4 overflow-hidden rounded-2xl"
      >
        {Children.map(children, (child, index) => (
          <ExerciseSetContext.Provider
            value={{
              onCheck(correct) {
                setCorrect((corrects) => {
                  const newCorrects = [...corrects];
                  newCorrects[index] = correct;
                  return newCorrects;
                });
              },
              goToNext,
            }}
          >
            <div
              className="w-full flex-shrink-0 flex-grow-0 overflow-hidden"
              aria-hidden={index === exerciseIndex ? "false" : "true"}
              aria-disabled={index === exerciseIndex ? "false" : "true"}
              // @ts-expect-error - inert is not in the HTML spec yet
              inert={index !== exerciseIndex ? "true" : undefined}
              // style={{
              //   visibility:
              //     index === exerciseIndex || animating ? "visible" : "hidden",
              // }}
            >
              {child}
            </div>
          </ExerciseSetContext.Provider>
        ))}
      </div>
      <button
        disabled={exerciseIndex >= maxUnlocked || animating}
        className={classNames(
          "absolute -right-2 bottom-10 top-0 w-16 translate-x-full rounded-2xl transition-opacity hover:bg-stone-300/20 focus:bg-stone-500/10 focus:outline-none focus:ring focus:ring-stone-500/20",
          { "opacity-0": exerciseIndex >= maxUnlocked },
        )}
        onClick={() => setExerciseIndex(exerciseIndex + 1)}
      >
        <svg className="h-16 w-16" viewBox="0 0 32 32">
          <path
            className="stroke-stone-400"
            d="M 12 8 L 20 16 L 12 24"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>
      <div className="flex h-10 items-center justify-center space-x-1">
        {correct.map((c, index) => (
          <button
            key={index}
            disabled={animating || index > maxUnlocked}
            onClick={() => {
              setExerciseIndex(index);
            }}
          >
            {c === null ? (
              <div
                className={classNames(
                  "relative rounded-full border-2 border-stone-300 bg-stone-100 transition-all duration-300",
                  {
                    "h-4 w-4": index !== exerciseIndex,
                    "h-6 w-6": index === exerciseIndex,
                  },
                )}
              >
                {index === maxUnlocked && (
                  <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-300" />
                )}
              </div>
            ) : (
              <AnswerStatusIcon
                correct={c}
                className={classNames(
                  "h-4 w-4 rounded-full border-2 transition-all duration-300",
                  {
                    "h-4 w-4": index !== exerciseIndex,
                    "h-6 w-6": index === exerciseIndex,
                    "border-green-700": c === true,
                    "border-red-700": c === false,
                  },
                )}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function smoothScrollTo(
  elem: HTMLElement,
  {
    left,
    top,
    duration = 500,
    ease = (t: number) => t,
  }: {
    left?: number;
    top?: number;
    duration?: number;
    ease?: (t: number) => number;
  },
) {
  const start = {
    left: elem.scrollLeft,
    top: elem.scrollTop,
  };

  const change = {
    left: left !== undefined ? left - start.left : 0,
    top: top !== undefined ? top - start.top : 0,
  };

  const startTime = performance.now();
  const animateScroll = function () {
    const now = performance.now();
    let time = Math.min(1, (now - startTime) / duration);
    time = ease(time);

    console.log(time, ease(time));

    elem.scrollTo({
      left: start.left + change.left * time,
      top: start.top + change.top * time,
      behavior: "instant",
    });

    if (time < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
}

export function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
