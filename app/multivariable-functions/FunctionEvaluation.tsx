"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PlainTex } from "../../components/Latex";
import classNames from "classnames";

interface FunctionEvaluationProps {
  defaultValues: string[];
  children: (
    InputComponents: React.FunctionComponent[],
    varValues: string[],
  ) => React.ReactNode;
}

export function FunctionEvaluation({
  defaultValues,
  children,
}: FunctionEvaluationProps) {
  const [varValues, setVarValues] = useState<string[]>(defaultValues);

  const inputComponents = useMemo(() => {
    return defaultValues.map((_, i) =>
      makePrefilledComponent(VariableInput, { i }),
    );
  }, [defaultValues]);

  return (
    <VariableInputContext.Provider value={[varValues, setVarValues]}>
      <div className="flex items-center justify-center text-center text-2xl">
        <div className="flex items-center">
          <PlainTex>{children(inputComponents, varValues)}</PlainTex>
        </div>
      </div>
    </VariableInputContext.Provider>
  );
}

const VariableInputContext = createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>]
>([[], () => {}]);

interface VariableInputProps {
  i: number;
}

function VariableInput({ i: varIndex }: VariableInputProps) {
  const [varValues, setVarValues] = useContext(VariableInputContext);

  const className = classNames(
    "rounded border border-dotted text-center text-2xl px-1",
    {
      "border-red-300 bg-red-100/40 text-red-700": varIndex === 0,
      "border-orange-300 bg-orange-100/40 text-orange-600": varIndex === 1,
    },
  );

  const value = varValues[varIndex];

  const measureSpanRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<string | number>(
    `calc(${value.length}ch + 0.5rem + 2px)`,
  );
  useLayoutEffect(() => {
    setWidth(measureSpanRef.current?.offsetWidth ?? 0);
  }, [value]);

  const setValue = useCallback(
    (newValue: string) => {
      setVarValues((prev) => [
        ...prev.slice(0, varIndex),
        newValue,
        ...prev.slice(varIndex + 1),
      ]);
    },
    [setVarValues, varIndex],
  );

  const clean = useCallback((value: string) => {
    return value.replaceAll("pi", "π");
  }, []);

  return (
    <>
      {/* Create a hidden span used to measure the width of the input for autosizing */}
      <span
        ref={measureSpanRef}
        className={classNames("absolute -z-50 opacity-0", className)}
        aria-hidden="true"
      >
        {value}
      </span>

      <input
        type="text"
        inputMode="numeric"
        className={className}
        style={{ width }}
        value={value}
        onChange={(e) => {
          setValue(clean(e.target.value));
        }}
        onKeyDown={(event) => {
          const number = Number(event.currentTarget.value);
          if (isNaN(number)) return;

          if (event.key === "ArrowUp") {
            setValue(clean(String(number + 1)));
            event.preventDefault();
          }
          if (event.key === "ArrowDown") {
            setValue(clean(String(number - 1)));
            event.preventDefault();
          }
        }}
      />
    </>
  );
}

function makePrefilledComponent<P extends object>(
  Component: React.FunctionComponent<P>,
  prefillProps: Partial<P>,
) {
  function PrefilledComponent(props: Omit<P, keyof typeof prefillProps>) {
    const allProps = { ...props, ...prefillProps } as P;
    return <Component {...allProps} />;
  }
  return PrefilledComponent;
}
