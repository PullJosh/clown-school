"use client";

import {
  Graph,
  GraphFunction,
  GraphFunctionArea,
  GraphPlayHead,
} from "./Graph";
import { useStopwatch } from "./useStopwatch";
import { Car } from "./Car";
import { Speedometer } from "./Speedometer";

interface CarGraphProps {
  f: ((x: number) => number) | string; // Allow passing fn.toString() across client/server boundary
  stopwatch: boolean;
  ticks?: [number, number];
}

export function CarGraph({
  f: fOrStr,
  stopwatch: showStopwatch,
  ticks = [1, 20],
}: CarGraphProps) {
  const stopwatch = useStopwatch([0, 3]);

  const f: (x: number) => number =
    typeof fOrStr === "string" ? eval(fOrStr) : fOrStr;

  return (
    <div className="grid grid-cols-[2fr,1fr] gap-x-4 grid-rows-[auto,auto]">
      <Graph
        window={{
          yMin: 0,
          yMax: 60,
          xMin: 0,
          xMax: 3,
        }}
        ticks={ticks}
        tickLabels={[true, (n) => `${n}mph`]}
      >
        <GraphFunction f={f} color="red" />
        <GraphFunctionArea f={f} domain={[0, 3]} color="red" />
        {showStopwatch && (
          <GraphPlayHead x={stopwatch.time} setX={(x) => stopwatch.reset(x)} />
        )}
      </Graph>
      <div className="self-center">
        <Car speed={f(stopwatch.time)} />
        <Speedometer className="w-20 mx-auto mt-4" speed={f(stopwatch.time)} />
      </div>
      {showStopwatch && (
        <div className="col-span-full space-x-1 py-1">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-px px-2 rounded"
            onClick={() => {
              if (stopwatch.running) {
                stopwatch.stop();
              } else {
                if (stopwatch.time === 3) {
                  stopwatch.start(0);
                } else {
                  stopwatch.start();
                }
              }
            }}
          >
            {stopwatch.running ? "Pause" : "Play"}
          </button>
          {stopwatch.time > 0 && (
            <button
              className="bg-white hover:bg-gray-100 text-gray-600 py-px px-2 rounded"
              onClick={() => stopwatch.reset()}
            >
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
}
