"use client";

import classNames from "classnames";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface GraphContext {
  svgRef: React.RefObject<SVGSVGElement> | null;
  window: Window;
  screenRegion: Window;
}
const GraphContext = createContext<GraphContext>({
  svgRef: null,
  window: completeWindow({}),
  screenRegion: completeWindow({
    xMin: 0,
    xMax: 600,
    yMin: 0,
    yMax: 400,
  }),
});

interface GraphProps {
  window?: Partial<Window>;
  children?: React.ReactNode;

  ticks?: [number, number];
  tickLabels?: [
    boolean | ((value: number) => string) | string,
    boolean | ((value: number) => string) | string
  ];
}
export function Graph({
  window: partialWindow = {},

  ticks = [1, 1],
  tickLabels = [false, false],

  children,
}: GraphProps) {
  const window = completeWindow(partialWindow);
  const { xMin, xMax, xMid, width, yMin, yMax, yMid, height } = window;

  const screenRegion = useMemo(
    () =>
      completeWindow({
        xMin: 100,
        xMax: 580,
        yMin: 20,
        yMax: 370,
      }),
    []
  );

  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <GraphContext.Provider value={{ window, screenRegion, svgRef }}>
      <svg ref={svgRef} viewBox="0 0 600 400" className="border rounded">
        <defs>
          <filter x="0" y="0" width="1" height="1" id="solid">
            <feFlood floodColor="white" result="bg" />
            <feMerge>
              <feMergeNode in="bg" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {ticks[0] &&
          getTickValues(ticks[0], xMin, xMax).map((x, i) => (
            <GraphGridLine key={i} direction="vertical" value={x} label="" />
          ))}
        {ticks[1] &&
          getTickValues(ticks[1], yMin, yMax).map((y) => (
            <GraphGridLine key={y} direction="horizontal" value={y} label="" />
          ))}
        {ticks[0] &&
          tickLabels[0] &&
          getTickValues(ticks[0], xMin, xMax).map((x) => (
            <text
              key={x}
              x={((x - xMin) / width) * screenRegion.width + screenRegion.xMin}
              y={screenRegion.yMax}
              dy={16}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="currentColor"
              filter="url(#solid)"
            >
              {typeof tickLabels[0] === "function"
                ? tickLabels[0](x)
                : typeof tickLabels[0] === "string"
                ? eval(tickLabels[0])(x)
                : String(x)}
            </text>
          ))}
        {ticks[1] &&
          tickLabels[1] &&
          getTickValues(ticks[1], yMin, yMax).map((y) => (
            <text
              key={y}
              x={screenRegion.xMin}
              y={
                (1 - (y - yMin) / height) * screenRegion.height +
                screenRegion.yMin
              }
              dx={-12}
              textAnchor="end"
              alignmentBaseline="middle"
              fill="currentColor"
              filter="url(#solid)"
            >
              {typeof tickLabels[1] === "function"
                ? tickLabels[1](y)
                : typeof tickLabels[1] === "string"
                ? eval(tickLabels[1])(y)
                : String(y)}
            </text>
          ))}
        <rect
          x={screenRegion.xMin}
          y={screenRegion.yMin}
          width={screenRegion.width}
          height={screenRegion.height}
          fill="none"
          className="stroke-gray-400"
        />

        {children}
      </svg>
    </GraphContext.Provider>
  );
}

interface GraphFunctionProps {
  f: ((x: number) => number) | string;
  color: "black" | "red" | "blue";
  domain?: [number, number];
}
export function GraphFunction({
  f: fOrStr,
  color,
  domain: domainMaybe,
}: GraphFunctionProps) {
  const { window, screenRegion } = useContext(GraphContext);
  const { xMin, xMax, xMid, width, yMin, yMax, yMid, height } = window;

  const domain = domainMaybe ?? [xMin, xMax];

  const f: (x: number) => number =
    typeof fOrStr === "string" ? eval(fOrStr) : fOrStr;

  return (
    <polyline
      points={Array.from({ length: 600 }, (_, i) => {
        const x = (i / 600) * (domain[1] - domain[0]) + domain[0];
        return [x, f(x)];
      })
        .map(([x, y]) => [x - xMin, y - yMin])
        .map(([x, y]) => [x / width, y / height])
        .map(([x, y]) => [
          x * screenRegion.width + screenRegion.xMin,
          (1 - y) * screenRegion.height + screenRegion.yMin,
        ])
        .map(([x, y]) => `${x}, ${y}`)
        .join(" ")}
      fill="none"
      className={classNames({
        "stroke-gray-800": color === "black",
        "stroke-red-600": color === "red",
        "stroke-blue-600": color === "blue",
      })}
      strokeWidth={2}
    />
  );
}

