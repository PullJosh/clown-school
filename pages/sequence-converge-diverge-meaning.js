import { Layout } from "../components/Layout";
import { ComingSoon } from "../components/ComingSoon";
import { VocabTerm } from "../components/VocabTerm";
import { Latex } from "../components/Latex";

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
      <ComingSoon>
        Gallery of example sequences with descriptions of each limit and why
        it's interesting.
      </ComingSoon>
      <p>
        When a sequence converges, we often what to talk about the
        limit&mdash;the number it converges to. We do that mathematically using
        this limit notation:
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
          value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( 1 - \frac{1}{n} \right) = 1`}
          displayMode={true}
        />
        <Latex
          value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( 3 \right) = 3`}
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
