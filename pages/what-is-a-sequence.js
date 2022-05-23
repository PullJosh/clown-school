import { useState } from "react";
import { Latex } from "../components/Latex";
import { MathInput } from "../components/MathInput";
import evaluatex from "evaluatex/dist/evaluatex";
import { Sequence } from "../components/Sequence";
import { Layout } from "../components/Layout";
import { Aside } from "../components/Aside";
import { VocabTerm } from "../components/VocabTerm";

export default function WhatIsASequence() {
  const [customSequenceValue, setCustomSequenceValue] = useState(
    String.raw`\frac{n}{n+1}`
  );

  let customSequenceFn;
  try {
    customSequenceFn = evaluatex(customSequenceValue, {}, { latex: true });
  } catch (e) {
    customSequenceFn = null;
  }

  return (
    <Layout
      title="What is a sequence?"
      tldr="A sequence is an infinitely long list of numbers."
    >
      <p>
        Take a look at this <strong>sequence</strong> of fractions:
      </p>
      <Sequence
        renderTermBox={renderPizzaTermBox}
        termBoxHeight={88}
        columnWidth={80}
        indexBoxLabel={null}
      />
      <p>
        Notice how the sequence is infinitely long (you can keep scrolling
        forever) and each term of the sequence is{" "}
        <VocabTerm bold>labeled</VocabTerm> with a number.
      </p>
      <p>
        These numbers, starting with 1 and counting up, are called the “natural
        numbers”, sometimes indicated by the symbol{" "}
        <Latex value={String.raw`\mathbb{N}`} />:
      </p>
      <Latex
        value={String.raw`\mathbb{N} = \{ \textcolor{#1d4ed8}{1, 2, 3, 4, 5, 6, 7, 8, 9, 10,...} \}`}
        displayMode={true}
      />
      <p>
        Since each natural number corresponds with a term in the pizza sequence,
        we say that this sequence is <VocabTerm bold>indexed by</VocabTerm> the
        natural numbers.
      </p>
      <Aside>
        <p>
          It's also possible to have a sequence that is indexed by some other
          set, like the integers:{" "}
          <Latex
            value={String.raw`\mathbb{Z} = \{ ..., -2, -1, 0, 1, 2,... \}`}
          />
          . That kind of sequence would be infinite in both directions, not just
          to the right.
        </p>
      </Aside>
      <h2>Notation for Sequences</h2>
      <p>
        A sequence is very similar to a function. For example, our pizza
        sequence is a little bit like the function{" "}
        <Latex
          value={String.raw`f(\textcolor{#1d4ed8}{n}) = \frac{n}{n + 1}`}
        />
        . (Because
        <Latex value={String.raw`f(\textcolor{#1d4ed8}{1}) = \frac 12`} />,{" "}
        <Latex value={String.raw`f(\textcolor{#1d4ed8}{2}) = \frac 23`} />, and
        so on.)
      </p>
      <p>
        But we don't generally use function notation for sequences. Instead, we
        write them like this:
        <Latex
          value={String.raw`\left(\frac{n}{n+1}\right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
          displayMode={true}
        />
        This notation basically means "compute{" "}
        <Latex value={String.raw`\frac{n}{n + 1}`} /> for all{" "}
        <Latex value="n" /> in <Latex value={String.raw`\mathbb{N}`} />
        ". Which makes sense, because that's exactly what our pizza sequence is.
      </p>
      <p>
        But sometimes we don't know exactly what our sequence is. When writing
        proofs, we will often discuss{" "}
        <VocabTerm bold>mystery sequences</VocabTerm>, where we know some{" "}
        <i>properties</i> of the sequence but not its exact values. In that
        case, we can't write an exact formula for the terms, so we just write
        <Latex
          value={String.raw`(x_n)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
          displayMode={true}
        />
        instead. Here, <Latex value="x_n" /> is a mystery function that has an
        unknown value for each <Latex value="\textcolor{#1d4ed8}{n}" />.
      </p>
      <Aside>
        <p>
          If you're in the mood for using mystery notation, you could describe
          the pizza sequence as "
          <Latex value={String.raw`(x_n)_{n \in \mathbb{N}}`} /> where{" "}
          <Latex value={String.raw`x_n = \frac{n}{n+1}`} /> for all{" "}
          <Latex value="n" /> in <Latex value={String.raw`\mathbb{N}`} />
          ". Of course, once you describe what the values of{" "}
          <Latex value="x_n" /> are, you really ruin the mystery.
        </p>
      </Aside>
      <h2>Graphing Sequences</h2>
      <p>
        It is much easier to understand the behavior of a sequence if you have a
        graph:
      </p>
      <div className="relative">
        <Sequence
          graphFn={(n) => n / (n + 1)}
          renderTermBox={renderPizzaTermBox}
          termBoxHeight={88}
          columnWidth={80}
          termBoxLabel={<Latex value={String.raw`\frac{n}{n+1}`} />}
          graphLimit={1}
          keepInGraphView={[0]}
        />
        <div className="absolute z-20 -top-4 right-4 bg-white border shadow-sm rounded px-3 py-2">
          <Latex value="\left( \frac{n}{n+1} \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}" />
        </div>
      </div>
      <p>
        It looks like the terms of this sequence get closer and closer to 1 as{" "}
        <Latex value="\textcolor{#1d4ed8}{n}" /> gets larger. This concept of{" "}
        <VocabTerm bold>converging to a value</VocabTerm> is essential in
        analysis, so keep your eyes peeled for graphs that look like this.
      </p>
      <Aside>
        It makes sense that the sequence converges to 1, because for large{" "}
        <Latex value="\textcolor{#1d4ed8}{n}" />, the terms become fractions
        like <Latex value="\frac{999,999}{1,000,000}" />, which is pretty much
        1.
      </Aside>
      <h2 className="font-bold text-2xl sm:text-3xl mt-10 mb-2 text-left">
        Sequence Gallery
      </h2>
      <p>
        The best way to become familiar with sequences is to look at a lot of
        them. The following gallery contains a selection of interesting
        sequences:
      </p>
      <Sequence
        renderTermBox={(n) => <Latex value={String.raw`${n}`} />}
        termBoxLabel={<Latex value="n" />}
        graphFn={(n) => n}
        keepInGraphView={[0]}
      />
      <Sequence
        renderTermBox={(n) => <Latex value={String.raw`\frac{1}{${n}}`} />}
        termBoxLabel={<Latex value={String.raw`\frac{1}{n}`} />}
        graphFn={(n) => 1 / n}
        graphLimit={0}
      />
      <Sequence
        renderTermBox={(n) => <Latex value={`${(-1) ** n}`} />}
        termBoxLabel={<Latex value="(-1)^n" />}
        graphFn={(n) => (-1) ** n}
      />
      <Sequence
        renderTermBox={(n) => (
          <Latex value={String.raw`${n % 2 === 1 ? "-" : ""}\frac{1}{${n}}`} />
        )}
        termBoxLabel={<Latex value="(-1)^n \cdot \frac{1}{n}" />}
        graphFn={(n) => (-1) ** n / n}
        graphLimit={0}
      />
      <p>
        If you had to classify these sequences into categories, how might you
        divide them up? (In the next section, we will discuss one way that
        mathematicians classify sequences.)
      </p>
      <h2 className="font-bold text-2xl sm:text-3xl mt-10 mb-2 text-left">
        Build Your Own Sequence
      </h2>
      <p>
        Of course! I can't show you all these examples without giving you the
        chance to build a sequence of your own.
      </p>
      <div className="relative">
        <Sequence
          graphFn={
            customSequenceFn ? (n) => customSequenceFn({ n }) : undefined
          }
          renderTermBox={(n) => (
            <Latex value={String.raw`\frac{${n}}{${n + 1}}`} />
          )}
          termBoxLabel={<Latex value={customSequenceValue} />}
        />
        <div className="absolute z-20 -top-4 right-4 bg-white border shadow-sm rounded px-3 py-2">
          <MathInput
            defaultValue={customSequenceValue}
            onChange={(newValue) => setCustomSequenceValue(newValue)}
          />
        </div>
      </div>
    </Layout>
  );
}

function renderPizzaTermBox(n) {
  return (
    <div className="flex flex-col justify-center items-center relative space-y-2">
      <PizzaSVG numerator={n} denominator={n + 1} />
      <div className="text-base">
        <Latex value={String.raw`${n} / ${n + 1}`} />
      </div>
    </div>
  );
}

function PizzaSVG({ numerator, denominator, ...props }) {
  const angle = Math.PI / 2 - 2 * Math.PI * (numerator / denominator);

  return (
    <svg viewBox="0 0 100 100" className="w-10 h-10" {...props}>
      <defs>
        <clipPath id={`cut-fraction-${numerator}-${denominator}`}>
          <path
            d={`M 50 0 L 50 50 L ${50 + 50 * Math.cos(angle)} ${
              50 - 50 * Math.sin(angle)
            } A 50 50 0 1 0 50 0`}
          />
        </clipPath>
        <pattern
          id="pizza-pattern"
          patternUnits="userSpaceOnUse"
          width="100"
          height="100"
        >
          <circle cx={50} cy={50} r={50} fill="#d8ab63" />
          <path
            d="M51 8c8 .333 15.847 5.529 23 10 8 5 11.544 8.455 15 14 3.456 5.545 5.981 17.824 3 27-2.981 9.176-3.773 13.934-11 20-7.227 6.066-15.124 14.165-29 14-13.876-.165-18.731-4.481-25-10-6.269-5.519-13.334-8.632-16-19-2.666-10.368-2.335-18.539 1-27 3.335-8.461 5.451-13.548 12-19S43 7.667 51 8z"
            fill="#ffda79"
          />
          <circle
            cx={44}
            cy={34}
            r={9}
            fill="#891d0a"
            transform="translate(8.722 -1.056) scale(.72222)"
          />
          <circle
            cx={44}
            cy={34}
            r={9}
            fill="#891d0a"
            transform="translate(34.722 4.944) scale(.72222)"
          />
          <circle
            cx={44}
            cy={34}
            r={9}
            fill="#891d0a"
            transform="translate(18.722 22.944) scale(.72222)"
          />
          <circle
            cx={44}
            cy={34}
            r={9}
            fill="#891d0a"
            transform="translate(-7.278 17.944) scale(.72222)"
          />
          <circle
            cx={44}
            cy={34}
            r={9}
            fill="#891d0a"
            transform="translate(-4.278 40.944) scale(.72222)"
          />
          <circle
            cx={44}
            cy={34}
            r={9}
            fill="#891d0a"
            transform="translate(16.722 55.944) scale(.72222)"
          />
          <circle
            cx={44}
            cy={34}
            r={9}
            fill="#891d0a"
            transform="translate(43.722 36.944) scale(.72222)"
          />
          <path
            d="M65 46c-.167 1 2.313 4.843 4 4 2.333-1.167 7.167-8.667 10-11 1.96-1.614 6.5-1.833 7-3s-2.313-4.843-4-4c-2.667 1.333-9.167 9.667-12 12-1.386 1.141-4.833 1-5 2z"
            fill="#208019"
            transform="translate(.424 3.88)"
          />
          <path
            d="M65 46c-.167 1 2.313 4.843 4 4 2.333-1.167 8.207-7.684 10-11 1.415-2.618 1.028-7.667.757-8.896-.203-.921-1.841.752-2.383 1.524C75.748 33.944 72.062 41.605 70 44c-1.171 1.36-4.833 1-5 2z"
            fill="#208019"
            transform="rotate(77.601 48.325 44.363)"
          />
          <path
            d="M65.644 49.361c-.167 1 2.456 1.337 3.356.639 2.226-1.727 7.902-7.94 10-11 1.471-2.146 2.862-6.134 2.591-7.363-.271-1.229-3.256-1.034-4.217-.009C75.442 33.689 71.955 41.044 70 44c-1.27 1.921-4.19 4.361-4.356 5.361z"
            fill="#208019"
            transform="matrix(.50394 .56112 -.56215 .50486 20.555 -7.139)"
          />
          <path
            d="M65.644 49.361c-.167 1 2.456 1.337 3.356.639 2.226-1.727 6.285-7.963 10-11 3.679-3.007 12.116-6.118 12.292-7.221.176-1.103-7.982-1.265-11.234.602C76.509 34.418 72.402 41.17 70 44c-1.49 1.755-4.19 4.361-4.356 5.361z"
            fill="#208019"
            transform="matrix(.50394 .56112 -.56215 .50486 26.859 -28.27)"
          />
          <path
            d="M72.027 44.663c.572 1.041 3.024 1.714 4.109.833C77.298 44.552 77.245 40.588 79 39c2.526-2.286 12.116-6.118 12.292-7.221.176-1.103-8.136-.643-11.234.602-3.099 1.245-6.019 4.82-7.357 6.867-.996 1.522-1.247 4.374-.674 5.415z"
            fill="#208019"
            transform="matrix(-.09132 .74865 -.75002 -.09148 89.775 -37.727)"
          />
          <path
            d="M72.027 44.663c.572 1.041 3.024 1.714 4.109.833C77.298 44.552 77.245 40.588 79 39c2.526-2.286 12.116-6.118 12.292-7.221.176-1.103-8.136-.643-11.234.602-3.099 1.245-6.019 4.82-7.357 6.867-.996 1.522-1.247 4.374-.674 5.415z"
            fill="#f2f3c6"
            transform="matrix(-.7448 -.11868 .1189 -.74616 122.723 117.153)"
          />
          <path
            d="M76.407 47.809c.493.626 1.531-.856 1.756-1.619.432-1.468-.788-5.406.837-7.19 2.188-2.402 11.763-6.302 12.292-7.221.53-.918-6.246.558-9.115 1.711-3.098 1.244-8.515 3.371-9.476 5.758-.962 2.386 2.796 7.404 3.706 8.561z"
            fill="#f2f3c6"
            transform="matrix(-.7448 -.11868 .1189 -.74616 93.224 108.741)"
          />
          <path
            d="M67.61 37.087c.143.895 6.772 5.977 9.076 6.392 2.016.364 3.149-2.62 4.748-3.9 2.434-1.95 9.734-6.785 9.858-7.8.124-1.015-6.537.656-9.115 1.711-2.421.99-3.921 4.017-6.349 4.616-2.428.6-8.361-1.915-8.218-1.019z"
            fill="#f2f3c6"
            transform="matrix(-.7448 -.11868 .1189 -.74616 89.947 83.197)"
          />
          <path
            d="M68.846 44.832c.143.896 5.742-.477 7.84-1.353 1.89-.789 3.149-2.62 4.748-3.9 2.434-1.95 9.734-6.785 9.858-7.8.124-1.015-6.537.656-9.115 1.711-2.421.99-4.356 2.921-6.349 4.616-2.222 1.891-7.125 5.831-6.982 6.726z"
            fill="#f2f3c6"
            transform="matrix(-.19936 -.72737 .7287 -.19972 53.681 107.116)"
          />
          <circle
            cx={26.487}
            cy={23.487}
            r={2.487}
            fill="none"
            stroke="#000"
            strokeWidth="2px"
            transform="translate(0 4.026)"
          />
          <circle
            cx={26.487}
            cy={23.487}
            r={2.487}
            fill="none"
            stroke="#000"
            strokeWidth="2px"
            transform="translate(24.502 4.026)"
          />
          <circle
            cx={26.487}
            cy={23.487}
            r={2.487}
            fill="none"
            stroke="#000"
            strokeWidth="2px"
            transform="translate(-6 31.244)"
          />
          <circle
            cx={26.487}
            cy={23.487}
            r={2.487}
            fill="none"
            stroke="#000"
            strokeWidth="2px"
            transform="translate(36.442 40)"
          />
          <circle
            cx={26.487}
            cy={23.487}
            r={2.487}
            fill="none"
            stroke="#000"
            strokeWidth="2px"
            transform="translate(56 26.27)"
          />
          <circle
            cx={26.487}
            cy={23.487}
            r={2.487}
            fill="none"
            stroke="#000"
            strokeWidth="2px"
            transform="translate(11 56.153)"
          />
          <circle
            cx={26.487}
            cy={23.487}
            r={2.487}
            fill="none"
            stroke="#000"
            strokeWidth="2px"
            transform="translate(15.974 34.955)"
          />
          <circle
            cx={26.487}
            cy={23.487}
            r={2.487}
            fill="none"
            stroke="#000"
            strokeWidth="2px"
            transform="translate(34.498 20.574)"
          />
          <circle
            cx={26.487}
            cy={23.487}
            r={2.487}
            fill="none"
            stroke="#000"
            strokeWidth="2px"
            transform="translate(53.026 6.718)"
          />
          <path
            d="M55.487 17v24.487V17zm-13.256 3.281l13.256 21.206-13.256-21.206zm-9.705 8.963l22.961 12.243-22.961-12.243zm-3.552 12.243h26.513-26.513zm3.552 12.244l22.961-12.244-22.961 12.244zm9.705 8.962l13.256-21.206-13.256 21.206zm13.256 3.281V41.487v24.487zm13.257-3.281L55.487 41.487l13.257 21.206zm9.704-8.962L55.487 41.487l22.961 12.244zM82 41.487H55.487 82zm-3.552-12.243L55.487 41.487l22.961-12.243zm-9.704-8.963L55.487 41.487l13.257-21.206z"
            fill="none"
            stroke="#000"
            strokeOpacity={0.2}
            strokeWidth="1.02px"
            strokeLinecap="butt"
            transform="matrix(1.88558 -.00028 .0003 2.0422 -54.638 -34.71)"
          />
        </pattern>
      </defs>
      <circle
        cx={50}
        cy={50}
        r={50}
        clipPath={`url(#cut-fraction-${numerator}-${denominator})`}
        fill="url(#pizza-pattern)"
      />
    </svg>
  );
}
