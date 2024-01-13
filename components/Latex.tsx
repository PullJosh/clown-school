import katex from "katex";
import "katex/dist/katex.min.css";

interface LatexProps {
  value: string;
  displayMode?: boolean;
  trust?: boolean;
}

export function Latex({
  value,
  displayMode = false,
  trust = false,
}: LatexProps) {
  if (!value) return null;

  if (isSingleLetter(value)) return <PlainTex italic={true}>{value}</PlainTex>;

  if (isNumber(value)) return <PlainTex>{value}</PlainTex>;

  return (
    <span
      className={displayMode ? "block" : "inline"}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(value, { displayMode, trust }),
      }}
    />
  );
}

function isSingleLetter(value: string) {
  return value.length === 1 && value.match(/[a-zA-Z]/i);
}

function isNumber(value: string) {
  return value.match(/^-?(\d*\.)?\d*$/);
}

// Sometimes we just want to render a single variable/number/etc as LaTeX.
// Using the full Latex component for this is overkill, messes with accessibility unnecessarily, etc.
// So this mini component just renders plain text using the latex font instead.
interface PlainTexProps {
  children: React.ReactNode;
  italic?: boolean;
}

export function PlainTex({ children, italic = false }: PlainTexProps) {
  return (
    <span
      style={{
        textRendering: "auto",
        font: "normal 1.21em KaTeX_Main,Times New Roman,serif",
        lineHeight: 1.2,
        textIndent: 0,
        fontStyle: italic ? "italic" : "normal",
      }}
    >
      {children}
    </span>
  );
}