interface GraphFunctionAreaProps {
  f: ((x: number) => number) | string;
  color: "black" | "red" | "blue";
  domain?: [number, number];
}
export function GraphFunctionArea({
  f: fOrStr,
  color,
  domain: domainMaybe,
}: GraphFunctionAreaProps) {
  const { window, screenRegion } = useContext(GraphContext);
  const { xMin, xMax, xMid, width, yMin, yMax, yMid, height } = window;

  const domain = domainMaybe ?? [xMin, xMax];

  const f = typeof fOrStr === "string" ? eval(fOrStr) : fOrStr;

  return (
    <polygon
      points={[
        [domain[0], 0],
        ...Array.from({ length: 600 }, (_, i) => {
          const x = (i / 600) * (domain[1] - domain[0]) + domain[0];
          return [x, f(x)];
        }),
        [domain[1], 0],
      ]
        .map(([x, y]) => [x - xMin, y - yMin])
        .map(([x, y]) => [x / width, y / height])
        .map(([x, y]) => [
          x * screenRegion.width + screenRegion.xMin,
          (1 - y) * screenRegion.height + screenRegion.yMin,
        ])
        .map(([x, y]) => `${x}, ${y}`)
        .join(" ")}
      className={classNames({
        "fill-gray-800/20": color === "black",
        "fill-red-600/20": color === "red",
        "fill-blue-600/20": color === "blue",
      })}
      strokeWidth={2}
    />
  );
}

interface GraphGridLineProps {
  direction: "horizontal" | "vertical";
  value: number;
  label?: React.ReactNode;
}

export function GraphGridLine({ direction, value, label }: GraphGridLineProps) {
  const { window, screenRegion } = useContext(GraphContext);
  const { xMin, xMax, xMid, width, yMin, yMax, yMid, height } = window;

  let x1: number, x2: number, y1: number, y2: number;
  if (direction === "horizontal") {
    x1 = screenRegion.xMin;
    x2 = screenRegion.xMax;
    y1 =
      (1 - (value - yMin) / height) * screenRegion.height + screenRegion.yMin;
    y2 =
      (1 - (value - yMin) / height) * screenRegion.height + screenRegion.yMin;
  } else {
    x1 = ((value - xMin) / width) * screenRegion.width + screenRegion.xMin;
    x2 = ((value - xMin) / width) * screenRegion.width + screenRegion.xMin;
    y1 = screenRegion.yMin;
    y2 = screenRegion.yMax;
  }

  return (
    <line
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      strokeWidth={1}
      className={classNames(
        String(value) === "0" ? "stroke-gray-700" : "stroke-gray-200"
      )}
    />
  );
}

interface GraphPlayHeadProps {
  x: number;
  setX?: (x: number) => void;
}

export function GraphPlayHead({ x, setX }: GraphPlayHeadProps) {
  const { window, screenRegion, svgRef } = useContext(GraphContext);
  const { xMin, xMax, xMid, width, yMin, yMax, yMid, height } = window;

  const bbox = useBoundingClientRect(svgRef);

  type DragState =
    | { dragging: false }
    | { dragging: true; initialMouseX: number; initialValue: number };

  const [dragState, setDragState] = useState<DragState>({ dragging: false });

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (dragState.dragging) {
        const dx = event.clientX - dragState.initialMouseX;
        console.log(dragState.initialValue, dx, width, screenRegion.width);
        const x =
          dragState.initialValue +
          dx * (width / screenRegion.width) * (600 / (bbox?.width ?? 600));
        setX?.(x);
      }
    },
    [dragState, screenRegion.width, setX, width, bbox]
  );

  const onMouseUp = useCallback(() => {
    setDragState({ dragging: false });
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp, window]);

  return (
    <g
      style={{
        cursor: "grab",
      }}
      onMouseDown={(event) => {
        event.preventDefault();
        setDragState({
          dragging: true,
          initialMouseX: event.clientX,
          initialValue: x,
        });
      }}
    >
      <line
        x1={
          ((x - xMin) / width + xMin) * screenRegion.width + screenRegion.xMin
        }
        x2={
          ((x - xMin) / width + xMin) * screenRegion.width + screenRegion.xMin
        }
        y1={screenRegion.yMin}
        y2={screenRegion.yMax}
        strokeWidth={3}
        className="stroke-blue-700"
      />
      <path
        transform={`translate(${
          ((x - xMin) / width + xMin) * screenRegion.width + screenRegion.xMin
        }, ${screenRegion.yMin}) translate(-12, -12)`}
        d="M0,11.922C0.042,5.335 5.403,0 12,0C18.623,0 24,5.377 24,12C24.569,18.625 17.857,25.316 12,32C6.224,25.371 -0.406,18.759 0,12L0,11.922Z"
        className="fill-blue-700"
      />
    </g>
  );
}

interface GraphRectangleProps {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  color: "black" | "red" | "blue";
  label?: string;
}

