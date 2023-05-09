"use client";

import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { Latex } from "../../../components/Latex";

export default function NumbersInOtherBases() {
  return (
    <>
      <h1>Numbers in Other Bases</h1>
      <p className="lead">
        We use a base 10 number system, probably because we have 10 fingers. But
        we could have chosen to represent numbers some other way!
      </p>
      <p>
        This page is a work in progress, but you can give this nifty base
        converter a try right now.
      </p>
      <div className="not-prose">
        <BaseConverter />
      </div>
    </>
  );
}

function BaseConverter() {
  const [bases, setBases] = useState([10, 2, 16]);
  const [numberStrings, setNumberStrings] = useState(["69", "1000101", "45"]);
  const [numberArrays, setNumberArrays] = useState([
    [6, 9].reverse(),
    [1, 0, 0, 0, 1, 0, 1].reverse(),
    [4, 5].reverse(),
  ]);

  const setBase = (i: number, base: number) => {
    const newBases = [...bases];
    newBases[i] = base;
    setBases(newBases);

    const newNumberArrays = [...numberArrays];
    newNumberArrays[i] = base10ToBaseN(
      parseInt(numberStrings[i], bases[i]),
      base
    );
    setNumberArrays(newNumberArrays);

    const newNumberStrings = [...numberStrings];
    newNumberStrings[i] = newNumberArrays[i]
      .map((coefficient) => coefficient.toString(base))
      .reverse()
      .join("");
    setNumberStrings(newNumberStrings);
  };

  const setCoefficient = (i: number, j: number, coefficient: number) => {
    const newCoefficients = [...numberArrays[i]];
    newCoefficients[j] = coefficient;

    let newValue = 0;
    for (let k = 0; k < newCoefficients.length; k++) {
      newValue += newCoefficients[k] * Math.pow(bases[i], k);
    }

    const newNumberArrays = bases.map((base) => base10ToBaseN(newValue, base));
    setNumberArrays(newNumberArrays);

    const newNumberStrings = bases.map((base) => newValue.toString(base));
    setNumberStrings(newNumberStrings);
  };

  const setNumberString = (i: number, numberString: string) => {
    const validChars = "0123456789abcdefghijklmnopqrstuvwxyz"
      .substring(0, bases[i])
      .split("");

    numberString = numberString
      .toLowerCase()
      .split("")
      .filter((c) => validChars.includes(c))
      .join("");

    if (numberString === "") {
      numberString = "0";
    }

    const newValue = parseInt(numberString, bases[i]);

    const newNumberArrays = bases.map((base) => base10ToBaseN(newValue, base));
    setNumberArrays(newNumberArrays);

    const newNumberStrings = bases.map((base) => newValue.toString(base));
    setNumberStrings(newNumberStrings);
  };

  const ref = useRef<HTMLDivElement>(null);

  // Resize all inputs to fit their contents.
  useEffect(() => {
    if (!ref.current) return;

    const inputs = ref.current.querySelectorAll("input");
    inputs.forEach((input) => {
      input.style.width = "0";
      input.style.width = input.scrollWidth + "px";
    });
  });

  return (
    <div className="divide-y-2 hidden-spinners" ref={ref}>
      {numberStrings.map((numberString, i) => (
        <div key={i} className="py-2">
          <div className="text-3xl">
            (
            <input
              className="w-24 px-1 py-px rounded"
              key={i}
              type="text"
              value={numberString}
              onChange={(event) => setNumberString(i, event.target.value)}
            />
            )
            <sub>
              <BufferedNumberInput
                className="bg-gray-100 w-12 px-1 py-px rounded"
                value={bases[i]}
                setValue={(newValue) => setBase(i, newValue)}
                min={2}
                max={36}
                step={1}
              />
            </sub>{" "}
            ={" "}
            <span className="text-sm">
              {[...numberArrays[i]].reverse().map((coefficient, j) => (
                <span key={numberArrays[i].length - 1 - j}>
                  <BufferedNumberInput
                    className="w-12 font-math text-lg font-bold"
                    value={coefficient}
                    setValue={(newValue) =>
                      setCoefficient(
                        i,
                        numberArrays[i].length - 1 - j,
                        newValue
                      )
                    }
                    min={0}
                    max={bases[i] - 1}
                  />
                  <Latex
                    value={String.raw`\times ${bases[i]}^{${
                      numberArrays[i].length - 1 - j
                    }}${j === numberArrays[i].length - 1 ? "" : " + "}`}
                  />
                </span>
              ))}
            </span>
          </div>
        </div>
      ))}
      <style jsx>
        {`
          .hidden-spinners
            :global(input[type="number"]::-webkit-inner-spin-button),
          .hidden-spinners
            :global(input[type="number"]::-webkit-outer-spin-button) {
            -webkit-appearance: none;
            margin: 0;
          }

          .hidden-spinners :global(input[type="number"]) {
            -moz-appearance: textfield;
          }
        `}
      </style>
    </div>
  );
}

function base10ToBaseN(n: number, base: number) {
  const digits: number[] = [];
  while (n > 0) {
    digits.push(n % base);
    n = Math.floor(n / base);
  }
  return digits;
}

interface BufferedNumberInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: number;
  setValue: (value: number) => void;
}

function BufferedNumberInput({
  value,
  setValue,
  min,
  max,
  step,
  ...props
}: BufferedNumberInputProps) {
  const [internalValue, setInternalValue] = useState(String(value));

  useEffect(() => {
    setInternalValue(String(value));
  }, [value]);

  return (
    <input
      {...props}
      type="number"
      value={internalValue}
      onChange={(event) => {
        setInternalValue(event.target.value);
        if (
          !isNaN(event.target.value as any as number) &&
          !isNaN(parseFloat(event.target.value))
        ) {
          if (min !== undefined && Number(event.target.value) < Number(min)) {
            setInternalValue(String(Number(min)));
            setValue(Number(min));
            return;
          }
          if (max !== undefined && Number(event.target.value) > Number(max)) {
            setInternalValue(String(Number(max)));
            setValue(Number(max));
            return;
          }
          if (step !== undefined) {
            setValue(
              Math.round(Number(event.target.value) * Number(step)) /
                Number(step)
            );
          } else {
            setValue(Number(event.target.value));
          }
        }
      }}
    />
  );
}
