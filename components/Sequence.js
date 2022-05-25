import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { Latex } from "./Latex";
import classNames from "classnames";

import { SequenceContext } from "../util/SequenceComponentContext";

export function Sequence({
  children,
  columnWidth = 50,
  title = null,
  allowScrolling = true,
}) {
  const [scrollElem, setScrollElem] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [elementWidth, setElementWidth] = useState(606); // TODO: Find a better way to get this value

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

  const [scrollingEnabled, setScrollingEnabled] = useState(
    allowScrolling ? true : false
  );

  const onClickScrollLeft = useCallback(() => {
    if (scrollElem && scrollingEnabled) {
      scrollElem.scrollBy({ left: -elementWidth * 0.8, behavior: "smooth" });
    }
  }, [scrollElem, scrollingEnabled, elementWidth]);

  const onDoubleClickScrollLeft = useCallback(() => {
    if (scrollElem && scrollingEnabled) {
      scrollElem.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [scrollElem]);

  const onClickScrollRight = useCallback(() => {
    if (scrollElem && scrollingEnabled) {
      scrollElem.scrollBy({ left: elementWidth * 0.8, behavior: "smooth" });
    }
  }, [scrollElem, scrollingEnabled, elementWidth]);

  const onDoubleClickScrollRight = useCallback(() => {
    if (scrollElem && scrollingEnabled) {
      scrollElem.scrollBy({ left: elementWidth * 5, behavior: "smooth" });
    }
  }, [scrollElem, scrollingEnabled, elementWidth]);

  return (
    <SequenceContext.Provider
      value={{
        nValues,
        visibleCount,
        hiddenCount,
        setScrollingEnabled: allowScrolling ? setScrollingEnabled : null,
        columnWidth,
        scrollElem,
      }}
    >
      <div className="relative select-none">
        {/* Scroll left button */}
        {scrollLeft > 0 && allowScrolling && (
          <SequenceScrollButton
            direction="left"
            onClick={onClickScrollLeft}
            onDoubleClick={onDoubleClickScrollLeft}
          />
        )}

        <div
          ref={(elem) => setScrollElem(elem)}
          className={classNames(
            "static flex hidden-scrollbars bg-gray-50 border border-gray-300 rounded-lg",
            {
              "overflow-x-scroll": scrollingEnabled,
              "overflow-x-hidden": !scrollingEnabled,
            }
          )}
        >
          {/* Spacer div to take up off-screen room for virtualized scrolling */}
          <div
            style={{ width: columnWidth * virtualizedCount }}
            className="flex-shrink-0 flex-grow-0"
          />

          {/* Main content */}
          <div className="flex flex-col divide-y divide-gray-300">
            {children}
          </div>

          {/* Add extra width to the right side just in case you scroll really fast */}
          {/* (Better to have empty space where nothing is currently rendered than a hard stop.) */}
          <div style={{ width: 2000 }} className="flex-shrink-0 flex-grow-0" />
        </div>

        {/* Scroll right button */}
        {allowScrolling && (
          <SequenceScrollButton
            direction="right"
            onClick={onClickScrollRight}
            onDoubleClick={onDoubleClickScrollRight}
          />
        )}

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
}

function SequenceRow({ children, label = null, height }) {
  return (
    <div>
      {children}
      {label && (
        <div
          className="absolute left-0 z-50 flex items-stretch justify-end"
          style={{ height, transform: `translate(-100%, ${-height}px)` }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

Sequence.Graph = function SequenceGraph({
  fn = null,
  height = 300,
  limit = null,
  keepInView = [],
}) {
  const {
    nValues,
    visibleCount,
    hiddenCount,
    setScrollingEnabled,
    columnWidth,
    scrollElem,
  } = useContext(SequenceContext);

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

    if (setScrollingEnabled) {
      setScrollingEnabled(false);
    }

    const startTime = Date.now();
    const duration = 400;
    function update() {
      let progress = (Date.now() - startTime) / duration;
      if (progress > 1) {
        progress = 1;
      }

      const easeInOut = (t) =>
        t < 0.5 ? 4 * t ** 3 : 1 - (2 - 2 * t) ** 3 / 2;
      const easedProgress = easeInOut(progress);

      setMinY(minY + (idealMinY - minY) * easedProgress);
      setMaxY(maxY + (idealMaxY - maxY) * easedProgress);

      if (progress === 1) {
        if (setScrollingEnabled) {
          setScrollingEnabled(true);
        }
      } else {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  };

  const getScreenY = (y) => {
    return height * (1 - (y - minY) / (maxY - minY));
  };

  const gridLineYSpacing = getBestLineSpacing(maxY - minY, height);
  const gridLineYValues = getMultiplesInRange(gridLineYSpacing, minY, maxY);

  const timeoutRef = useRef(null);
  const onScroll = useCallback(() => {
    if (timeoutRef) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      zoomToIdeal();
    }, 200);
  }, [zoomToIdeal]);

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

  const label = (
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
                "text-gray-400": y !== 0,
                "text-gray-500": y === 0,
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
            className="text-gray-300"
            stroke="currentColor"
          />
        ))}
      </svg>
    </div>
  );

  return (
    <SequenceRow label={label} height={height}>
      <svg
        viewBox={`0 0 ${nValues.length * columnWidth} ${height}`}
        width={nValues.length * columnWidth}
        height={height}
      >
        {gridLineYValues.map((y) => (
          <line
            key={y}
            x1={0}
            x2={nValues.length * columnWidth}
            y1={getScreenY(y)}
            y2={getScreenY(y)}
            className={y === 0 ? "text-gray-300" : "text-gray-200"}
            stroke="currentColor"
          />
        ))}
        {fn &&
          nValues.map((n, index) => (
            <circle
              key={n}
              cx={columnWidth * (index + 0.5)}
              cy={getScreenY(fn(n))}
              r={5}
              className="text-gray-900"
              fill="currentColor"
            />
          ))}
      </svg>
    </SequenceRow>
  );
};

Sequence.Terms = function SequenceTerms({ height = 50, render, label }) {
  const { nValues, columnWidth } = useContext(SequenceContext);

  return (
    <SequenceRow
      label={<div className="flex items-center px-2">{label}</div>}
      height={height}
    >
      <div className="flex divide-x divide-gray-300">
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
}) {
  const { nValues, columnWidth } = useContext(SequenceContext);

  return (
    <SequenceRow
      label={<div className="flex items-center px-2">{label}</div>}
      height={height}
    >
      <div className="flex divide-x divide-blue-200">
        {nValues.map((n) => (
          <div
            key={n}
            className="flex items-center justify-center bg-blue-50 text-blue-700 flex-shrink-0 flex-grow-0"
            style={{ width: columnWidth, height }}
          >
            {n}
          </div>
        ))}
      </div>
    </SequenceRow>
  );
};

function SequenceScrollButton({ direction, ...props }) {
  return (
    <button
      className={classNames(
        "absolute z-10 top-px bottom-px w-20 from-gray-50 flex items-center",
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
          "w-7 h-7 rounded-full border border-gray-300 bg-white text-gray-500 flex justify-center items-center",
          {
            "ml-2": direction === "left",
            "mr-2": direction === "right",
          }
        )}
      >
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
            stroke="currentColor"
            fill="none"
            strokeWidth={3}
          />
        </svg>
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
