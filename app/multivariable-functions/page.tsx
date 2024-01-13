"use client";

import Link from "next/link";
import Image from "next/image";
import "./style.css";
import { Latex } from "../../components/Latex";
import { FunctionEvaluation } from "./FunctionEvaluation";
import { DataTable } from "./DataTable";
import { NumberInputExercise } from "./NumberInputExercise";
import { TableExercise } from "./TableExercise";
import { ExerciseSet } from "./ExerciseSet";

import UnderConstruction from "./under-construction.png";

import { makeCanvasApp } from "./makeCanvasApp";
const Implicit3DApp = makeCanvasApp(
  import("./Implicit3DApp").then((m) => m.Implicit3DApp),
);

export default function MultivariableFunctions() {
  return (
    <div className="min-h-screen">
      <Image
        src={UnderConstruction}
        alt="Under construction sign"
        className="fixed right-8 top-5 z-50 h-44 w-44 rotate-6"
      />
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-100/80 backdrop-blur-lg">
        <div className="mx-auto flex h-20 max-w-3xl items-stretch px-16">
          <Link href="/" className="mx-auto flex items-center">
            <h1 className="font-headline text-xl font-semibold">
              <span className="mr-1 text-2xl">🤡</span> Clown School
            </h1>
          </Link>
        </div>
        <div
          className="absolute bottom-0 left-0 h-px translate-y-full bg-stone-500"
          style={{
            animation: "grow-progress auto linear",
            animationTimeline: "--page-scroll",
          }}
        />
      </header>
      <main className="mx-auto max-w-3xl px-16 py-12 text-stone-700">
        <h1 className="mb-5 font-headline text-4xl font-bold text-stone-900">
          Multivariable Functions
        </h1>
        <p className="my-4 text-lg leading-7">
          Sometimes we think of functions as little{" "}
          <strong className="font-semibold text-stone-800">machines</strong>{" "}
          that turn an input number into an output number.
        </p>
        <figure className="my-6">
          <div className="relative">
            <svg
              className="w-full rounded-xl border bg-stone-50 shadow-sm"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 570 150"
            >
              <defs>
                <linearGradient id="Gradient1">
                  <stop offset="5%" stopColor="white" />
                  <stop offset="95%" stopColor="blue" />
                </linearGradient>
                <linearGradient id="Gradient2" x1={0} x2={0} y1={0} y2={1}>
                  <stop offset="5%" stopColor="red" />
                  <stop offset="95%" stopColor="orange" />
                </linearGradient>
                <pattern
                  id="dots"
                  x={5}
                  y={5}
                  width={14}
                  height={14}
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx={7} cy={7} r="1.5" className="fill-stone-200/50" />
                </pattern>
              </defs>
              <rect fill="url(#dots)" x={0} y={0} width={570} height={150} />
              <circle cx={285} cy={75} r={16} className="fill-red-600" />
              <text
                x={285}
                y={75}
                dy="1.5"
                dominantBaseline="middle"
                textAnchor="middle"
                className="fill-white"
              >
                5
              </text>
            </svg>
            <button className="absolute bottom-2 left-2 h-6 w-6 rounded bg-stone-200 p-1">
              <span className="sr-only">Play</span>
            </button>
          </div>
          <figcaption className="mt-2 text-center text-sm text-stone-500">
            The function <Latex value={String.raw`f(x) = 2x`} /> is a doubling
            factory.
          </figcaption>
        </figure>
        <p className="my-4 text-lg leading-7">
          But to a mathematician, a function doesn't <em>need</em> to take one
          input and give one output. Some functions take{" "}
          <strong className="font-semibold text-stone-800">
            two numbers as input
          </strong>{" "}
          and give one number as output.
        </p>
        <figure className="my-6">
          <svg
            className="w-full rounded-xl border bg-stone-50 shadow-sm"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 570 150"
          >
            <defs>
              <linearGradient id="Gradient1">
                <stop offset="5%" stopColor="white" />
                <stop offset="95%" stopColor="blue" />
              </linearGradient>
              <linearGradient id="Gradient2" x1={0} x2={0} y1={0} y2={1}>
                <stop offset="5%" stopColor="red" />
                <stop offset="95%" stopColor="orange" />
              </linearGradient>
              <pattern
                id="dots"
                x={5}
                y={5}
                width={14}
                height={14}
                patternUnits="userSpaceOnUse"
              >
                <circle cx={7} cy={7} r="1.5" className="fill-stone-200/50" />
              </pattern>
            </defs>
            <rect fill="url(#dots)" x={0} y={0} width={570} height={150} />
          </svg>
          <figcaption className="mt-2 text-center text-sm text-stone-500">
            The function <Latex value={String.raw`f(x, y) = x + 2y`} /> combines
            two inputs into one output.
          </figcaption>
        </figure>
        <h2 className="mt-12 font-headline text-2xl font-semibold">
          Multivariable Equations
        </h2>
        <p className="my-4 text-lg leading-7">
          Evaluating a function like{" "}
          <Latex value={String.raw`f(x, y) = x^2 + y^2`} /> works the same way
          as evaluating a familiar 2D function. To find{" "}
          <Latex value={String.raw`f(3, 4)`} />, you replace each{" "}
          <Latex value="x" /> with <Latex value="3" /> and each{" "}
          <Latex value="y" /> with <Latex value="4" />.
        </p>
        <div className="my-16">
          <FunctionEvaluation defaultValues={["3", "4"]}>
            {([X, Y], [x, y]) => {
              const num = (n: string) => {
                if (n === "π") {
                  return Math.PI;
                }
                return Number(n);
              };
              let value: string | number = num(x) ** 2 + num(y) ** 2;
              if (isNaN(value) || x === "" || y === "") {
                value = "?";
              }
              return (
                <>
                  <span className="italic">f</span>(<X />, <Y />) = <X />
                  <sup>2</sup> + <Y />
                  <sup>2</sup> ={" "}
                  {typeof value === "number"
                    ? Math.round(value * 1000) / 1000
                    : value}
                </>
              );
            }}
          </FunctionEvaluation>
          <div className="mt-2 text-center text-sm text-stone-500">
            Try changing the inputs!
          </div>
        </div>
        <div className="relative my-4 border-l-4 border-stone-500 px-6 py-3 text-stone-600">
          <svg
            className="absolute -left-[2px] top-2 w-8 -translate-x-1/2"
            viewBox="0 0 24 24"
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
            <circle cx={12} cy={12} r={12} className="fill-stone-500" />
            <g transform="scale(0.75) translate(7 7)">
              <g transform="matrix(1,0,0,1,-5,-3)">
                <g transform="matrix(1,0,0,1,-3,-2)">
                  <path
                    className="fill-stone-100"
                    d="M18.728,5.992C18.369,5.378 17.711,5 17,5C16.289,5 15.631,5.378 15.272,5.992L8.272,17.992C7.912,18.611 7.909,19.375 8.266,19.996C8.622,20.617 9.284,21 10,21L24,21C24.716,21 25.378,20.617 25.734,19.996C26.091,19.375 26.088,18.611 25.728,17.992L18.728,5.992Z"
                  />
                </g>
                <g transform="matrix(1,0,0,0.666667,8,4.33333)">
                  <ellipse
                    className="fill-stone-500"
                    cx={6}
                    cy="17.5"
                    rx={1}
                    ry="1.5"
                  />
                </g>
                <path
                  d="M14,13L14,7"
                  className="stroke-stone-500"
                  strokeWidth={2}
                />
              </g>
            </g>
          </svg>
          <p className="-my-1 text-lg leading-7">
            <strong>Watch out!</strong> Unlike what we're used to, y is an{" "}
            <em>input</em> to this function, not the output.
          </p>
        </div>
        <div className="my-12">
          <NumberInputExercise
            checkAnswer={(answer) => Number(answer) === 11}
            hints={[
              <>
                To evaluate <Latex value={String.raw`f(3, 2)`} />, we need to
                substitute <Latex value="3" /> in for <Latex value="x" /> and{" "}
                <Latex value="2" /> in for <Latex value="y" />.
              </>,
              <>
                Substituting gives{" "}
                <Latex value={String.raw`f(3, 2) = 5 \cdot 3 - 2^2`} />.
              </>,
              <>
                <Latex
                  value={String.raw`f(3, 2) = 5 \cdot 3 - 2^2 = 15 - 4 = 11`}
                />
              </>,
            ]}
          >
            <p>
              If <Latex value={String.raw`f(x, y) = 5x - y^2`} /> then{" "}
              <Latex value={String.raw`f(3, 2) =`} /> ?
            </p>
          </NumberInputExercise>
        </div>
        <h2 className="mt-12 font-headline text-2xl font-semibold">
          Multivariable Tables
        </h2>
        <p className="my-4 text-lg leading-7">
          The table for a multivariable function has two (or more) inputs and
          one output. For example, consider this function that calculates the
          cost of a rental car at $25/day + $0.14/mile.
        </p>
        <div className="my-8 flex items-stretch justify-center space-x-4">
          <div className="flex flex-col justify-around text-right font-semibold">
            <div className="text-red-700">Input #1 →</div>
            <div className="text-red-700">Input #2 →</div>
            <div className="text-blue-700">Output →</div>
          </div>
          <DataTable
            direction="horizontal"
            headers={[
              { title: <Latex value="x" />, subtitle: "Days" },
              { title: <Latex value="y" />, subtitle: "Miles" },
              { title: <Latex value="f(x, y)" />, subtitle: "Price ($)" },
            ]}
            data={[
              ["1", "2", "1", "3", "4"],
              ["30", "65", "24", "92", "105"],
              ["29.2", "59.1", "28.36", "87.88", "114.7"],
            ]}
          />
        </div>
        <div className="my-12">
          <ExerciseSet>
            <TableExercise>
              <p>
                Complete the following table for the function{" "}
                <Latex value={String.raw`f(a, b) = 2ab`} />
              </p>
            </TableExercise>
            <TableExercise>
              <p>
                Complete the following table for the function{" "}
                <Latex value={String.raw`g(x, y) = y - x`} />
              </p>
            </TableExercise>
            <TableExercise>
              <p>
                Complete the following table for the function{" "}
                <Latex value={String.raw`h(a, b, c) = a^2 + b^2 + c^2`} />
              </p>
            </TableExercise>
          </ExerciseSet>
        </div>

        <h2 className="mt-12 font-headline text-2xl font-semibold">
          Multivariable Graphs
        </h2>
        <p className="my-4 text-lg leading-7">
          A normal function with one input and one output is graphed on two
          axes, usually <Latex value="x" /> and <Latex value="y" />.
        </p>
        <div>
          <Latex value={String.raw`y = f(x)`} />
        </div>
        <p className="my-4 text-lg leading-7">
          With a multivariable function, we have more than one input, so we need
          to add a third axis. This makes a 3D graph.
        </p>
        <div>
          <Implicit3DApp
            cameraType="perspective"
            graphType="cartesian"
            width={480}
            height={480}
            latex="x^2 + y^2"
          />
          <Latex value={String.raw`z = f(x, y)`} />
        </div>
      </main>
    </div>
  );
}
