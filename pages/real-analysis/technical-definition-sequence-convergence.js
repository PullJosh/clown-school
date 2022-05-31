import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { Layout } from "../../components/Layout";
import { VocabTerm } from "../../components/VocabTerm";
import { Latex } from "../../components/Latex";
import { Sequence } from "../../components/Sequence";
import { Aside } from "../../components/Aside";
import classNames from "classnames";

export default function TechnicalDefinitionSequenceConvergence() {
  const [tubeRadius, setTubeRadius] = useState("0.5");
  const [tubeRadius2, setTubeRadius2] = useState("0.5");

  return (
    <Layout
      title={
        <>
          What is the technical definition of sequence{" "}
          <VocabTerm>convergence</VocabTerm>?
        </>
      }
    >
      <p>
        In{" "}
        <Link href="/real-analysis/sequence-converge-diverge-meaning">
          <a>the last lesson</a>
        </Link>
        , we gained an intuitive sense of what it means for a sequence to
        converge. ("I'll know it when I see it.") Now let's write a more
        precise, mathematical definition of convergence that{" "}
        <Link href="/real-analysis/prove-sequence-convergence">
          <a>we can use</a>
        </Link>{" "}
        when we want to prove, beyond the shadow of a doubt, that a sequence is
        convergent.
      </p>
      <p>
        It will take us a couple attempts to get this definition exactly right.
        We'll start from our intuition, notice what needs patching up, and
        iterate until we have a definition that works.
      </p>
      <p>
        As a first attempt, try to fill in the following box with your
        best-effort definition. It won't be perfect, but that's okay. We'll
        build from here.
      </p>
      <FreeResponseBox
        prefix={
          <>
            A mystery sequence{" "}
            <Latex
              value={String.raw`(x_n)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
            />{" "}
            converges to a limit number <Latex value="L" /> if...
          </>
        }
      >
        The terms of{" "}
        <Latex
          value={String.raw`(x_n)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
        />{" "}
        get really close to <Latex value="L" /> as{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{n}`} /> gets big.
      </FreeResponseBox>
      <h2>What does "really close" mean?</h2>
      <p>
        Hopefully we can agree that our definition of convergence needs to say
        something about the sequence terms getting really, really, really close
        to the limit. <strong>But how close is close enough?</strong>
      </p>
      <img
        className="float-right h-48"
        src="/inflatable-tube-man.png"
        alt="Purple inflatable tube man"
      />
      <p>
        Are our sequence terms "close enough" if they're within ±0.05 of the
        alleged limit value? What if they're within ±0.000001? Does that count
        as convergence?
      </p>
      <p>
        To help visualize this, we can draw a little{" "}
        <span className="bg-purple-200 border-y border-purple-300 border-dashed py-1 -my-1 px-1 text-purple-800">
          tube of happiness
        </span>{" "}
        around the value we think the sequence is converging to. We hope that
        even if the tube is extremely narrow, the sequence will still fit inside
        eventually.
      </p>
      <p>
        For example, we suspect that the sequence{" "}
        <Latex
          value={String.raw`\left(\frac{1}{n}\right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
        />{" "}
        converges to 0. We can use a tube diagram to investigate whether the
        terms of{" "}
        <Latex
          value={String.raw`\left(\frac{1}{n}\right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
        />{" "}
        ever get within ±0.1 of 0:
      </p>
      <div className="clear-both">
        <Sequence
          title={
            <Latex
              value={String.raw`\left(\frac{1}{n}\right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
            />
          }
          scrollTargetN={Math.floor(1 / 0.1 + 1)}
        >
          <Sequence.Graph fn={(n) => 1 / n} limit={0}>
            <Sequence.Graph.Tube center={0} radius={0.1} />
            <Sequence.Graph.Points
              pointColor={(n) => (1 / n < 0.1 ? "fill-purple-800" : undefined)}
            />
          </Sequence.Graph>
          <Sequence.Indicies bolded={(n) => 1 / n < 0.1} />
        </Sequence>
      </div>
      <p>
        Yes they do! Starting with{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{n = 11}`} />, all the terms
        are within ±0.1 of 0, which we visualize as being within the purple
        tube.
      </p>
      <p>
        But what if our tube is smaller? Do the terms eventually get within
        ±0.01 of 0? Experiment with the interactive tube and see what you
        discover:
      </p>
      <div className="relative not-prose">
        <Sequence
          scrollTargetN={
            Number(tubeRadius) === 0
              ? undefined
              : Math.floor(1 / tubeRadius + 1)
          }
          title={
            <Latex
              value={String.raw`\left(\frac{1}{n}\right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
            />
          }
        >
          <Sequence.Graph fn={(n) => 1 / n} limit={0}>
            <Sequence.Graph.Tube
              center={0}
              radius={Number(tubeRadius) ?? 0}
              setRadius={(radius) => setTubeRadius(radius.toPrecision(3))}
            />
            <Sequence.Graph.Points
              pointColor={(n) =>
                1 / n < tubeRadius ? "fill-purple-700" : undefined
              }
            />
          </Sequence.Graph>
          <Sequence.Indicies bolded={(n) => 1 / n < tubeRadius} />
        </Sequence>
        {Number(tubeRadius) === 0 && (
          <div className="absolute bottom-12 left-4 bg-yellow-100 border border-yellow-300 px-4 py-2 flex space-x-4">
            <div>🚧</div>
            <div className="text-yellow-800">
              <div>
                Your tube radius of{" "}
                <strong className="font-semibold">exactly zero</strong> is
                against the rules.
              </div>
              <div className="text-sm">
                Even a converging sequence can't enter a tube that isn't there!
              </div>
            </div>
          </div>
        )}
      </div>
      <p>
        As you change the tube size, you can see that no matter how small you
        make it (as long as it's more than 0), the sequence eventually enters
        the tube.
      </p>
      <p>
        This is what it means to converge. If your sequence will eventually
        enter any tube, no matter how small, then the sequence converges to the
        point where the tube is centered.
      </p>
      <p>
        With this in mind, take another stab at writing a definition of
        convergence:
      </p>
      <FreeResponseBox
        prefix={
          <>
            A mystery sequence{" "}
            <Latex
              value={String.raw`(x_n)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
            />{" "}
            converges to a limit number <Latex value="L" /> if...
          </>
        }
      >
        For any tube centered at <Latex value="L" />, no matter how small, there
        is a point where sequence terms enter the tube.
      </FreeResponseBox>
      <h2>You gotta stay in the tube</h2>
      <p>
        Here's an example of a sequence that&mdash;surprisingly&mdash;does{" "}
        <strong>NOT</strong> <VocabTerm bold>converge</VocabTerm> to 0 (it is{" "}
        <VocabTerm bold>diverging</VocabTerm>):
      </p>
      <Sequence
        title={
          <Latex
            value={String.raw`(\cos \left(\frac{n}{10}\right)^{10})_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
          />
        }
      >
        <Sequence.Graph fn={(n) => Math.cos(n / 10) ** 10} keepInView={[0, 1]}>
          <Sequence.Graph.Points />
        </Sequence.Graph>
        <Sequence.Indicies />
      </Sequence>
      <p>
        When you first look, it certainly appears to converge to 0! But in fact,
        as you scroll farther, you can see that it goes back up again.
      </p>
      <p>
        If we plop down a tube centered at 0, you can see that the sequence
        never stays inside the tube. It always leaves eventually.
      </p>
      <Sequence
        title={
          <Latex
            value={String.raw`(\cos \left(\frac{n}{10}\right)^{10})_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
          />
        }
      >
        <Sequence.Graph fn={(n) => Math.cos(n / 10) ** 10} keepInView={[0, 1]}>
          <Sequence.Graph.Points />
          <Sequence.Graph.Tube center={0} radius={0.1} />
        </Sequence.Graph>
        <Sequence.Indicies />
      </Sequence>
      <p>
        This is how we know that the sequence does <strong>NOT</strong> converge
        to 0.
      </p>
      <Aside>
        <p>
          Note that it's perfectly legal for a sequence to enter the tube and
          then leave again.
        </p>
        <p>
          But if the sequence wants to converge,{" "}
          <em className="font-semibold">eventually</em> it needs to enter the
          tube permanently.
        </p>
      </Aside>
      <p>
        Let's update our definition of convergence to include this important
        detail ("you gotta stay in the tube"):
      </p>
      <FreeResponseBox
        prefix={
          <>
            A mystery sequence{" "}
            <Latex
              value={String.raw`(x_n)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
            />{" "}
            converges to a limit number <Latex value="L" /> if...
          </>
        }
      >
        For any tube centered at <Latex value="L" />, no matter how small, there
        is a point where{" "}
        <em className="underline">all the sequence terms from then on</em> are
        inside the tube.
      </FreeResponseBox>
      <h2>Make it mathy</h2>
      <img
        className="w-56 ml-8 float-right -rotate-2 hover:rotate-6 hover:scale-110"
        src="/tubular-terminology.jpeg"
        alt="80s aesthetic text that says 'Totally Tubular Terminology'"
      />
      <p>
        We've actually landed on pretty much the correct definition of
        convengence! But our current tube terminology&mdash;rad as it
        is&mdash;doesn't really lend itself to writing proofs.
      </p>
      <p>
        Let's rewrite our definition to be more mathematical, starting by
        defining some variables:
      </p>
      <ul>
        <li>
          Call the tube radius <Latex value={String.raw`\varepsilon`} />{" "}
          ("epsilon")
        </li>
        <li>
          Call the point where the terms enter the tube{" "}
          <Latex value={String.raw`\textcolor{#1d4ed8}{N}`} /> ("big n")
        </li>
      </ul>
      <Aside>
        <p>
          Often we make <Latex value={String.raw`\textcolor{#1d4ed8}{N}`} /> be
          the <strong className="font-semibold italic">very first</strong> point
          where the terms enter the tube. But it doesn't have to be that way!{" "}
          <Latex value={String.raw`\textcolor{#1d4ed8}{N}`} /> can be{" "}
          <strong className="font-semibold italic">any</strong> point beyond
          which all the terms are in the tube.
        </p>
        <p>
          You're allowed to choose an extra big{" "}
          <Latex value={String.raw`\textcolor{#1d4ed8}{N}`} /> "just to be safe"
          if it makes you happy.
        </p>
      </Aside>
      <p>
        Here's the interactive tube graph with{" "}
        <Latex value={String.raw`\varepsilon`} /> and{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{N}`} /> labeled:
      </p>
      <div className="relative not-prose">
        <Sequence
          scrollTargetN={
            Number(tubeRadius2) === 0
              ? undefined
              : Math.floor(1 / tubeRadius2 + 1)
          }
          scrollTargetNLatex={
            Number(tubeRadius2) === 0 ? undefined : (
              <Latex
                value={String.raw`\textcolor{#1d4ed8}{N = ${Math.floor(
                  1 / tubeRadius2 + 1
                )}}`}
              />
            )
          }
          title={
            <Latex
              value={String.raw`\left(\frac{1}{n}\right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
            />
          }
        >
          <Sequence.Graph
            fn={(n) => 1 / n}
            limit={0}
            brace={{ from: 0, to: tubeRadius2, label: String.raw`\varepsilon` }}
          >
            <Sequence.Graph.Tube
              center={0}
              radius={Number(tubeRadius2) ?? 0}
              setRadius={(radius) => setTubeRadius2(radius.toPrecision(3))}
            />
            <Sequence.Graph.Points
              pointColor={(n) =>
                1 / n < tubeRadius2 ? "fill-purple-700" : undefined
              }
            />
            {Number(tubeRadius2) !== 0 && (
              <Sequence.Graph.BigNLabel N={Math.floor(1 / tubeRadius2 + 1)} />
            )}
          </Sequence.Graph>
          <Sequence.Indicies bolded={(n) => 1 / n < tubeRadius2} />
        </Sequence>
        {Number(tubeRadius2) === 0 && (
          <div className="absolute bottom-12 left-4 bg-yellow-100 border border-yellow-300 px-4 py-2 flex space-x-4">
            <div>🚧</div>
            <div className="text-yellow-800">
              <div>
                Your tube radius of{" "}
                <strong className="font-semibold">exactly zero</strong> is
                against the rules.
              </div>
              <div className="text-sm">
                Even a converging sequence can't enter a tube that isn't there!
              </div>
            </div>
          </div>
        )}
      </div>
      <p>
        As you can see, a smaller <Latex value={String.raw`\varepsilon`} />{" "}
        generally means that you need to scroll farther down the sequence before
        all the points are in the tube. This means that for a small{" "}
        <Latex value={String.raw`\varepsilon`} />, you generally need{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{N}`} /> to be large.
      </p>
      <p>
        Now that we have these two variables, we can write the definition of
        convergence more precisely. As a reminder, here's the definition in tube
        terms:
      </p>
      <blockquote>
        A mystery sequence{" "}
        <Latex
          value={String.raw`(x_n)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
        />{" "}
        converges to <Latex value="L" /> if{" "}
        <span className="bg-red-100 p-1 -my-1">
          for any tube centered at <Latex value="L" />, no matter how small,
        </span>{" "}
        <span className="bg-orange-100 p-1 -my-1">there is a point</span>{" "}
        <span className="bg-yellow-100 p-1 -my-1">
          where all the sequence terms from then on
        </span>{" "}
        <span className="bg-lime-100 p-1 -my-1">are inside the tube.</span>
      </blockquote>
      <p>
        And here's how we can translate it into math using our new variables:
      </p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Tube terms</th>
            <th>Math</th>
            <th>Quantifiers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="bg-red-200"></td>
            <td>
              For any tube centered at <Latex value="L" />, no matter how
              small...
            </td>
            <td>
              For all <Latex value={String.raw`\varepsilon > 0`} />
            </td>
            <td>
              <Latex value={String.raw`\forall \varepsilon > 0`} />
            </td>
          </tr>
          <tr>
            <td className="bg-orange-200"></td>
            <td>There is a point...</td>
            <td>
              There exists some{" "}
              <Latex
                value={String.raw`\textcolor{#1d4ed8}{N \in \mathbb{N}}`}
              />
            </td>
            <td>
              <Latex
                value={String.raw`\textcolor{#1d4ed8}{\exists N \in \mathbb{N}}`}
              />
            </td>
          </tr>
          <tr>
            <td className="bg-yellow-200"></td>
            <td>Where all the sequence terms from then on...</td>
            <td>
              Such that for all{" "}
              <Latex value={String.raw`\textcolor{#1d4ed8}{n \geq N}`} />
            </td>
            <td>
              <Latex
                value={String.raw`\textcolor{#1d4ed8}{\forall n \geq N}`}
              />
            </td>
          </tr>
          <tr>
            <td className="bg-lime-200"></td>
            <td className="pl-2">Are inside the tube.</td>
            <td>
              <Latex
                value={String.raw`|x_{\textcolor{#1d4ed8}{n}} - L| < \varepsilon`}
              />
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <Aside>
        <p>
          The final math translation,{" "}
          <Latex
            value={String.raw`|x_{\textcolor{#1d4ed8}{n}} - L| < \varepsilon`}
          />
          , checks that the distance between the sequence term{" "}
          <Latex value={String.raw`x_{\textcolor{#1d4ed8}{n}}`} /> and the limit
          value <Latex value="L" /> is less than{" "}
          <Latex value={String.raw`\varepsilon`} />. That's exactly the same as
          being inside the tube of radius{" "}
          <Latex value={String.raw`\varepsilon`} /> centered at{" "}
          <Latex value="L" />.
        </p>
      </Aside>
      <p>So our final definition is...</p>
      <blockquote>
        A mystery sequence{" "}
        <Latex
          value={String.raw`(x_n)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
        />{" "}
        converges to <Latex value="L" /> if{" "}
        <span className="bg-red-100 p-1 -my-1">
          for all <Latex value={String.raw`\varepsilon > 0`} />,
        </span>{" "}
        <span className="bg-orange-100 p-1 -my-1">
          there exists some{" "}
          <Latex value={String.raw`\textcolor{#1d4ed8}{N \in \mathbb{N}}`} />
        </span>{" "}
        <span className="bg-yellow-100 p-1 -my-1">
          such that for all{" "}
          <Latex value={String.raw`\textcolor{#1d4ed8}{n \geq N}`} />,
        </span>{" "}
        <span className="bg-lime-100 p-1 -my-1">
          <Latex
            value={String.raw`|x_{\textcolor{#1d4ed8}{n}} - L| < \varepsilon`}
          />
          .
        </span>
      </blockquote>
      <p>
        In{" "}
        <Link href="/real-analysis/prove-sequence-convergence">
          <a>the next lesson</a>
        </Link>
        , we'll talk about how to use this definition to actually prove that a
        specific sequence is convergent.
      </p>
    </Layout>
  );
}

function FreeResponseBox({ prefix, children }) {
  const [value, setValue] = useState("");
  const [revealed, setRevealed] = useState(false);

  const [prefixElem, setPrefixElem] = useState(null);
  const [prefixSize, setPrefixSize] = useState({ width: 0, height: 0 }); // TODO: Find a better way to get this value

  useEffect(() => {
    if (prefixElem === null) return;

    const onResize = () => {
      const { width, height } = prefixElem.getBoundingClientRect();
      setPrefixSize({ width, height });
    };

    onResize();

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(prefixElem);
    return () => resizeObserver.disconnect();
  }, [prefixElem]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Kalam&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex flex-col space-y-2">
        <div className="flex-1 flex flex-col space-y-1">
          <label>
            <div className="text-slate-700 font-semibold">Your answer:</div>
            <div className="relative overflow-hidden">
              <div
                className="select-none pointer-events-none absolute top-2 left-3 leading-normal font-[Kalam]"
                ref={(elem) => setPrefixElem(elem)}
              >
                {prefix}
              </div>
              <textarea
                className="block border rounded w-full h-24 px-3 py-2 leading-normal font-[Kalam]"
                style={{ textIndent: (prefixSize?.width ?? 0) + 4 }}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                disabled={revealed}
              />
            </div>
          </label>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded self-end disabled:bg-opacity-40"
            disabled={!value && !revealed}
            onClick={() => setRevealed(!revealed)}
          >
            {revealed ? "Hide my answer" : "Reveal my answer"}
          </button>
        </div>
        <div className="flex-1 flex flex-col space-y-1">
          <div className="text-slate-700 font-semibold">My answer:</div>
          <div className="border rounded px-3 py-2 relative">
            <div
              className={classNames("leading-normal font-[Kalam]", {
                "blur-sm select-none": !revealed,
              })}
            >
              {prefix} {children}
            </div>
            <div
              className={classNames(
                "bg-white px-3 py-1 border absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                { hidden: revealed }
              )}
            >
              🔒 Enter your answer first to reveal mine
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