export function GraphRectangle({
  x1,
  x2,
  y1,
  y2,
  color,
  label,
}: GraphRectangleProps) {
  const { window, screenRegion, svgRef } = useContext(GraphContext);
  const { xMin, xMax, xMid, width, yMin, yMax, yMid, height } = window;

  const x =
    ((Math.min(x1, x2) - xMin) / width) * screenRegion.width +
    screenRegion.xMin;
  const y =
    (1 - (Math.max(y1, y2) - yMin) / height) * screenRegion.height +
    screenRegion.yMin;

  const w =
    ((Math.max(x1, x2) - Math.min(x1, x2)) / width) * screenRegion.width;

  const h =
    ((Math.max(y1, y2) - Math.min(y1, y2)) / height) * screenRegion.height;

  return (
    <>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        className={classNames({
          "fill-gray-800/20 stroke-gray-800": color === "black",
          "fill-red-800/20 stroke-red-800": color === "red",
          "fill-blue-800/20 stroke-blue-800": color === "blue",
        })}
        strokeWidth={2}
        rx={3}
      />
      {label && (
        <>
          <circle
            cx={x + w / 2}
            cy={y + h / 2}
            r={12}
            className={classNames({
              "fill-gray-800": color === "black",
              "fill-red-800": color === "red",
              "fill-blue-800": color === "blue",
            })}
          />
          <text
            x={x + w / 2}
            y={y + h / 2}
            dy={1}
            fill="white"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {label}
          </text>
        </>
      )}
    </>
  );
}

interface GraphPointProps {
  x: number;
  y: number;
  color: "black" | "red" | "blue";
}

export function GraphPoint({ x, y, color }: GraphPointProps) {
  const { window, screenRegion, svgRef } = useContext(GraphContext);
  const { xMin, xMax, xMid, width, yMin, yMax, yMid, height } = window;

  const svgX = ((x - xMin) / width) * screenRegion.width + screenRegion.xMin;
  const svgY =
    (1 - (y - yMin) / height) * screenRegion.height + screenRegion.yMin;

  return (
    <circle
      cx={svgX}
      cy={svgY}
      r={6}
      className={classNames({
        "fill-gray-800": color === "black",
        "fill-red-800": color === "red",
        "fill-blue-800": color === "blue",
      })}
    />
  );
}

function useBoundingClientRect(ref: React.RefObject<SVGSVGElement> | null) {
  const [boundingClientRect, setBoundingClientRect] = useState<
    DOMRect | undefined
  >(undefined);

  useEffect(() => {
    if (ref?.current) {
      setBoundingClientRect(ref.current.getBoundingClientRect());

      const observer = new ResizeObserver((entries) => {
        setBoundingClientRect(entries[0].contentRect);
      });
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [ref]);

  return boundingClientRect;
}

function getTickValues(step = 1, min = 0, max = 1) {
  let values: number[] = [];
  for (let x = Math.ceil(min / step) * step; x <= max; x += step) {
    values.push(x);
  }
  return values;
}

interface Window {
  xMin: number;
  xMax: number;
  xMid: number;
  width: number;
  yMin: number;
  yMax: number;
  yMid: number;
  height: number;
}

function completeWindow(window: Partial<Window>): Window {
  let { xMin, xMax, xMid, width, yMin, yMax, yMid, height } = window;
  width = width ?? getWidth(xMin, xMid, xMax);
  height = height ?? getWidth(yMin, yMid, yMax);
  if (width === undefined && height !== undefined) {
    width = height * (600 / 400);
  }
  if (height === undefined && width !== undefined) {
    height = width * (400 / 600);
  }
  [xMin, xMax, xMid, width] = completeRange(xMin, xMax, xMid, width);
  [yMin, yMax, yMid, height] = completeRange(yMin, yMax, yMid, height);
  return { xMin, xMax, xMid, width, yMin, yMax, yMid, height };
}

function getWidth(min?: number, mid?: number, max?: number) {
  if (min !== undefined) {
    if (max !== undefined) {
      return max - min;
    }
    if (mid !== undefined) {
      return 2 * (mid - min);
    }
  }
  if (max !== undefined) {
    if (mid !== undefined) {
      return 2 * (max - mid);
    }
  }
  return undefined;
}

function completeRange(
  min: number | undefined,
  max: number | undefined,
  mid: number | undefined,
  width: number | undefined
): [number, number, number, number] {
  if (min !== undefined) {
    if (max !== undefined) {
      return [min, max, (min + max) / 2, max - min];
    }
    if (mid !== undefined) {
      return [min, min + 2 * (mid - min), mid, 2 * (mid - min)];
    }
    if (width !== undefined) {
      return [min, min + width, min + width / 2, width];
    }
    return [min, min + 1, min + 0.5, 1];
  }
  if (max !== undefined) {
    if (mid !== undefined) {
      return [max - 2 * (max - mid), max, mid, (max - mid) * 2];
    }
    if (width !== undefined) {
      return [max - width, max, max - width / 2, width];
    }
    return [max - 1, max, max - 0.5, 1];
  }
  if (mid !== undefined) {
    if (width !== undefined) {
      return [mid - width / 2, mid + width / 2, mid, width];
    }
    return [mid - 0.5, mid + 0.5, mid, 1];
  }
  if (width !== undefined) {
    return [-width / 2, width / 2, 0, width];
  }
  return [-0.5, 0.5, 0, 1];
}
