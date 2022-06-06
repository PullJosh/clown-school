import Link from "next/link";
import { Layout } from "../../components/Layout";
import { ComingSoon } from "../../components/ComingSoon";
import { VocabTerm } from "../../components/VocabTerm";
import { Latex } from "../../components/Latex";
import { Sequence } from "../../components/Sequence";

export default function SequenceConvergeDivergeMeaning() {
  return (
    <Layout
      title={
        <>
          What does it mean for a sequence to <VocabTerm>converge</VocabTerm> or{" "}
          <VocabTerm>diverge</VocabTerm>?
        </>
      }
    >
      <p className="lead">
        A sequence converges if it gets closer and closer to a certain number.
        Otherwise, it diverges.
      </p>
      <p>
        In the previous section we looked at the pizza sequence,{" "}
        <Latex
          value={String.raw`\left( \frac{n}{n+1} \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
        />
        , and noticed that as{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{n}`} /> gets larger, the
        sequence terms get closer and closer to 1. This is called{" "}
        <VocabTerm bold>convergence</VocabTerm>, and it's a crucial concept in
        analysis.
      </p>
      <p>
        In this lesson we will get a feel for{" "}
        <VocabTerm bold>convergence</VocabTerm> (and its opposite,{" "}
        <VocabTerm bold>divergence</VocabTerm>) by looking at examples. In{" "}
        <Link href="/real-analysis/technical-definition-sequence-convergence">
          <a>the next lesson</a>
        </Link>
        , we will write a more precise mathematical definition of convergence
        and begin to prove, rigorously, that sequences converge or diverge.
      </p>
      <div className="relative pt-px">
        <div className="absolute top-0 left-1/2 ml-[-50vw] -z-50 w-screen h-1/2 bg-gradient-to-b from-purple-50" />
        <h2>
          What does <VocabTerm>convergent</VocabTerm> mean?
        </h2>
        <p>
          A <VocabTerm bold>convergent</VocabTerm> sequence is one that gets
          infinitely close to a certain number&mdash;called the "limit" of the
          sequence&mdash;as <Latex value={String.raw`\textcolor{#1d4ed8}{n}`} />{" "}
          gets bigger. Visually, this means that the terms all get really close
          and essentially become a horizontal line as{" "}
          <Latex value={String.raw`\textcolor{#1d4ed8}{n}`} /> gets large.
          (We'll give{" "}
          <Link href="/real-analysis/prove-sequence-convergence">
            <a>a more technical definition</a>
          </Link>{" "}
          soon.)
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
              <Sequence.Graph fn={(n) => 1 / n} limit={0} height={200}>
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              This is an extremely common converging sequence that is very
              useful when writing proofs. It{" "}
              <span className="text-purple-600 font-semibold">
                converges to 0
              </span>
              .
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
              <Sequence.Graph fn={(n) => (-1) ** n / n} limit={0} height={200}>
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              This sequence alternates positive/negative, but it still{" "}
              <span className="text-purple-600 font-semibold">
                converges to 0
              </span>
              .
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
              <Sequence.Graph fn={(n) => 5 + 1 / n} limit={5} height={200}>
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              This sequences{" "}
              <span className="text-purple-600 font-semibold">
                converges to 5
              </span>
              . Obviously, you could change the number in the sequence to make
              it converge to anything you want.
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
              >
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              This sequence{" "}
              <span className="text-purple-600 font-semibold">
                converges to 4
              </span>
              . If you've ever taken a calculus class, this might feel familiar.
              Intuitively, the +2 in the denominator essentially becomes
              meaningless as n gets large, so the n's cancel and we just get 4.
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
              <Sequence.Graph fn={(n) => -3} limit={-3} height={200}>
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              This is the constant sequence -3, and we say that it{" "}
              <span className="text-purple-600 font-semibold">
                converges to -3
              </span>
              . (This might feel like it goes against the spirit of “getting
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
              <Sequence.Graph fn={(n) => Math.min(n, 7)} limit={7} height={200}>
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              The min function chooses the smallest option from a set. So if n
              is small, it chooses n. But if n is big, it chooses 7 instead.
              This might feel like cheating, but by the technical definition,
              this sequence definitely{" "}
              <span className="text-purple-600 font-semibold">
                converges to 7
              </span>
              .
            </p>
          </div>
        </div>
        <p>
          When a sequence converges, we often talk about the <em>limit</em>
          &mdash;the number it converges to. We do that mathematically using
          this limit notation:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Latex
            value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( \frac{1}{n} \right) = \textcolor{#9333ea}{0}`}
            displayMode={true}
          />
          <Latex
            value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( \frac{(-1)^n}{n} \right) = \textcolor{#9333ea}{0}`}
            displayMode={true}
          />
          <Latex
            value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( 5 + \frac{1}{n} \right) = \textcolor{#9333ea}{5}`}
            displayMode={true}
          />
          <Latex
            value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( \frac{4n}{n+2} \right) = \textcolor{#9333ea}{4}`}
            displayMode={true}
          />
          <Latex
            value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( -3 \right) = \textcolor{#9333ea}{-3}`}
            displayMode={true}
          />
          <Latex
            value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( \min \{ n, 7 \} \right) = \textcolor{#9333ea}{7}`}
            displayMode={true}
          />
        </div>
        <p>
          When writing proofs, you might be given some mystery sequence, like{" "}
          <Latex
            value={String.raw`(x_n)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
          />
          , and be told that it converges to some number, like 2. In this case
          you would write{" "}
          <Latex
            value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( x_n \right) = \textcolor{#9333ea}{2}`}
          />
          .
        </p>
        <p>
          We also sometimes write things like "
          <Latex
            value={String.raw`\textcolor{#9333ea}{x_n \rightarrow 2}`}
          />{" "}
          as{" "}
          <Latex
            value={String.raw`\textcolor{#1d4ed8}{n \rightarrow \infty}`}
          />
          " , which means "
          <span className="text-purple-600">
            <Latex value={String.raw`x_n`} /> goes to <Latex value="2" />
          </span>{" "}
          as{" "}
          <span className="text-blue-700">
            <Latex value="n" /> goes to <Latex value="\infty" />
          </span>
          ." Hopefully that's intuitive enough.
        </p>
      </div>

      <div className="relative pt-px">
        <div className="absolute top-0 left-1/2 ml-[-50vw] -z-50 w-screen h-1/2 bg-gradient-to-b from-green-50" />
        <h2>
          What does <VocabTerm>divergent</VocabTerm> mean?
        </h2>
        <p>
          Technically, <VocabTerm bold>divergent</VocabTerm> just means "not
          convergent". It's a pretty boring definition that tells us the
          sequence will never settle in to a particular limit.
        </p>
        <p>
          However, we can categorize the ways in which sequences diverge. The
          first way to diverge is by shooting off to ∞ or -∞. We call this{" "}
          <VocabTerm bold>diverging to ±∞</VocabTerm>. Here are some examples:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 my-8">
          <div className="not-prose">
            <Sequence
              title={
                <Latex
                  value={String.raw`\left( -n^2 \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
                />
              }
              columnWidth={20}
              allowScrolling={false}
            >
              <Sequence.Graph fn={(n) => -(n ** 2)} limit={0} height={200}>
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              This sequence{" "}
              <span className="text-teal-600 font-semibold">
                diverges to -∞
              </span>
              .
            </p>
          </div>
          <div className="not-prose">
            <Sequence
              title={
                <Latex
                  value={String.raw`\left( \sqrt n \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
                />
              }
              columnWidth={20}
              allowScrolling={false}
            >
              <Sequence.Graph fn={(n) => Math.sqrt(n)} limit={0} height={200}>
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              This sequence{" "}
              <span className="text-teal-600 font-semibold">diverges to ∞</span>
              . (It <em>looks</em> like it might converge, but it does not. It
              keeps getting biggger and bigger, crossing any boundary you set
              for it.)
            </p>
          </div>
          <div className="not-prose">
            <Sequence
              title={
                <Latex
                  value={String.raw`\left( n + \sin (n) \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
                />
              }
              columnWidth={20}
              allowScrolling={false}
            >
              <Sequence.Graph
                fn={(n) => n + 2 * Math.sin(n)}
                limit={0}
                height={200}
              >
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              This wiggly sequence{" "}
              <span className="text-teal-600 font-semibold">diverges to ∞</span>
              , because although it goes up and down, its main trend is always
              up.
            </p>
          </div>
          <div className="not-prose">
            <Sequence
              title={
                <Latex
                  value={String.raw`\left( 5 - |n - 5| \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
                />
              }
              columnWidth={20}
              allowScrolling={false}
            >
              <Sequence.Graph
                fn={(n) => 5 - Math.abs(n - 5)}
                limit={0}
                height={200}
              >
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              This sequence starts by going up, but then changes course and goes
              down forever,{" "}
              <span className="text-teal-600 font-semibold">
                diverging to -∞
              </span>
              .
            </p>
          </div>
        </div>
        <p>
          When a sequence <VocabTerm bold>diverges to ±∞</VocabTerm>, we say
          that its limit is ∞ or -∞:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Latex
            value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( -n^2 \right) = \textcolor{#0d9488}{-\infty}`}
            displayMode={true}
          />
          <Latex
            value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( \sqrt{n} \right) = \textcolor{#0d9488}{\infty}`}
            displayMode={true}
          />
          <Latex
            value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( n + \sin (n) \right) = \textcolor{#0d9488}{\infty}`}
            displayMode={true}
          />
          <Latex
            value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( 5 - |n - 5| \right) = \textcolor{#0d9488}{-\infty}`}
            displayMode={true}
          />
        </div>
        <p>
          It's also possible for a sequence to diverge <em>without</em> going to
          ±∞. Sequences like this just wiggle around perpetually, never settling
          in to a comfortable place. Here are some examples:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 my-8">
          <div className="not-prose">
            <Sequence
              title={
                <Latex
                  value={String.raw`\left( \sin \left(\frac{n}{2}\right) \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
                />
              }
              columnWidth={20}
              allowScrolling={false}
            >
              <Sequence.Graph
                fn={(n) => Math.sin(n / 2)}
                limit={0}
                height={200}
              >
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              This sequence goes up and down forever, never converging to any
              one number. So it is <VocabTerm bold>divergent</VocabTerm>.
            </p>
          </div>
          <div className="not-prose">
            <Sequence
              title={
                <Latex
                  value={String.raw`\left( (-1)^n \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
                />
              }
              columnWidth={20}
              allowScrolling={false}
            >
              <Sequence.Graph fn={(n) => (-1) ** n} limit={0} height={200}>
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              This sequence alternates between -1 and 1 perpetually, never
              converging to any one number. So it is{" "}
              <VocabTerm bold>divergent</VocabTerm>.
            </p>
          </div>
          <div className="not-prose">
            <Sequence
              title={
                <Latex
                  value={String.raw`\left( (-1)^n \cdot n \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
                />
              }
              columnWidth={20}
              allowScrolling={false}
            >
              <Sequence.Graph fn={(n) => (-1) ** n * n} limit={0} height={200}>
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              This one sort of diverges to both ∞ and -∞. But since we don't
              have any special term for that, we just say it{" "}
              <VocabTerm bold>diverges</VocabTerm>.
            </p>
          </div>
          <div className="not-prose">
            <Sequence
              title={
                <Latex
                  value={String.raw`\left( \lfloor \pi \cdot 10^{n-1} \rfloor \mod 10 \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
                />
              }
              columnWidth={20}
              allowScrolling={false}
            >
              <Sequence.Graph
                fn={(n) => Math.floor(Math.PI * 10 ** (n - 1)) % 10}
                height={200}
              >
                <Sequence.Graph.Points />
              </Sequence.Graph>
            </Sequence>
            <p className="leading-normal mt-1">
              This one is extremely dumb. It is the sequence 3, 1, 4, 1, 5, 9...
              the digits of <Latex value={String.raw`\pi`} />. Since{" "}
              <Latex value={String.raw`\pi`} /> is irrational, its digits never
              repeat, which means it will always be jumping around and is
              therefore <VocabTerm bold>divergent</VocabTerm>.
            </p>
          </div>
        </div>
        <p>
          Sequences like this are <VocabTerm bold>divergent</VocabTerm> but{" "}
          <em>not</em> to ±∞. Since these sequences never settle down, they have
          no limit. That is, the limit{" "}
          <span className="font-semibold">does not exist</span>:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <Latex
            value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( \sin \left( \frac{n}{2} \right) \right) = \text{D.N.E.}`}
            displayMode={true}
          />
          <Latex
            value={String.raw`\lim_{\textcolor{#1d4ed8}{n \rightarrow \infty}} \left( (-1)^n \right) = \text{D.N.E.}`}
            displayMode={true}
          />
        </div>
      </div>
      <h2>The Sequence Convergence Game</h2>
      <p>
        Looking at examples is cute, but if you actually want to learn, you have
        to practice.
      </p>
      <p>
        In the game below, you are shown a sequence and asked to classify it as{" "}
        <VocabTerm bold>converging</VocabTerm>,{" "}
        <VocabTerm bold>diverging to ∞</VocabTerm>,{" "}
        <VocabTerm bold>diverging to -∞</VocabTerm>, or{" "}
        <VocabTerm bold>diverging</VocabTerm> (not to ∞ or -∞). You earn the
        most points for answering multiple questions in a row correctly, so
        focus on accuracy first. But once you know what you're doing, you can
        also earn more points by answering quickly.
      </p>
      <ComingSoon />
    </Layout>
  );
}
