import { useState, useEffect } from "react";
import { Latex } from "./Latex";
import classNames from "classnames";

export function Sequence({
  renderTermBox,
  graphFn = null,
  graphHeight = 300,
  graphLimit = null,
  keepInGraphView = [],
  termBoxHeight = 50,
  columnWidth = 50,
  termBoxLabel = null,
  indexBoxLabel = (
    <Latex value={String.raw`\textcolor{blue}{n \in \mathbb{N}}`} />
  ),
}) {
  const [scrollElem, setScrollElem] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [elementWidth, setElementWidth] = useState(606);

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

  const visibleNValues = [...new Array(visibleCount)].map(
    (_, i) => hiddenCount + i + 1
  );

  let idealMinY = -1;
  let idealMaxY = 1;
  if (graphFn) {
    [idealMinY, idealMaxY] = getIdealVerticalWindow(
      [...visibleNValues.map((n) => graphFn(n)), ...keepInGraphView],
      graphLimit
    );
  }

  const [minY, setMinY] = useState(idealMinY);
  const [maxY, setMaxY] = useState(idealMaxY);
  const [allowScrolling, setAllowScrolling] = useState(true);

  const zoomToIdeal = () => {
    setAllowScrolling(false);

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
        setAllowScrolling(true);
      } else {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  };

  const getScreenY = (y) => {
    return graphHeight * (1 - (y - minY) / (maxY - minY));
  };

  const indexBoxHeight = 30;

  const gridLineYSpacing = getBestLineSpacing(maxY - minY, graphHeight);
  const gridLineYValues = getMultiplesInRange(gridLineYSpacing, minY, maxY);

  const formatAxisLabel = (y) => {
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
  };

  return (
    <div className="relative select-none">
      <button
        onClick={zoomToIdeal}
        className="absolute bottom-2 right-2 bg-white border rounded px-4 py-2 z-50"
      >
        Zoom
      </button>

      {/* Left column of outside-the-box info */}
      <div className="absolute z-30 top-0 h-full left-0 -translate-x-full py-px space-y-px flex flex-col items-end">
        {graphFn && (
          <div
            className="relative flex-grow-0 flex-shrink-0 flex translate-x-[10px]"
            style={{ height: graphHeight }}
          >
            {/* Number labels */}
            <div className="relative bg-red-500">
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
            <svg
              width={20}
              height={graphHeight}
              viewBox={`0 0 20 ${graphHeight}`}
            >
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
        )}
        <div
          className="flex-grow-0 flex-shrink-0 px-2 flex items-center"
          style={{ height: termBoxHeight }}
        >
          {termBoxLabel}
        </div>
        <div
          className="flex-grow-0 flex-shrink-0 px-2 flex items-center"
          style={{ height: indexBoxHeight }}
        >
          {indexBoxLabel}
        </div>
      </div>

      {/* Main scrolling content */}
      <div className="relative bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
        {/* Scroll left button */}
        {scrollLeft > 0 && (
          <button
            className="absolute z-10 top-0 h-full left-0 w-20 bg-gradient-to-r from-gray-50 flex justify-start items-center"
            onClick={() => {
              if (scrollElem) {
                scrollElem.scrollBy({
                  left: -elementWidth * 0.8,
                  behavior: "smooth",
                });
              }
            }}
            onDoubleClick={() => {
              if (scrollElem) {
                scrollElem.scrollTo({ left: 0, behavior: "smooth" });
              }
            }}
          >
            <div className="w-7 h-7 ml-2 rounded-full border border-gray-300 bg-white text-gray-500 flex justify-center items-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 translate-x-[16%]">
                <polyline
                  points="12,3 3,12 12,21"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth={3}
                />
              </svg>
            </div>
          </button>
        )}

        <div
          ref={(elem) => setScrollElem(elem)}
          className={classNames("flex hidden-scrollbars relative", {
            "overflow-x-scroll": allowScrolling,
            "overflow-x-hidden": !allowScrolling,
          })}
        >
          {/* Spacer div to take up off-screen room for virtualized scrolling */}
          <div
            style={{ width: columnWidth * virtualizedCount }}
            className="flex-shrink-0 flex-grow-0"
          />
          <div className="flex flex-col divide-y divide-gray-300">
            {graphFn && (
              <svg
                viewBox={`0 0 ${nValues.length * columnWidth} ${graphHeight}`}
                width={nValues.length * columnWidth}
                height={graphHeight}
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
                {nValues.map((n, index) => (
                  <circle
                    key={n}
                    cx={columnWidth * (index + 0.5)}
                    cy={getScreenY(graphFn(n))}
                    r={5}
                    className="text-gray-900"
                    fill="currentColor"
                  />
                ))}
              </svg>
            )}
            <div className="flex divide-x divide-gray-300">
              {nValues.map((n) => (
                <div
                  key={n}
                  style={{ width: columnWidth, height: termBoxHeight }}
                  className="flex justify-center items-center overflow-hidden"
                >
                  {renderTermBox(n)}
                </div>
              ))}
            </div>
            <div className="flex divide-x divide-blue-200">
              {nValues.map((n) => (
                <div
                  key={n}
                  className="flex items-center justify-center bg-blue-50 text-blue-700 flex-shrink-0 flex-grow-0"
                  style={{ width: columnWidth, height: indexBoxHeight }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
          {/* Add extra width to the right side just in case you scroll really fast */}
          {/* (Better to have empty space where nothing is currently rendered than a hard stop.) */}
          <div style={{ width: 2000 }} className="flex-shrink-0 flex-grow-0" />
        </div>

        {/* Scroll right button */}
        <button
          className="absolute z-10 top-0 h-full right-0 w-20 bg-gradient-to-l from-gray-50 flex justify-end items-center"
          onClick={() => {
            if (scrollElem) {
              scrollElem.scrollBy({
                left: elementWidth * 0.8,
                behavior: "smooth",
              });
            }
          }}
          onDoubleClick={() => {
            if (scrollElem) {
              scrollElem.scrollBy({
                left: elementWidth * 5,
                behavior: "smooth",
              });
            }
          }}
        >
          <div className="w-7 h-7 mr-2 rounded-full border border-gray-300 bg-white text-gray-500 flex justify-center items-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 translate-x-[-16%]">
              <polyline
                points="12,3 21,12 12,21"
                stroke="currentColor"
                fill="none"
                strokeWidth={3}
              />
            </svg>
          </div>
        </button>
      </div>

      {/* The following CSS is only needed when Latex is included in the TermBox... no idea why */}
      <style jsx>
        {`
          :global(body) {
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
