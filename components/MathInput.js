import { useState, useEffect } from "react";

import "mathquill/build/mathquill.css";

import dynamic from "next/dynamic";
const StaticMathField = dynamic(
  () => import("react-mathquill").then((mod) => mod.StaticMathField),
  { ssr: false }
);

export function MathInput({
  defaultValue = String.raw`\frac{1}{n}`,
  onChange,
}) {
  const [originalDefaultValue] = useState(defaultValue);
  const [mathfield, setMathField] = useState(null);

  useEffect(() => {
    if (mathfield) {
      mathfield.innerFields[0].config({
        handlers: {
          edit: function (field) {
            const value = field.latex();
            if (onChange) {
              onChange(value);
            }
          },
        },
      });
    }
  }, [mathfield, onChange]);

  return (
    <StaticMathField
      mathquillDidMount={(mathfield) => {
        setMathField(mathfield);
      }}
    >{String.raw`\left( \MathQuillMathField{${originalDefaultValue}} \right)_{\textcolor{#1d4ed8}{n \in N}}`}</StaticMathField>
  );
}
