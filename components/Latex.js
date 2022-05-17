import katex from "katex";
import "katex/dist/katex.min.css";

export function Latex({ value, displayMode = false }) {
  return (
    <span
      className={displayMode ? "block" : "inline"}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(value, {
          displayMode: displayMode,
        }),
      }}
    />
  );
}
