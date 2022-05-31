import classNames from "classnames";

const colors = {
  labeled: "text-blue-700",
  "indexed by": "text-blue-700",

  "converging to a value": "text-purple-600",
  converge: "text-purple-600",
  converges: "text-purple-600",
  convergent: "text-purple-600",
  converging: "text-purple-600",
  convergence: "text-purple-600",

  "divergent to ±∞": "text-teal-600",
  "diverging to ±∞": "text-teal-600",
  "diverges to ±∞": "text-teal-600",
  "diverging to ∞": "text-teal-600",
  "diverging to -∞": "text-teal-600",

  diverge: "text-green-600",
  diverges: "text-green-600",
  divergent: "text-green-600",
  diverging: "text-green-600",
  divergence: "text-green-600",
};

export function VocabTerm({ children, bold = false }) {
  return (
    <em
      className={classNames(
        "not-italic",
        { "font-semibold": bold },
        colors[children]
      )}
    >
      {children}
    </em>
  );
}
