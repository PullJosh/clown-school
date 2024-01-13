import classNames from "classnames";
import {
  ReactNode,
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnswerStatusIcon } from "./Exercise";

interface DataTableProps {
  headers?: { title: ReactNode; subtitle?: ReactNode }[];
  data: ReactNode[][];
  direction: "horizontal" | "vertical";
}

const formatHeader = ({
  title,
  subtitle,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
}) => (
  <div className="-space-y-1">
    <div>{title}</div>
    {subtitle && (
      <div className="text-xs font-normal text-stone-500">{subtitle}</div>
    )}
  </div>
);

export function DataTable({ headers, data, direction }: DataTableProps) {
  const cells = headers
    ? data.map((row, i) => [formatHeader(headers[i]), ...row])
    : data;

  const [width, height] =
    direction === "horizontal"
      ? [cells[0].length, cells.length]
      : [cells.length, cells[0].length];

  return (
    <table className="block max-w-full border-separate border-spacing-0 rounded-lg">
      <tbody>
        {new Array(height).fill(null).map((_, rowIndex, arr) => (
          <tr key={rowIndex} className="divide-x divide-stone-200 rounded-lg">
            {new Array(width).fill(null).map((_, colIndex, rowArr) => {
              const isLeft = colIndex === 0;
              const isRight = colIndex === rowArr.length - 1;
              const isTop = rowIndex === 0;
              const isBottom = rowIndex === arr.length - 1;

              const isHeader = direction === "horizontal" ? isLeft : isTop;
              const Element = isHeader ? "th" : "td";

              let value =
                direction === "horizontal"
                  ? cells[rowIndex][colIndex]
                  : cells[colIndex][rowIndex];

              const padded =
                typeof value === "string" ||
                typeof value === "number" ||
                isHeader;

              return (
                <Element
                  key={colIndex}
                  className={classNames(
                    "border-b border-stone-200 text-center",
                    {
                      "border-t": isTop,
                      "rounded-tl-lg": isTop && isLeft,
                      "rounded-bl-lg": isBottom && isLeft,
                      "!border-l bg-stone-100 font-semibold text-stone-700":
                        isHeader,
                      "bg-white text-stone-800": !isHeader,
                      "!border-r": isRight,
                      "rounded-tr-lg": isTop && isRight,
                      "rounded-br-lg": isBottom && isRight,
                      "px-4 py-2": padded,
                    },
                  )}
                >
                  {padded ? (
                    value
                  ) : (
                    <div className="flex h-full w-full items-stretch justify-center">
                      {value}
                    </div>
                  )}
                </Element>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface DataTableInputProps {
  className?: string;
  value: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
  correct?: boolean | null;
}

export const DataTableInput = forwardRef(function DataTableInput(
  { className, value, onChange, disabled, correct = null }: DataTableInputProps,
  ref: React.Ref<HTMLInputElement>,
) {
  const measureSpanRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<string | number>(
    `calc(${value.length}ch + 0.5rem + 2px)`,
  );

  const sharedClassnames = classNames(
    "text-md h-10 rounded-md border text-center focus:outline-none focus:ring",
    {
      "border-stone-400 px-6 bg-white text-stone-700 focus:border-stone-500 focus:ring-stone-500/20":
        correct === null,
      "border-red-400 bg-red-100 text-red-700 focus:border-red-700 focus:ring-red-500/30":
        correct === false,
      "border-green-600 bg-green-100 text-green-700 focus:border-green-700 focus:ring-green-500/30":
        correct === true,
      "pl-3 pr-9": correct !== null,
    },
    className,
  );

  useLayoutEffect(() => {
    setWidth(measureSpanRef.current?.offsetWidth ?? 0);
  }, [value, sharedClassnames]);

  return (
    <div className="relative m-1 flex flex-grow items-center">
      {/* Create a hidden span used to measure the width of the input for autosizing */}
      <span
        ref={measureSpanRef}
        className={classNames("absolute -z-50 opacity-0", sharedClassnames)}
        aria-hidden="true"
      >
        {value}
      </span>

      <input
        ref={ref}
        type="text"
        className={classNames("w-12 max-w-xs flex-grow", sharedClassnames)}
        style={{ width }}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(event) => {
          const cell =
            event.currentTarget.closest("td") ??
            event.currentTarget.closest("th");

          const columnIndex = Array.from(
            cell?.parentElement?.children ?? [],
          ).indexOf(cell as HTMLElement);

          const row = cell?.closest("tr");

          const rowIndex = Array.from(
            row?.parentElement?.children ?? [],
          ).indexOf(row as HTMLElement);

          const getCell = (rowIndex: number, columnIndex: number) => {
            const table = cell?.closest("table");
            const row = table?.querySelectorAll("tr")[rowIndex];
            return row?.querySelectorAll("td, th")[columnIndex];
          };

          const focusCell = (
            rowIndex: number,
            columnIndex: number,
            position: "start" | "end" | null = null,
          ) => {
            const cell = getCell(rowIndex, columnIndex);
            if (!cell) return false;

            const input = cell.querySelector("input");
            if (!input || input.disabled) return null;

            input.focus();
            if (position) {
              const caretPos = position === "start" ? 0 : input.value.length;
              requestAnimationFrame(() => {
                input.setSelectionRange(caretPos, caretPos);
              });
            }
            return true;
          };

          const moveCaretInDirection = (dx: -1 | 0 | 1, dy: -1 | 0 | 1) => {
            let x = columnIndex + dx;
            let y = rowIndex + dy;

            // Try moving and skip over cells with disabled/missing inputs
            // until you succeed (true) or reach the end of the table (false)
            while (focusCell(y, x, dx === 1 ? "start" : "end") === null) {
              x += dx;
              y += dy;
            }
          };

          if (event.shiftKey || event.ctrlKey || event.metaKey) return;
          switch (event.key) {
            case "ArrowUp":
              moveCaretInDirection(0, -1);
              break;
            case "ArrowDown":
              moveCaretInDirection(0, 1);
              break;
            case "ArrowLeft":
              if (
                event.currentTarget.selectionStart === 0 &&
                event.currentTarget.selectionEnd === 0
              ) {
                moveCaretInDirection(-1, 0);
              }
              break;
            case "ArrowRight":
              if (
                event.currentTarget.selectionStart === value.length &&
                event.currentTarget.selectionEnd === value.length
              ) {
                moveCaretInDirection(1, 0);
              }
              break;
          }
        }}
      />

      {correct !== null && (
        <AnswerStatusIcon
          className="absolute right-2 top-2 h-6 w-6 rounded"
          correct={correct}
        />
      )}
    </div>
  );
});
