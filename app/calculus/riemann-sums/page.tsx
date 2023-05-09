"use client";

import Link from "next/link";
import { Latex } from "../../../components/Latex";
import { CarGraph } from "../CarGraph";
import {
  Graph,
  GraphFunction,
  GraphFunctionArea,
  GraphPoint,
  GraphRectangle,
} from "../Graph";
import { Fragment, useState } from "react";
import classNames from "classnames";

import SpideySense from "./spidey-sense.png";
import Image from "next/image";
import {
  FridgeMagnetSlot,
  FridgeMagnets,
} from "../../../components/FridgeMagnets";

export default function RiemannSums() {
  const [guess, setGuess] = useState("");
  const [widths, setWidths] = useState(["", "", "", "", "", ""]);
  const [heights, setHeights] = useState(["", "", "", "", "", ""]);

  const [N, setN] = useState(6);
  const [N2, setN2] = useState(20);

  return (
    <>
      <h1>Riemann Sums</h1>
      <p className="lead">
        We know that finding the area under a function reverses the derivative,
        which is useful for solving problems. But some areas are harder to
        calculate than others.
      </p>

      <p>
        For example, consider the following car. It begins its journy travelling
        at a rate of 60mph, and then slows down over time.
      </p>
      <div className="not-prose">
        <CarGraph
          f={((x) => 60 / (x + 1)).toString()}
          stopwatch={true}
          ticks={[0.5, 10]}
        />
      </div>
      <p>
        The velocity at any given time is represented by the following function:
      </p>
      <Latex displayMode={true} value={String.raw`v(t) = \frac{60}{t+1}`} />
      <p>
        To find the total distance the car travels in 3 hours, we need to find
        the{" "}
        <span className="text-red-800 bg-red-500/20 px-1 py-px rounded">
          shaded area
        </span>{" "}
        under the function.
      </p>
      <h2>Area Estimation</h2>
      <p>
        Finding this area seems... <em>hard</em>, to say the least. For all of
        the{" "}
        <Link href="/calculus/who-cares-about-area">previous car examples</Link>
        , we had some area formula we could use. But now we don't!
      </p>
      <p>
        Still, you might be able to estimate the area. In fact, give it a try!
        Take a look at the following graph and type in your best guess for the
        area under the curve.
      </p>
      <div className="not-prose">
        <Graph
          window={{
            xMin: 0,
            xMax: 3,
            yMin: 0,
            yMax: 60,
          }}
          ticks={[0.5, 10]}
          tickLabels={[true, ((n) => `${n}mph`).toString()]}
        >
          <GraphFunction f={((x) => 60 / (x + 1)).toString()} color="red" />
          <GraphFunctionArea f={((x) => 60 / (x + 1)).toString()} color="red" />
        </Graph>
        <div className="bg-gray-100 rounded-xl mt-6 p-6 text-center">
          <div>Best estimate of total distance travelled:</div>
          <div className="font-math text-3xl">
            <span className="text-red-800 bg-red-500/20 px-2 py-1 rounded-lg">
              Area
            </span>{" "}
            ={" "}
            <input
              className="px-2 py-1 rounded-lg text-center"
              placeholder="???"
              type="number"
              value={guess}
              onChange={(event) => setGuess(event.target.value)}
              min={0}
              max={1000}
            />{" "}
            miles
          </div>
        </div>
      </div>
      <p>
        Hint: Each grid square has an area of 5 miles. Can you count (roughly)
        how many grid squares are covered?
      </p>
      <h2>A Structured Estimation Process</h2>
      {guess === "" ? (
        <p>
          You didn't type in an estimate in the previous section! Maybe you
          didn't notice the box. Maybe you were just feeling lazy. Or maybe,
          just maybe, you knew that we would discover a better method, so
          spending your time on the first attempt wasn't actually that
          important. Well played.
        </p>
      ) : (
        <p>
          You estimated that the area under the curve is approximately {guess}{" "}
          miles.{" "}
          {Number(guess) < 40 &&
            "I'm not gonna lie to you, you lowballed it pretty hard. But that's okay! We're going to come up with a better method."}
          {Number(guess) >= 40 && Number(guess) <= 120 && (
            <>
              That's a pretty good guess! But it is <em>just</em> a guess. We
              can do better with a more structured approach.
            </>
          )}
          {Number(guess) > 120 &&
            "I'll be honest, you got a little overzealous there. The real value is quite a bit lower. But that's okay! We're going to come up with a better method."}
        </p>
      )}
      <p>
        Let's try estimating the area using <em>vertical rectangles only</em>.
        This estimate won't be perfect, and you might be able to think of ways
        to improve it. But it has two crucial benefits that we'll discuss soon.
      </p>
      <div className="not-prose">
        <Graph
          window={{
            xMin: 0,
            xMax: 3,
            yMin: 0,
            yMax: 60,
          }}
          ticks={[0.5, 10]}
          tickLabels={[true, ((n) => `${n}mph`).toString()]}
        >
          <GraphFunction f={((x) => 60 / (x + 1)).toString()} color="red" />
          <GraphFunctionArea f={((x) => 60 / (x + 1)).toString()} color="red" />
          <GraphRectangle
            label="1"
            x1={0}
            x2={0.5}
            y1={0}
            y2={60}
            color="blue"
          />
          <GraphRectangle
            label="2"
            x1={0.5}
            x2={1}
            y1={0}
            y2={40}
            color="blue"
          />
          <GraphRectangle
            label="3"
            x1={1}
            x2={1.5}
            y1={0}
            y2={30}
            color="blue"
          />
          <GraphRectangle
            label="4"
            x1={1.5}
            x2={2}
            y1={0}
            y2={24}
            color="blue"
          />
          <GraphRectangle
            label="5"
            x1={2}
            x2={2.5}
            y1={0}
            y2={20}
            color="blue"
          />
          <GraphRectangle
            label="6"
            x1={2.5}
            x2={3}
            y1={0}
            y2={17.143}
            color="blue"
          />
          <GraphPoint x={0} y={60} color="blue" />
          <GraphPoint x={0.5} y={40} color="blue" />
          <GraphPoint x={1} y={30} color="blue" />
          <GraphPoint x={1.5} y={24} color="blue" />
          <GraphPoint x={2} y={20} color="blue" />
          <GraphPoint x={2.5} y={17.143} color="blue" />
        </Graph>
      </div>
      <p>
        On the graph above I've placed some vertical rectangles. Use the table
        below to calculate their areas.
      </p>
      <div className="not-prose text-center">
        <div className="inline-grid grid-cols-[auto,1fr,auto,1fr,auto,auto] gap-y-1">
          <div />
          <div className="text-center font-bold">Width (hours)</div>
          <div />
          <div className="text-center font-bold">Height (mph)</div>
          <div />
          <div className="text-center font-bold">Area (miles)</div>
          {new Array(6).fill(0).map((_, i) => (
            <Fragment key={i}>
              <div className="rounded-l-lg bg-blue-800/20 border-2 border-r-0 border-blue-800 p-2 flex items-center justify-center">
                <span className="inline-flex w-7 h-7 justify-center items-center bg-blue-800 text-white rounded-full">
                  {i + 1}
                </span>
              </div>
              <div className="relative bg-blue-800/20 py-2 border-t-2 border-b-2 border-blue-800 flex items-stretch justify-center">
                <input
                  className="w-24 px-2 py-1 rounded-md text-center bg-blue-800/10"
                  placeholder="???"
                  type="number"
                  value={widths[i]}
                  onChange={(event) => {
                    const newWidths = [...widths];
                    newWidths[i] = event.target.value;
                    setWidths(newWidths);
                  }}
                  min={0}
                  max={100}
                  step={0.1}
                />
                {widths[i] !== "" && (
                  <SolutionMarker
                    correct={Number(widths[i]) === 0.5}
                    className="absolute top-1 right-0"
                  />
                )}
              </div>
              <div className="bg-blue-800/20 p-2 border-t-2 border-b-2 border-blue-800 flex items-center justify-center">
                <Latex value={String.raw`\times`} />
              </div>
              <div className="relative bg-blue-800/20 py-2 border-t-2 border-b-2 border-blue-800 flex items-center justify-center">
                <input
                  className="w-24 px-2 py-1 rounded-md text-center bg-blue-800/10"
                  placeholder="???"
                  type="number"
                  value={heights[i]}
                  onChange={(event) => {
                    const newHeights = [...heights];
                    newHeights[i] = event.target.value;
                    setHeights(newHeights);
                  }}
                  min={0}
                  max={100}
                  step={0.1}
                />
                {heights[i] !== "" && (
                  <SolutionMarker
                    correct={
                      i === 5
                        ? Math.floor(Number(heights[i]) * 10) / 10 ===
                          Math.floor((60 / (i / 2 + 1)) * 10) / 10
                        : Number(heights[i]) === 60 / (i / 2 + 1)
                    }
                    className="absolute top-1 right-0"
                  />
                )}
              </div>
              <div className="bg-blue-800/20 p-2 border-t-2 border-b-2 border-blue-800 flex items-center justify-center">
                =
              </div>
              <div className="rounded-r-lg bg-blue-800/20 py-2 border-2 border-l-0 border-blue-800 flex items-center justify-center">
                {Number(heights[i]) * 0.5}
              </div>
            </Fragment>
          ))}
          <div className="col-start-4 w-28">
            {/* Up arrow */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 mx-auto">
              <polyline
                points="2 12, 12 2, 22 12"
                fill="none"
                strokeWidth={2}
                className="stroke-gray-900"
              />
              <polyline
                points="12 2, 12 24"
                fill="none"
                strokeWidth={2}
                className="stroke-gray-900"
              />
            </svg>
            <div>Remember that</div>
            <Latex value={String.raw`v(t) = \frac{60}{t+1}`} />
          </div>
          <div className="text-blue-800 col-start-6">
            <span className="font-bold">Total:</span>{" "}
            {Math.round(
              heights
                .map((height, i) => Number(height) * Number(widths[i]))
                .reduce((a, b) => a + b, 0) * 100
            ) / 100}
          </div>
        </div>
      </div>
      <p>
        Take a look at the area estimate produced by using the method above. Do
        you think that it is too high or too low? How does it compare to your
        original guess?
      </p>
      <h2>Why'd We Do That?</h2>
      <p>
        Alright, we have a structured way to make estimates. This strategy is
        called a Riemann sum. But why do it this way, rather than by some other
        method?
      </p>
      <p>Riemann sums have two main benefits:</p>
      <ul>
        <li>
          It's easy to calculate the height of each rectangle based on the
          function.
        </li>
        <li>It's easy to change the number of rectangles.</li>
      </ul>
      <p>
        If you want to get a better estimate, being able to increase the number
        of rectangles is key. Try changing the number of rectangles using the
        slider below and watch what happens.
      </p>
      <div className="not-prose">
        <Graph
          window={{
            xMin: 0,
            xMax: 3,
            yMin: 0,
            yMax: 60,
          }}
          ticks={[0.5, 10]}
          tickLabels={[true, ((n) => `${n}mph`).toString()]}
        >
          <GraphFunction f={((x) => 60 / (x + 1)).toString()} color="red" />
          <GraphFunctionArea f={((x) => 60 / (x + 1)).toString()} color="red" />
          {new Array(N).fill(0).map((_, i) => (
            <Fragment key={i}>
              <GraphRectangle
                label={String(i + 1)}
                x1={(3 * i) / N}
                x2={(3 * (i + 1)) / N}
                y1={0}
                y2={60 / ((3 * i) / N + 1)}
                color="blue"
              />
              <GraphPoint
                x={(3 * i) / N}
                y={60 / ((3 * i) / N + 1)}
                color="blue"
              />
            </Fragment>
          ))}
        </Graph>
        <div className="flex flex-col items-center mt-4">
          <div className="text-3xl text-blue-800 font-bold">N = {N}</div>
          <input
            className="w-64"
            type="range"
            min={1}
            max={50}
            value={N}
            onChange={(event) => setN(Number(event.target.value))}
          />
          <div>
            Total Area:{" "}
            {Math.round(
              new Array(N)
                .fill(0)
                .map((_, i) => ((60 / ((3 * i) / N + 1)) * 3) / N)
                .reduce((a, b) => a + b, 0) * 10
            ) / 10}
          </div>
        </div>
      </div>
      <p>
        Hmmm... As the number of rectangles increases, the estimate improves. In
        fact, it seems to be{" "}
        <Link href="/real-analysis/sequence-converge-diverge-meaning">
          converging
        </Link>{" "}
        to a "perfect" answer.
      </p>
      <h2>Approaching Something Good</h2>
      <p>
        We new have an estimate that can become arbitrarily good simply by
        increasing N, the number of rectangles. That's really powerful! No
        matter how close you want to get to the "true" area, you can do it
        simply by increasing N.
      </p>
      <p>
        But what if you don't want an estimate.{" "}
        <strong>
          Can we find the <em>exact</em> answer?
        </strong>
      </p>
      <Image
        className="w-24 float-right"
        src={SpideySense}
        alt="Spider man thinking hard"
      />
      <p>This is where your calculus spidey senses might start tingling.</p>
      <p>
        When you have an estimate that's getting closer and closer and closer to
        some exact answer, what do you do?{" "}
        <strong>Take a limit, of course!</strong>
      </p>
      <h2>Let's Get Mathy</h2>
      <p>We want to take the following limit:</p>
      <Latex
        value={String.raw`\text{Actual Area} = \lim_{N \rightarrow \infty} \text{Area Estimate}`}
        displayMode={true}
      />
      <p>
        This is great in theory, but we need a way to represent our area
        estimate as math so that we can actually take the limit.
      </p>
      <blockquote>
        The area estimate is the sum of a bunch of rectangle areas, where each
        area is a height times a width. Each width is one N<sup>th</sup> of the
        full width and each height is the value of the function on the left-hand
        side of the rectangle.
      </blockquote>
      <p>
        Let's go ahead and try to convert each part of this definition into
        math. I'll lay out the options, and you arrange the fridge magnets to
        make it all work:
      </p>
      <div className="not-prose">
        <FridgeMagnets
          // prettier-ignore
          options={[
            {
              type: "round",
              content: <Latex displayMode={true} value={String.raw`h_i = f(x_i)`} />,
              correctSlot: 3
            },
            {
              type: "round",
              content: <Latex displayMode={true} value={String.raw`x_i = a + i \cdot \Delta x`} />,
              correctSlot: 4
            },
            {
              type: "round",
              content: <Latex displayMode={true} value={String.raw`A_i = h_i \times \Delta x`} />,
              correctSlot: 1,
            },
            {
              type: "round",
              content: <Latex displayMode={true} value={String.raw`\sum_{i=1}^N A_i`} />,
              correctSlot: 0,
            },
            {
              type: "round",
              content: <Latex displayMode={true} value={String.raw`\Delta x = \frac{b - a}{N}`} />,
              correctSlot: 2,
            },
          ]}
        >
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Math</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The sum of a bunch of rectangle areas...</td>
                <td>
                  <FridgeMagnetSlot id={0} type="round" />
                </td>
              </tr>
              <tr>
                <td>Where each area is a height times a width...</td>
                <td>
                  <FridgeMagnetSlot id={1} type="round" />
                </td>
              </tr>
              <tr>
                <td>
                  Each width is one N<sup>th</sup> of the full width...
                </td>
                <td>
                  <FridgeMagnetSlot id={2} type="round" />
                </td>
              </tr>
              <tr>
                <td>And each height is the value of the function...</td>
                <td>
                  <FridgeMagnetSlot id={3} type="round" />
                </td>
              </tr>
              <tr>
                <td>On the left-hand side of the rectangle.</td>
                <td>
                  <FridgeMagnetSlot id={4} type="round" />
                </td>
              </tr>
            </tbody>
          </table>
        </FridgeMagnets>
      </div>
      <p>When you put all of these parts together, you get the following:</p>
      <Latex
        value={String.raw`\text{Area Estimate} = \sum_{i=1}^N f\left(a + i \cdot \frac{b-a}{N}\right) \cdot \frac{b-a}{N}`}
        displayMode={true}
      />
      <p>
        Amazing! Now we just look back to our original goal... We wanted to take
        the limit of this estimate as{" "}
        <Latex value={String.raw`N \rightarrow \infty`} /> of the area estimate
        to get the actual area:
      </p>
      <Latex
        value={String.raw`\text{Actual Area} = \lim_{N \rightarrow \infty} \left[ \sum_{i=1}^N f\left(a + i \cdot \frac{b-a}{N}\right) \cdot \frac{b-a}{N} \right ]`}
        displayMode={true}
      />
      <h2>What Infinity Buys Us</h2>
      <p>
        Now that we can take a limit, we can let{" "}
        <Latex value={String.raw`N \rightarrow \infty`} />. This means we can
        get an exact answer for the area under the function, which gives us the
        exact distance that the car travelled.
      </p>
      <p>
        Drag the slider all the way to the end for the satisfaction of seeing
        infinity:
      </p>
      <div className="not-prose">
        <Graph
          window={{
            xMin: 0,
            xMax: 3,
            yMin: 0,
            yMax: 60,
          }}
          ticks={[0.5, 10]}
          tickLabels={[true, ((n) => `${n}mph`).toString()]}
        >
          <GraphFunction f={((x) => 60 / (x + 1)).toString()} color="red" />
          <GraphFunctionArea f={((x) => 60 / (x + 1)).toString()} color="red" />
          {N2 === 100 ? (
            <>
              <GraphFunction
                f={((x) => 60 / (x + 1)).toString()}
                color="blue"
              />
              <GraphFunctionArea
                f={((x) => 60 / (x + 1)).toString()}
                color="blue"
              />
              <GraphFunctionArea
                f={((x) => 60 / (x + 1)).toString()}
                color="blue"
              />
            </>
          ) : (
            new Array(N2)
              .fill(0)
              .map((_, i) => (
                <GraphRectangle
                  key={i}
                  x1={(3 * i) / N2}
                  x2={(3 * (i + 1)) / N2}
                  y1={0}
                  y2={60 / ((3 * i) / N2 + 1)}
                  color="blue"
                />
              ))
          )}
        </Graph>
        <div className="flex flex-col items-center mt-4">
          <div className="text-3xl text-blue-800 font-bold">
            <Latex
              value={
                N2 === 100
                  ? String.raw`N \rightarrow \infty`
                  : String.raw`N = ${N2}`
              }
            />
          </div>
          <input
            className="w-64"
            type="range"
            min={1}
            max={100}
            value={N2}
            onChange={(event) => setN2(Number(event.target.value))}
          />
          <div>
            Total Area:{" "}
            {N2 === 100
              ? "83.178..."
              : Math.round(
                  new Array(N2)
                    .fill(0)
                    .map((_, i) => 60 / ((3 * i) / N2 + 1))
                    .reduce((a, b) => a + b, 0) *
                    (3 / N2) *
                    10
                ) / 10}
          </div>
        </div>
      </div>
      <p>
        So it turns out that the exact answer is ≈83.178.{" "}
        {Number(guess) !== 0 && !isNaN(Number(guess)) && (
          <>
            That's{" "}
            {83.178 > parseFloat(guess)
              ? `${Math.round((83.178 / Number(guess) - 1) * 100)}% larger`
              : `${Math.round(
                  (1 - 83.178 / Number(guess)) * 100
                )}% smaller`}{" "}
            than your original guess, {guess}.
          </>
        )}
      </p>
    </>
  );
}

interface SolutionMarkerProps {
  correct: boolean;
  className?: string;
}

function SolutionMarker({ correct, className }: SolutionMarkerProps) {
  return (
    <svg viewBox="0 0 16 16" className={classNames("w-4 h-4", className)}>
      {correct ? (
        <>
          <circle cx={8} cy={8} r={8} className="fill-green-600" />
          <line x1={13} y1={5} x2={7} y2={12} stroke="white" />
          <line x1={7} y1={12} x2={3} y2={8} stroke="white" />
        </>
      ) : (
        <>
          <circle cx={8} cy={8} r={8} className="fill-red-600" />
          <line x1={12} y1={4} x2={4} y2={12} stroke="white" />
          <line x1={4} y1={4} x2={12} y2={12} stroke="white" />
        </>
      )}
    </svg>
  );
}
