import { Layout } from "../components/Layout";
import { ComingSoon } from "../components/ComingSoon";
import { VocabTerm } from "../components/VocabTerm";
import { Latex } from "../components/Latex";
import { Sequence } from "../components/Sequence";

export default function SequenceConvergeDivergeMeaning() {
  return (
    <Layout
      title={
        <>
          What does it mean for a sequence to <VocabTerm>converge</VocabTerm> or{" "}
          <VocabTerm>diverge</VocabTerm>?
        </>
      }
      tldr="A sequence converges if it gets closer and closer to a certain number. Otherwise, it diverges."
    >
      {/* <aside className="border-l-2 px-6">
        In this lesson you'll find an <strong>intuitive explanation</strong> of
        what these terms mean. For a technical definition in terms of{" "}
        <Latex value={String.raw`\varepsilon`} />, see{" "}
        <Link href="/">
          <a>the next lesson</a>
        </Link>
        .
      </aside> */}
      <p>
        Below are six different sequences and two bins labelled{" "}
        <VocabTerm bold>convergent</VocabTerm> and{" "}
        <VocabTerm bold>divergent</VocabTerm>. Your job is to categorize the
        sequences into the bins correctly. We haven't defined these terms yet,
        but you should try to guess what they mean. Don't worry&mdash;you'll get
        a chance to correct any mistakes. It's all trial and error for now.
      </p>
      <ComingSoon>
        Drag-and-drop the sequences (3 - 1/n), ((-1)^n/n), (n^2), (-n), (sin(n /
        10)), and ((-1)^n * n) into the correct bins. Check your answers, then
        correct any mistakes. Repeat until all are correct.
      </ComingSoon>
      <p>Alright. What do these terms actually mean?</p>
      <h2>
        What does <VocabTerm>convergent</VocabTerm> mean?
      </h2>
      <p>
        A <VocabTerm bold>convergent</VocabTerm> sequence is one that gets super
        duper close to a certain number (called the "limit" of the sequence) as{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{n}`} /> gets bigger.
        Visually, this means that the terms all get really close and essentially
        become a horizontal line as{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{n}`} /> gets large.
      </p>
      <p>
        Here are some examples of <VocabTerm bold>convergent</VocabTerm>{" "}
        sequences:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 my-8">
        <div className="not-prose">
          <Sequence
            title={
              <Latex
                value={String.raw`\left( \frac{1}{n} \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
              />
            }
            columnWidth={20}
            allowScrolling={false}
          >
            <Sequence.Graph fn={(n) => 1 / n} limit={0} height={200} />
          </Sequence>
          <p className="leading-normal mt-1">
            This is an extremely common converging sequence that is very useful
            when writing proofs. It converges to 0.
          </p>
        </div>
        <div className="not-prose">
          <Sequence
            title={
              <Latex
                value={String.raw`\left( \frac{(-1)^n}{n} \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
              />
            }
            columnWidth={20}
            allowScrolling={false}
          >
            <Sequence.Graph fn={(n) => (-1) ** n / n} limit={0} height={200} />
          </Sequence>
          <p className="leading-normal mt-1">
            This sequence alternates positive/negative, but it still converges
            to 0.
          </p>
        </div>
        <div className="not-prose">
          <Sequence
            title={
              <Latex
                value={String.raw`\left( 5 + \frac{1}{n} \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
              />
            }
            columnWidth={20}
            allowScrolling={false}
          >
            <Sequence.Graph fn={(n) => 5 + 1 / n} limit={5} height={200} />
          </Sequence>
          <p className="leading-normal mt-1">
            This sequences converges to 5. Obviously, you could change the
            number in the sequence to make it converge to anything you want.
          </p>
        </div>
        <div className="not-prose">
          <Sequence
            title={
              <Latex
                value={String.raw`\left( \frac{4n}{n+2} \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
              />
            }
            columnWidth={20}
            allowScrolling={false}
          >
            <Sequence.Graph
              fn={(n) => (4 * n) / (n + 2)}
              limit={4}
              height={200}
            />
          </Sequence>
          <p className="leading-normal mt-1">
            This sequence converges to 4. If you've ever taken a calculus class,
            this might feel familiar. Intuitively, the +2 in the denominator
            essentially becomes meaningless as n gets large, so the n's cancel
            and we just get 4.
          </p>
        </div>
        <div className="not-prose">
          <Sequence
            title={
              <Latex
                value={String.raw`\left( -3 \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
              />
            }
            columnWidth={20}
            allowScrolling={false}
          >
            <Sequence.Graph fn={(n) => -3} limit={-3} height={200} />
          </Sequence>
          <p className="leading-normal mt-1">
            This is the constant sequence -3, and we say that it converges to
            -3. (This might feel like it goes against the spirit of “getting
            closer and closer” since it's exactly -3 from the very beginning.
            But when we define convergence technically, you'll see that this
            counts.)
          </p>
        </div>
        <div className="not-prose">
          <Sequence
            title={
              <Latex
                value={String.raw`\left( \min \{ n, 7 \} \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
              />
            }
            columnWidth={20}
            allowScrolling={false}
          >
            <Sequence.Graph fn={(n) => Math.min(n, 7)} limit={7} height={200} />
          </Sequence>
          <p className="leading-normal mt-1">
            The min function chooses the smallest option from a set. So if n is
            small, it chooses n. But if n is big, it chooses 7 instead. This
            might feel like cheating, but by the technical definition, this
            sequence definitely converges to 7.
          </p>
        </div>
      </div>
      <p>
        When a sequence converges, we often talk about the <em>limit</em>
        &mdash;the number it converges to. We do that mathematically using this
        limit notation:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <Latex
          value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( \frac{1}{n} \right) = 0`}
          displayMode={true}
        />
        <Latex
          value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( \frac{(-1)^n}{n} \right) = 0`}
          displayMode={true}
        />
        <Latex
          value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( 5 + \frac{1}{n} \right) = 5`}
          displayMode={true}
        />
        <Latex
          value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( \frac{4n}{n+2} \right) = 4`}
          displayMode={true}
        />
        <Latex
          value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( -3 \right) = -3`}
          displayMode={true}
        />
        <Latex
          value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( \min \{ n, 7 \} \right) = 7`}
          displayMode={true}
        />
      </div>
      <p>
        When writing proofs, you might be given some mystery sequence, like{" "}
        <Latex
          value={String.raw`(x_n)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
        />
        , and be told that it converges to some number, like 2. In this case you
        would write{" "}
        <Latex
          value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( x_n \right) = 2`}
        />
        .
      </p>
      <p>
        We also sometimes write things like "
        <Latex value={String.raw`x_n \rightarrow 2`} /> as{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{n \rightarrow \infty}`} />"
        , which means "<Latex value={String.raw`x_n`} /> goes to{" "}
        <Latex value="2" /> as{" "}
        <span className="text-blue-700">
          <Latex value="n" /> goes to <Latex value="\infty" />
        </span>
        ." Hopefully that's intuitive enough.
      </p>
    </Layout>
  );
}
