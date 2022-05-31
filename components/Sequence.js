import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Latex } from "./Latex";
import classNames from "classnames";

import {
  SequenceContext,
  SequenceGraphContext,
} from "../util/SequenceComponentContext";

export const Sequence = forwardRef(function Sequence(
  {
    children,
    columnWidth = 50,
    title = null,
    allowScrolling = true,
    scrollTargetN,
    scrollTargetNLatex = (
      <Latex value={String.raw`\textcolor{#1d4ed8}{n = ${scrollTargetN}}`} />
    ),
  },
  ref
) {
  const [scrollElem, setScrollElem] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [elementWidth, setElementWidth] = useState(704); // TODO: Find a better way to get this value

  useEffect(() => {
    if (scrollElem === null) return;

    const onScroll = () => {
      setScrollLeft(scrollElem.scrollLeft);
    };
    const onResize = () => {
      setElementWidth(scrollElem.offsetWidth);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(scrollElem);
    scrollElem.addEventListener("scroll", onScroll);
    return () => {
      resizeObserver.disconnect();
      scrollElem.removeEventListener("scroll", onScroll);
    };
  }, [scrollElem]);

  const numberToRenderOffscreen = 20;

  const hiddenCount = Math.floor(scrollLeft / columnWidth);
  let virtualizedCount = hiddenCount - numberToRenderOffscreen;
  if (virtualizedCount < 0) {
    virtualizedCount = 0;
  }

  const visibleCount = Math.ceil(elementWidth / columnWidth);
  const renderedCount = visibleCount + 2 * numberToRenderOffscreen;

  const minN = 1 + virtualizedCount;
  const nValues = [...new Array(renderedCount)].map((_, i) => minN + i);

  const leftVisibleN = hiddenCount + 1;
  const rightVisibleN = leftVisibleN + visibleCount - 1;

  const showJumpToNArrow =
    scrollTargetN === undefined
      ? "no"
      : scrollTargetN < leftVisibleN
      ? "left"
      : rightVisibleN < scrollTargetN
      ? "right"
      : "no";

  const onClickScrollLeft = useCallback(() => {
    if (scrollElem && allowScrolling) {
      scrollElem.scrollBy({ left: -elementWidth * 0.8, behavior: "smooth" });
    }
  }, [scrollElem, allowScrolling, elementWidth]);

  const onDoubleClickScrollLeft = useCallback(() => {
    if (scrollElem && allowScrolling) {
      scrollElem.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [scrollElem]);

  const onClickScrollRight = useCallback(() => {
    if (scrollElem && allowScrolling) {
      scrollElem.scrollBy({ left: elementWidth * 0.8, behavior: "smooth" });
    }
  }, [scrollElem, allowScrolling, elementWidth]);

  const onDoubleClickScrollRight = useCallback(() => {
    if (scrollElem && allowScrolling) {
      scrollElem.scrollBy({ left: elementWidth * 5, behavior: "smooth" });
    }
  }, [scrollElem, allowScrolling, elementWidth]);

  const rightSpacerRef = useRef(null);
  const scrollToN = (n) => {
    if (!rightSpacerRef.current) return;

    rightSpacerRef.current.style.width = `${n * columnWidth}px`;
    scrollElem.scrollTo({
      left: n * columnWidth - elementWidth / 2 - columnWidth / 2,
      behavior: n < 1000 ? "smooth" : "auto",
    });
    setTimeout(() => {
      rightSpacerRef.current.style.width = "2000px";
    }, 10);
  };

  // Expose "scrollToN" as a method that can be called from outside the component
  useImperativeHandle(ref, () => ({ scrollToN }));

  return (
    <SequenceContext.Provider
      value={{
        nValues,
        virtualizedCount,
        visibleCount,
        hiddenCount,
        columnWidth,
        scrollElem,
        scrollElemWidth: elementWidth,
      }}
    >
      <div className="relative select-none" ref={ref}>
        {/* Scroll left button */}
        {scrollLeft > 0 &&
          allowScrolling &&
          (showJumpToNArrow === "left" ? (
            <SequenceScrollButton
              direction="left"
              toN={scrollTargetN}
              toNLatex={scrollTargetNLatex}
              onClick={() => scrollToN(scrollTargetN)}
            />
          ) : (
            <SequenceScrollButton
              direction="left"
              onClick={onClickScrollLeft}
              onDoubleClick={onDoubleClickScrollLeft}
            />
          ))}

        {/*
          `transform` added so that position: fixed children will be relative to
          this div, not the whole page. Used for <Sequence.Graph.Layer floating />
        */}
        <div className="transform">
          <div
            ref={(elem) => setScrollElem(elem)}
            className={classNames(
              "static flex hidden-scrollbars bg-slate-50 border border-slate-300 rounded-lg overscroll-x-contain",
              {
                "overflow-x-scroll": allowScrolling,
                "overflow-x-hidden": !allowScrolling,
              }
            )}
          >
            {/* Spacer div to take up off-screen room for virtualized scrolling */}
            <div
              style={{ width: columnWidth * virtualizedCount }}
              className="flex-shrink-0 flex-grow-0"
            />

            {/* Main content */}
            <div className="flex flex-col divide-y divide-slate-300">
              {children}
            </div>

            {/* Add extra width to the right side just in case you scroll really fast */}
            {/* (Better to have empty space where nothing is currently rendered than a hard stop.) */}
            <div
              ref={rightSpacerRef}
              style={{ width: 2000 }}
              className="flex-shrink-0 flex-grow-0"
            />
          </div>
        </div>

        {/* Scroll right button */}
        {allowScrolling &&
          (showJumpToNArrow === "right" ? (
            <SequenceScrollButton
              direction="right"
              toN={scrollTargetN}
              toNLatex={scrollTargetNLatex}
              onClick={() => scrollToN(scrollTargetN)}
            />
          ) : (
            <SequenceScrollButton
              direction="right"
              onClick={onClickScrollRight}
              onDoubleClick={onDoubleClickScrollRight}
            />
          ))}

        {/* Title box */}
        {title && (
          <div className="absolute z-20 -top-4 right-4 bg-white border shadow-sm rounded px-3 py-2">
            {title}
          </div>
        )}

        <style jsx>
          {`
            :global(body) {
              /* The following CSS is only needed when Latex is included in the TermBox... no idea why */
              overflow-x: hidden;
            }

            /* Hide horizontal scroll bar even though it's possible to scroll */
            /* https://stackoverflow.com/a/38994837/2205195 */
            .hidden-scrollbars {
              -ms-overflow-style: none; /* Internet Explorer 10+ */
              scrollbar-width: none; /* Firefox */
            }
            .hidden-scrollbars::-webkit-scrollbar {
              display: none; /* Safari and Chrome */
            }
          `}
        </style>
      </div>
    </SequenceContext.Provider>
  );
});

function SequenceRow({
  children,
  leftLabel = null,
  rightLabel = null,
  height,
}) {
  return (
    <div>
      {leftLabel && (
        <div
          className="absolute left-0 z-50 flex items-stretch justify-end -translate-x-full"
          style={{ height }}
        >
          {leftLabel}
        </div>
      )}
      {rightLabel && (
        <div
          className="absolute right-0 z-50 flex items-stretch justify-start translate-x-full"
          style={{ height }}
        >
          {rightLabel}
        </div>
      )}
      {children}
    </div>
  );
}

Sequence.Graph = function SequenceGraph({
  fn = null,
  height = 300,
  limit = null,
  keepInView = [],
  brace = null,
  children,
}) {
  const { nValues, visibleCount, hiddenCount, columnWidth, scrollElem } =
    useContext(SequenceContext);

  const visibleNValues = [...new Array(visibleCount)].map(
    (_, i) => hiddenCount + i + 1
  );

  let idealMinY = -1;
  let idealMaxY = 1;
  if (fn) {
    [idealMinY, idealMaxY] = getIdealVerticalWindow(
      [...visibleNValues.map((n) => fn(n)), ...keepInView],
      limit
    );
  }

  const [minY, setMinY] = useState(idealMinY);
  const [maxY, setMaxY] = useState(idealMaxY);

  const zoomToIdeal = (instant = false) => {
    if (instant) {
      setMinY(idealMinY);
      setMaxY(idealMaxY);
      return;
    }

    const startTime = Date.now();
    const duration = 400;
    function update() {
      let progress = (Date.now() - startTime) / duration;
      if (progress > 1) {
        progress = 1;
      } else {
        requestAnimationFrame(update);
      }

      const easeInOut = (t) =>
        t < 0.5 ? 4 * t ** 3 : 1 - (2 - 2 * t) ** 3 / 2;
      const easedProgress = easeInOut(progress);

      setMinY(minY + (idealMinY - minY) * easedProgress);
      setMaxY(maxY + (idealMaxY - maxY) * easedProgress);
    }

    requestAnimationFrame(update);
  };

  const getScreenY = (y) => {
    return height * (1 - (y - minY) / (maxY - minY));
  };

  const gridLineYSpacing = getBestLineSpacing(maxY - minY, height);
  const gridLineYValues = getMultiplesInRange(gridLineYSpacing, minY, maxY);

  const timeoutRef = useRef(null);
  const zoomToIdealRef = useRef(zoomToIdeal); // Always use most recent version of zoomToIdeal function
  useEffect(() => {
    zoomToIdealRef.current = zoomToIdeal;
  }, [zoomToIdeal]);

  const [scrollPos, setScrollPos] = useState(0);
  const onScroll = useCallback(() => {
    setScrollPos(scrollElem.scrollLeft);

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      zoomToIdealRef.current();
    }, 200);
  }, [scrollElem, zoomToIdealRef]);

  useEffect(() => {
    // When idealMinY and idealMaxY change...
    // If the change is caused by the user scrolling, just wait and animate the transition at the end
    // But if the change is caused by anything else, update instantly:
    if (timeoutRef.current === null) {
      zoomToIdeal(true);
    }
  }, [idealMinY, idealMaxY]);

  useEffect(() => {
    if (scrollElem) {
      scrollElem.addEventListener("scroll", onScroll);
      return () => {
        scrollElem.removeEventListener("scroll", onScroll);
      };
    }
  }, [scrollElem, onScroll]);

  const leftLabel = (
    <div className="translate-x-[10px] flex">
      {/* Number labels */}
      <div className="relative">
        {gridLineYValues.map((y) => (
          <span
            key={y}
            style={{ top: getScreenY(y) }}
            className={classNames(
              "absolute right-1 leading-none -translate-y-1/2 text-sm whitespace-nowrap",
              {
                "text-slate-400": y !== 0,
                "text-slate-500": y === 0,
              }
            )}
          >
            {formatAxisLabel(y)}
          </span>
        ))}
      </div>

      {/* Tick marks */}
      <svg width={20} height={height} viewBox={`0 0 20 ${height}`}>
        {gridLineYValues.map((y) => (
          <line
            key={y}
            x1={0}
            x2={20}
            y1={getScreenY(y)}
            y2={getScreenY(y)}
            className="stroke-slate-300"
          />
        ))}
      </svg>
    </div>
  );

  let rightLabel = null;
  if (brace) {
    const minY = Math.min(brace.from, brace.to);
    const maxY = Math.max(brace.from, brace.to);

    rightLabel = (
      <div className="relative overflow-hidden">
        <div
          className="ml-2 flex items-center space-x-1 text-xl"
          style={{ marginTop: getScreenY(maxY) }}
        >
          <svg
            width={20}
            height={getScreenY(minY) - getScreenY(maxY)}
            viewBox="0 0 128 460"
            preserveAspectRatio="none"
          >
            <g
              transform="translate(0,460) scale(0.010000,-0.010000)"
              fill="#000000"
              stroke="none"
            >
              <path d="M210 45775 c-29 -30 -52 -56 -49 -59 2 -2 92 -16 199 -30 1397 -188 2453 -586 3273 -1237 161 -128 445 -403 582 -564 804 -946 1231 -2243 1345 -4085 27 -444 30 -884 30 -5385 0 -4645 3 -5104 35 -5690 97 -1772 446 -2894 1168 -3755 130 -156 394 -414 552 -542 665 -534 1492 -913 2650 -1213 l200 -52 3 -49 3 -50 -183 -43 c-217 -51 -632 -169 -843 -239 -1340 -444 -2229 -1082 -2777 -1995 -463 -770 -701 -1749 -778 -3197 -26 -504 -30 -1118 -30 -5730 0 -4609 -3 -5099 -30 -5565 -115 -1978 -567 -3279 -1457 -4195 -348 -359 -724 -634 -1213 -888 -666 -346 -1556 -617 -2555 -778 -93 -15 -172 -29 -174 -31 -3 -2 20 -29 50 -59 l54 -56 205 6 c1358 43 2547 193 3475 438 1344 354 2313 951 2978 1834 725 963 1119 2313 1227 4204 27 474 30 1031 30 5660 0 5205 1 5311 56 5990 146 1826 673 2875 1825 3633 590 389 1419 725 2397 973 l113 29 -3 59 -3 59 -203 53 c-1383 363 -2330 830 -2957 1459 -759 760 -1108 1781 -1195 3490 -5 116 -13 242 -16 280 -3 39 -9 2356 -13 5150 -6 3602 -11 5145 -19 5305 -54 1045 -125 1682 -263 2348 -217 1049 -563 1846 -1087 2504 -135 170 -448 483 -620 620 -994 793 -2378 1222 -4457 1382 -379 30 -1150 66 -1405 66 l-66 0 -54 -55z" />
            </g>
          </svg>
          <div className="h-0 flex items-center">
            <Latex value={brace.label} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <SequenceRow leftLabel={leftLabel} rightLabel={rightLabel} height={height}>
      <div
        className="relative"
        style={{ width: nValues.length * columnWidth, height }}
      >
        <SequenceGraphContext.Provider
          value={{
            width: nValues.length * columnWidth,
            height,
            getScreenY,
            minY,
            maxY,
            scrollPos,
            fn,
          }}
        >
          <Sequence.Graph.Layer>
            {gridLineYValues.map((y) => (
              <line
                key={y}
                x1={0}
                x2={nValues.length * columnWidth}
                y1={getScreenY(y)}
                y2={getScreenY(y)}
                className={y === 0 ? "stroke-slate-300" : "stroke-slate-200"}
              />
            ))}
          </Sequence.Graph.Layer>
          {children}
        </SequenceGraphContext.Provider>
      </div>
    </SequenceRow>
  );
};

Sequence.Graph.Layer = function SequenceGraphLayer({
  children,
  floating = false,
}) {
  const { width, height } = useContext(SequenceGraphContext);
  const { scrollElemWidth } = useContext(SequenceContext);

  const layerWidth = floating ? scrollElemWidth : width;

  return (
    <svg
      className={classNames("pointer-events-none", {
        "absolute inset-0 w-full h-full": !floating,
        "fixed left-0": floating,
      })}
      viewBox={`0 0 ${layerWidth} ${height}`}
      width={layerWidth}
      height={height}
    >
      <g className="pointer-events-auto">{children}</g>
    </svg>
  );
};

Sequence.Graph.Tube = function SequenceGraphTube({
  center = 0,
  radius = 1,
  setRadius,
}) {
  const { width, getScreenY } = useContext(SequenceGraphContext);

  if (radius < 0) return null;

  return (
    <>
      <Sequence.Graph.Layer>
        <rect
          width={width}
          height={getScreenY(center - radius) - getScreenY(center + radius)}
          x={0}
          y={getScreenY(center + radius)}
          className="fill-purple-500/20"
        />
        {[center + radius, center - radius].map((y) => (
          <line
            x1={0}
            x2={width}
            y1={getScreenY(y)}
            y2={getScreenY(y)}
            className="stroke-purple-400"
            strokeDasharray="8,8"
            strokeWidth={2}
          />
        ))}
      </Sequence.Graph.Layer>
      {setRadius && (
        <Sequence.Graph.Layer floating={true}>
          <SequenceGraphTubeHandle
            side="top"
            center={center}
            radius={radius}
            setRadius={setRadius}
          />
          <SequenceGraphTubeHandle
            side="bottom"
            center={center}
            radius={radius}
            setRadius={setRadius}
          />
        </Sequence.Graph.Layer>
      )}
    </>
  );
};

Sequence.Graph.Points = function SequenceGraphPoints({ pointColor }) {
  const { nValues, columnWidth } = useContext(SequenceContext);
  const { fn, getScreenY } = useContext(SequenceGraphContext);

  const getPointColor = (n) => {
    let color;

    if (typeof pointColor === "function") {
      color = pointColor(n);
    } else {
      color = pointColor;
    }

    return color ?? "fill-slate-900";
  };

  return (
    <Sequence.Graph.Layer>
      {nValues.map((n, index) => (
        <circle
          key={n}
          cx={columnWidth * (index + 0.5)}
          cy={getScreenY(fn(n))}
          r={5}
          className={classNames("pointer-events-none", getPointColor(n))}
        />
      ))}
    </Sequence.Graph.Layer>
  );
};

Sequence.Graph.BigNLabel = function SequenceGraphBigNLabel({ N }) {
  const { columnWidth, virtualizedCount } = useContext(SequenceContext);
  const { height } = useContext(SequenceGraphContext);

  const x = columnWidth * (N - virtualizedCount - 0.5);

  return (
    <Sequence.Graph.Layer>
      <foreignObject x={x - 15} y={height - 65} width={30} height={35}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{ textAlign: "center", fontSize: "20px" }}
        >
          <Latex value={String.raw`\textcolor{#1d4ed8}{N}`} />
        </div>
      </foreignObject>
      <line
        x1={x}
        x2={x}
        y1={height - 30}
        y2={height - 10}
        className="stroke-blue-600"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {[-1, 1].map((sign) => (
        <line
          x1={x + 5 * sign}
          x2={x}
          y1={height - 15}
          y2={height - 10}
          className="stroke-blue-600"
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
    </Sequence.Graph.Layer>
  );
};

Sequence.Graph.HighlightPoints = function SequenceGraphHighlightPoints({
  highlighted = () => false,
  fill = "fill-purple-500/10",
  stroke = "stroke-purple-200",
}) {
  const { nValues, columnWidth } = useContext(SequenceContext);
  const { height } = useContext(SequenceGraphContext);

  return (
    <Sequence.Graph.Layer>
      {nValues.map((n, index) => (
        <>
          {highlighted(n) && (
            <rect
              x={index * columnWidth}
              y={0}
              width={columnWidth}
              height={height}
              className={fill}
            />
          )}
          {highlighted(n) !== highlighted(n + 1) && (
            <line
              x1={(index + 1) * columnWidth + 0.5}
              x2={(index + 1) * columnWidth + 0.5}
              y1={0}
              y2={height}
              className={stroke}
            />
          )}
        </>
      ))}
    </Sequence.Graph.Layer>
  );
};

function SequenceGraphTubeHandle({ center, radius, side, setRadius }) {
  const { width, height, getScreenY, minY, maxY } =
    useContext(SequenceGraphContext);

  const { scrollElemWidth } = useContext(SequenceContext);

  const onMouseDown = useDragAndDrop(radius, (dx, dy, oldRadius) => {
    const scale = (maxY - minY) / height;
    const newRadius =
      side === "top"
        ? Math.abs(oldRadius - dy * scale)
        : Math.abs(oldRadius + dy * scale);
    setRadius(newRadius);
  });

  const y = side === "top" ? center + radius : center - radius;

  return (
    <>
      {setRadius && (
        <>
          <rect
            x={scrollElemWidth / 2 - 12}
            y={getScreenY(y) - 4}
            width={24}
            height={8}
            rx={4}
            ry={4}
            className="fill-purple-400"
          />
          <line
            x1={scrollElemWidth / 2 - 8}
            x2={scrollElemWidth / 2 + 8}
            y1={getScreenY(y) - 1}
            y2={getScreenY(y) - 1}
            className="stroke-purple-600"
          />
          <line
            x1={scrollElemWidth / 2 - 8}
            x2={scrollElemWidth / 2 + 8}
            y1={getScreenY(y) + 1}
            y2={getScreenY(y) + 1}
            className="stroke-purple-600"
          />
          <line
            onMouseDown={onMouseDown}
            x1={0}
            x2={scrollElemWidth}
            y1={getScreenY(y)}
            y2={getScreenY(y)}
            className="cursor-grab"
            stroke="transparent"
            strokeWidth={12}
          />
        </>
      )}
    </>
  );
}

Sequence.Terms = function SequenceTerms({ height = 50, render, label }) {
  const { nValues, columnWidth } = useContext(SequenceContext);

  return (
    <SequenceRow
      leftLabel={<div className="flex items-center px-2">{label}</div>}
      height={height}
    >
      <div className="flex divide-x divide-slate-300">
        {nValues.map((n) => (
          <div
            key={n}
            style={{ width: columnWidth, height }}
            className="flex justify-center items-center overflow-hidden"
          >
            {render(n)}
          </div>
        ))}
      </div>
    </SequenceRow>
  );
};

Sequence.Indicies = function SequenceIndicies({
  height = 30,
  label = <Latex value={String.raw`\textcolor{blue}{n \in \mathbb{N}}`} />,
  bolded = () => false,
}) {
  const { nValues, columnWidth } = useContext(SequenceContext);

  return (
    <SequenceRow
      leftLabel={<div className="flex items-center px-2">{label}</div>}
      height={height}
    >
      <div className="flex divide-x divide-blue-200">
        {nValues.map((n) => (
          <div
            key={n}
            className={classNames(
              "flex items-center justify-center bg-blue-50 text-blue-700 flex-shrink-0 flex-grow-0",
              {
                "font-semibold": bolded(n),
                "text-sm": n >= 10_000 && n < 100_000,
                "text-[0.7rem]": n >= 100_000,
              }
            )}
            style={{ width: columnWidth, height }}
          >
            {n}
          </div>
        ))}
      </div>
    </SequenceRow>
  );
};

function SequenceScrollButton({ direction, toN, toNLatex, ...props }) {
  return (
    <button
      className={classNames(
        "absolute z-10 top-px bottom-px w-20 from-slate-50 flex items-center",
        {
          "left-px rounded-l-lg bg-gradient-to-r justify-start":
            direction === "left",
          "right-px rounded-r-lg bg-gradient-to-l justify-end":
            direction === "right",
        }
      )}
      {...props}
    >
      <div
        className={classNames(
          "h-7 rounded-full border flex justify-center items-center",
          {
            "w-7 border-slate-300 bg-white": toN === undefined,
            "space-x-1 whitespace-nowrap border-blue-300 bg-blue-100":
              toN !== undefined,
            "pl-1 pr-3": toN !== undefined && direction === "left",
            "pl-3 pr-1": toN !== undefined && direction === "right",
            "ml-2": direction === "left",
            "mr-2": direction === "right",
          }
        )}
      >
        {toN !== undefined && direction === "right" && toNLatex}
        <svg
          viewBox="0 0 24 24"
          className={classNames("w-4 h-4", {
            "translate-x-[16%]": direction === "left",
            "translate-x-[-16%]": direction === "right",
          })}
        >
          <polyline
            points={
              direction === "left" ? "12,3 3,12 12,21" : "12,3 21,12 12,21"
            }
            className={classNames({
              "fill-slate-500": toN === undefined,
              "fill-blue-700": toN !== undefined,
            })}
            strokeWidth={3}
          />
        </svg>
        {toN !== undefined && direction === "left" && toNLatex}
      </div>
    </button>
  );
}

function getIdealVerticalWindow(values, centerValue = null) {
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  if (centerValue === null) {
    centerValue = (minValue + maxValue) / 2;
  }

  let range = Math.max(maxValue - centerValue, centerValue - minValue) / 0.6;
  if (range === 0) {
    range = 1;
  }

  return [centerValue - range, centerValue + range];
}

function getMultiplesInRange(factor, min, max) {
  min = min / factor;
  max = max / factor;
  let result = [];
  for (let i = Math.ceil(min); i <= Math.floor(max); i++) {
    result.push(i * factor);
  }
  return result;
}

function getBestLineSpacing(valueHeight, pixelHeight) {
  const idealSpacing = (valueHeight / pixelHeight) * 50; // Spaced every 50px is ideal (but not necessarily possible)
  const chooseClosest = (values) => {
    let closest = values[0];
    for (const value of values) {
      if (Math.abs(value - idealSpacing) < Math.abs(closest - idealSpacing)) {
        closest = value;
      }
    }
    return closest;
  };
  const candidates = [
    10 ** Math.floor(Math.log10(idealSpacing)),
    10 ** Math.ceil(Math.log10(idealSpacing)),
    2 * 10 ** Math.floor(Math.log10(idealSpacing / 2)),
    2 * 10 ** Math.ceil(Math.log10(idealSpacing / 2)),
    5 * 10 ** Math.floor(Math.log10(idealSpacing / 5)),
    5 * 10 ** Math.ceil(Math.log10(idealSpacing / 5)),
  ];
  return chooseClosest(candidates);
}

function formatAxisLabel(y) {
  if (Math.abs(y) >= 1_000_000 || (Math.abs(y) < 0.0001 && y !== 0)) {
    const formatter = new Intl.NumberFormat(undefined, {
      notation: "scientific",
    });

    return formatter.format(y);
  }

  const formatter = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 4,
  });

  return formatter.format(y);
}

function useDragAndDrop(trackValue, callback) {
  const [dragStart, setDragStart] = useState(null);

  const onMouseDown = useCallback(
    (event) => {
      setDragStart({
        mouseX: event.clientX,
        mouseY: event.clientY,
        value: trackValue,
      });
    },
    [trackValue]
  );

  const onMouseMove = useCallback(
    (event) => {
      if (dragStart) {
        callback(
          event.clientX - dragStart.mouseX,
          event.clientY - dragStart.mouseY,
          dragStart.value
        );
      }
    },
    [trackValue, dragStart]
  );

  const onMouseUp = useCallback(
    (event) => {
      if (dragStart) {
        callback(
          event.clientX - dragStart.mouseX,
          event.clientY - dragStart.mouseY,
          dragStart.value
        );
        setDragStart(null);
      }
    },
    [trackValue, dragStart]
  );

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseDown]);

  return onMouseDown;
}
