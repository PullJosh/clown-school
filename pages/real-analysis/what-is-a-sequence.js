import { useState } from "react";
import Link from "next/link";
import { Latex } from "../../components/Latex";
import { MathInput } from "../../components/MathInput";
import evaluatex from "evaluatex/dist/evaluatex";
import { Sequence } from "../../components/Sequence";
import { Layout } from "../../components/Layout";
import { Aside } from "../../components/Aside";
import { VocabTerm } from "../../components/VocabTerm";

export default function WhatIsASequence() {
  const [customSequenceValue, setCustomSequenceValue] = useState(
    String.raw`\frac{n}{n+1}`
  );

  let customSequenceFn;
  try {
    const fn = evaluatex(customSequenceValue, {}, { latex: true });
    customSequenceFn = (n) => {
      try {
        return fn({ n });
      } catch (e) {
        return null;
      }
    };
  } catch (e) {
    customSequenceFn = () => null;
  }

  return (
    <Layout title="What is a sequence?">
      <p className="lead">A sequence is an infinitely long list of numbers.</p>
      <p>
        Take a look at this <strong>sequence</strong> of fractions:
      </p>
      <Sequence columnWidth={80}>
        <Sequence.Terms height={88} render={renderPizzaTermBox} />
        <Sequence.Indicies label={null} />
      </Sequence>
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
          ". Of course, describing the values of <Latex value="x_n" /> really
          ruins the mystery.
        </p>
      </Aside>
      <h2>Graphing Sequences</h2>
      <p>
        It is much easier to understand the behavior of a sequence if you have a
        graph:
      </p>
      <Sequence
        columnWidth={80}
        title={
          <Latex value="\left( \frac{n}{n+1} \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}" />
        }
      >
        <Sequence.Graph fn={(n) => n / (n + 1)} keepInView={[1]}>
          <Sequence.Graph.Points />
        </Sequence.Graph>
        <Sequence.Terms
          height={88}
          render={renderPizzaTermBox}
          label={<Latex value={String.raw`\frac{n}{n+1}`} />}
        />
        <Sequence.Indicies />
      </Sequence>
      <p>
        It looks like the terms of this sequence get closer and closer to 1 as{" "}
        <Latex value="\textcolor{#1d4ed8}{n}" /> gets larger. This concept of{" "}
        <VocabTerm bold>converging to a value</VocabTerm> is essential in
        analysis, so keep your eyes peeled for graphs that look like this.
      </p>
      <Aside>
        <p>
          It makes sense that the sequence converges to 1, because for large{" "}
          <Latex value="\textcolor{#1d4ed8}{n}" />, the terms become fractions
          like <Latex value="\frac{999,999}{1,000,000}" />, which is pretty much
          1.
        </p>
      </Aside>
      <h2 className="font-bold text-2xl sm:text-3xl mt-10 mb-2 text-left">
        Sequence Gallery
      </h2>
      <p>
        The best way to become familiar with sequences is to look at a lot of
        them. The following gallery contains a selection of interesting
        sequences:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 my-8">
        <Sequence
          title={
            <Latex
              value={String.raw`\left( n \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
            />
          }
          columnWidth={20}
          allowScrolling={false}
        >
          <Sequence.Graph fn={(n) => n} limit={0} height={200}>
            <Sequence.Graph.Points />
          </Sequence.Graph>
        </Sequence>
        <Sequence
          title={
            <Latex
              value={String.raw`\left( \frac{1}{n} \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
            />
          }
          columnWidth={20}
          allowScrolling={false}
        >
          <Sequence.Graph fn={(n) => 1 / n} limit={0} height={200}>
            <Sequence.Graph.Points />
          </Sequence.Graph>
        </Sequence>
        <Sequence
          title={
            <Latex
              value={String.raw`\left( (-1)^n \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
            />
          }
          columnWidth={20}
          allowScrolling={false}
        >
          <Sequence.Graph fn={(n) => (-1) ** n} height={200}>
            <Sequence.Graph.Points />
          </Sequence.Graph>
        </Sequence>
        <Sequence
          title={
            <Latex
              value={String.raw`\left( \frac{(-1)^n}{n} \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
            />
          }
          columnWidth={20}
          allowScrolling={false}
        >
          <Sequence.Graph fn={(n) => (-1) ** n / n} limit={0} height={200}>
            <Sequence.Graph.Points />
          </Sequence.Graph>
        </Sequence>
      </div>
      <p>
        If you had to classify these sequences into categories, how might you
        divide them up? (In{" "}
        <Link href="/real-analysis/sequence-converge-diverge-meaning">
          <a>the next section</a>
        </Link>
        , we will discuss one way that mathematicians classify sequences.)
      </p>
      <h2 className="font-bold text-2xl sm:text-3xl mt-10 mb-2 text-left">
        Build Your Own Sequence
      </h2>
      <p>
        Of course! I can't show you all these examples without giving you the
        chance to build a sequence of your own.
      </p>
      <p>
        Enter an expression using{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{n}`} /> into the box below
        to create a sequence.
      </p>
      {/* TODO: Improve this (fix errors, improve paragraph before, add arrow to input?) */}
      <Sequence
        title={
          <>
            <img
              className="absolute -top-8 -left-4 -translate-x-full w-64 pointer-events-none select-none"
              src="/right-arrow.svg"
              alt=""
            />
            <MathInput
              defaultValue={customSequenceValue}
              onChange={(newValue) => setCustomSequenceValue(newValue)}
            />
          </>
        }
      >
        <Sequence.Graph fn={customSequenceFn}>
          <Sequence.Graph.Points />
        </Sequence.Graph>
        <Sequence.Terms
          render={(n) => <Latex value={String.raw`\frac{${n}}{${n + 1}}`} />}
          label={<Latex value={customSequenceValue} />}
        />
        <Sequence.Indicies />
      </Sequence>
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
          width={100}
          height={100}
        >
          <image href="/pizza.svg" width={100} height={100} />
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
