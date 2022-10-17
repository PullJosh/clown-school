import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "../../components/Layout";
import { VocabTerm } from "../../components/VocabTerm";
import { Latex } from "../../components/Latex";
import { Sequence } from "../../components/Sequence";
import { Aside } from "../../components/Aside";
import {
  FridgeMagnets,
  FridgeMagnetSlot,
} from "../../components/FridgeMagnets";

import inflatableTubeManImg from "../../public/inflatable-tube-man.png";
import tubularTerminologyImg from "../../public/tubular-terminology.jpeg";

export default function TechnicalDefinitionSequenceConvergence() {
  const [tubeRadius, setTubeRadius] = useState("0.5");
  const [tubeRadius2, setTubeRadius2] = useState("0.5");

  const interactiveSequenceRef = useRef();

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
        </Link>{" "}
        we said that a sequence <VocabTerm bold>converges</VocabTerm> if its
        terms get "infinitely close" to some limit value. But what exactly does
        that mean?
      </p>
      <h2>"As close as you want"</h2>
      <p>
        A sequence <VocabTerm bold>converges</VocabTerm> if it can get{" "}
        <em>as close as you want</em> to the limit value, just by scrolling
        along the sequence to a larger{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{n}`} /> value.
      </p>
      <div className="not-prose float-right ml-6 w-20">
        <Image src={inflatableTubeManImg} alt="Purple inflatable tube man" />
      </div>
      <p>
        For example, if you want{" "}
        <Latex
          value={String.raw`\left( \frac{1}{n} \right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
        />{" "}
        to get within ±0.1 of its limit value, 0, you just have to scroll to{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{n = 11}`} />. And if you
        want it to get within ±0.01 of its limit, you have to scroll to{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{n = 101}`} />. No matter
        how close you want to get to the limit, there's a place where it
        happens.
      </p>
      <p>
        We can visualize this by drawing a{" "}
        <span className="bg-purple-200 border-y border-purple-300 border-dashed py-1 -my-1 px-1 text-purple-800">
          tube of closeness
        </span>{" "}
        and waiting for the sequence terms to enter the tube. Try making this
        tube bigger or smaller and watch what happens:
      </p>
      <div className="clear-both relative not-prose">
        <Sequence
          ref={interactiveSequenceRef}
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
            <Sequence.Graph.LimitIndicator value={0} glow={false} />
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
            {Number(tubeRadius) !== 0 && (
              <Sequence.Graph.BigNLabel
                N={Math.floor(1 / tubeRadius + 1)}
                showN={false}
              />
            )}
          </Sequence.Graph>
          <Sequence.Indicies bolded={(n) => 1 / n < tubeRadius} />
        </Sequence>
        {Number(tubeRadius) === 0 ? (
          <div className="absolute z-10 -top-4 right-28 bg-yellow-100 rounded border border-yellow-300 px-4 py-2 flex space-x-4">
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
        ) : (
          <div className="absolute z-10 -top-4 right-28 bg-lime-100 rounded border border-lime-300 px-4 py-2 flex space-x-4">
            <div>✅</div>
            <div className="text-lime-800">
              <div>
                The terms get within ±{tubeRadius} starting from{" "}
                <button
                  onClick={() => {
                    interactiveSequenceRef.current?.scrollToN(
                      Math.floor(1 / tubeRadius + 1)
                    );
                  }}
                >
                  <Latex
                    value={String.raw`\textcolor{#1d4ed8}{n = ${Math.floor(
                      1 / tubeRadius + 1
                    )}}`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <p>
        No matter how small the tube gets, the terms of a converging sequence
        will eventually go inside.
      </p>

      <h2>You gotta stay in the tube</h2>
      <p>
        Here's an example of a sequence that&mdash;surprisingly&mdash;does{" "}
        <strong>NOT</strong> <VocabTerm bold>converge</VocabTerm> to 0 (it is{" "}
        <VocabTerm bold>diverging</VocabTerm>):
      </p>
      <p>
        When you first look, it certainly appears to converge to 0! But in fact,
        as you scroll farther, you can see that it never stays in the tube. It
        always leaves eventually.
      </p>
      <Sequence
        title={
          <Latex
            value={String.raw`\left(\cos \left(\frac{n}{10}\right)^{10}\right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
          />
        }
      >
        <Sequence.Graph fn={(n) => Math.cos(n / 10) ** 10} keepInView={[0, 1]}>
          <Sequence.Graph.Points
            pointColor={(n) =>
              Math.abs(Math.cos(n / 10) ** 10) < 0.1
                ? "fill-purple-700"
                : undefined
            }
          />
          <Sequence.Graph.Tube center={0} radius={0.1} />
        </Sequence.Graph>
        <Sequence.Indicies />
      </Sequence>
      <p>
        This is how we know that the sequence does <strong>NOT</strong> converge
        to 0.
      </p>
      <p>
        A converging sequence, on the other hand, will become a permanent
        resident eventually. This one is undecided at first, but after a while
        it enters the tube permanently:
      </p>
      <Sequence
        title={
          <Latex
            value={String.raw`\left(\frac{\cos (n)}{\sqrt n}\right)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
          />
        }
        scrollTargetN={45}
      >
        <Sequence.Graph fn={(n) => Math.cos(n) / Math.sqrt(n)} limit={0}>
          <Sequence.Graph.Points
            pointColor={(n) =>
              Math.abs(Math.cos(n) / Math.sqrt(n)) < 0.15
                ? "fill-purple-700"
                : undefined
            }
          />
          <Sequence.Graph.Tube center={0} radius={0.15} />
          <Sequence.Graph.BigNLabel N={45} showN={false} />
        </Sequence.Graph>
        <Sequence.Indicies />
      </Sequence>

      <h2>Turn it into a sentence</h2>
      <p>
        Alright... Time to describe, in a sentence, what it means to be
        convergent.
      </p>
      <p>
        Below are some fridge magnets that you can use to build the definition.
        Drag them into place and then click the button to check your answer:
      </p>
      <div className="not-prose">
        <FridgeMagnets
          // prettier-ignore
          options={[
            {
              content: <>there is an <VocabTerm bold>index</VocabTerm></>,
              correctSlot: 1,
            },
            {
              content: <>where the sequence term at that index</>,
              correctSlot: null,
            },
            {
              content: <>beyond which all the sequence terms</>,
              correctSlot: 2,
            },
            {
              content: <>is inside the tube</>,
              correctSlot: null
            },
            {
              content: <>are inside the tube</>,
              correctSlot: 3
            },
            {
              content: <>for any tube centered at <Latex value="L" />, no matter how small</>,
              correctSlot: 0,
            },
            {
              content: <>for a specific tube centered at <Latex value="L" /></>,
              correctSlot: null,
            },
          ]}
        >
          <div className="space-y-2">
            <div className="text-center text-lg">
              A sequence{" "}
              <Latex
                value={String.raw`(x_n)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
              />{" "}
              converges to <Latex value="L" /> if...
            </div>
            <div className="text-center">
              {[0, 1, 2, 3].map((slotId) => (
                <div className="inline-block m-1" key={slotId}>
                  <FridgeMagnetSlot id={slotId} />
                </div>
              ))}
            </div>
          </div>
        </FridgeMagnets>
      </div>

      <h2>Make it mathy</h2>
      <div className="w-56 ml-8 float-right -rotate-2 hover:rotate-6 hover:scale-110">
        <Image
          src={tubularTerminologyImg}
          alt="80s aesthetic text that says 'Totally Tubular Terminology'"
        />
      </div>
      <p>
        Amazing! You've successfully built a definition of sequence{" "}
        <VocabTerm bold>convergence</VocabTerm>. But our current tube
        terminology&mdash;rad as it is&mdash;doesn't really lend itself to
        writing proofs.
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
            brace={{
              from: 0,
              to: tubeRadius2,
              label: String.raw`\varepsilon = ${tubeRadius2}`,
            }}
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
        Now that we have these two variables, we can write the definition of
        convergence more precisely. As a reminder, here's the definition in tube
        terms:
      </p>
      <blockquote>
        A sequence{" "}
        <Latex
          value={String.raw`(x_n)_{\textcolor{#1d4ed8}{n \in \mathbb{N}}}`}
        />{" "}
        converges to <Latex value="L" /> if...{" "}
        <span className="inline-block bg-white shadow my-1 px-2 py-1 whitespace-nowrap">
          for any tube centered at <Latex value="L" />, no matter how small,
        </span>{" "}
        <span className="inline-block bg-white shadow my-1 px-2 py-1 whitespace-nowrap">
          there is an <VocabTerm bold>index</VocabTerm>
        </span>{" "}
        <span className="inline-block bg-white shadow my-1 px-2 py-1 whitespace-nowrap">
          beyond which all the sequence terms
        </span>{" "}
        <span className="inline-block bg-white shadow my-1 px-2 py-1 whitespace-nowrap">
          are inside the tube.
        </span>
      </blockquote>
      <p>
        Now, fill in the equivalent math terms using the fridge magnets below:
      </p>
      <FridgeMagnets
        // prettier-ignore
        options={[
          {
            content: <>such that for all <Latex value={String.raw`\textcolor{#1d4ed8}{n \leq N}`} /></>,
            correctSlot: null,
          },
          {
            content: <>such that for all <Latex value={String.raw`\textcolor{#1d4ed8}{n \geq N}`} /></>,
            correctSlot: 2,
          },
          {
            content: <>for all <Latex value={String.raw`\varepsilon < 0`} /></>,
            correctSlot: null,
          },
          {
            content: <>for all <Latex value={String.raw`\varepsilon > 0`} /></>,
            correctSlot: 0,
          },
          {
            content: <Latex value={String.raw`|x_{\textcolor{#1d4ed8}{n}} - L| < \varepsilon`} />,
            correctSlot: 3,
          },
          {
            content: <Latex value={String.raw`|x_{\textcolor{#1d4ed8}{n}} - L| > \varepsilon`} />,
            correctSlot: 3,
          },
          {
            content: <>there exists some <Latex value={String.raw`\textcolor{#1d4ed8}{N \in \mathbb{N}}`} /></>,
            correctSlot: 1,
          },
          {
            type: "round",
            content: <Latex value={String.raw`\forall \varepsilon > 0`} />,
            correctSlot: 4,
          },
          {
            type: "round",
            content: <Latex value={String.raw`\forall \varepsilon < 0`} />,
            correctSlot: 4,
          },
          {
            type: "round",
            content: <Latex value={String.raw`\exists \varepsilon < 0`} />,
            correctSlot: 4,
          },
          {
            type: "round",
            content: <Latex value={String.raw`\exists \varepsilon > 0`} />,
            correctSlot: 4,
          },
          {
            type: "round",
            content: <Latex value={String.raw`\textcolor{#1d4ed8}{\forall n \leq N}`} />,
            correctSlot: null,
          },
          {
            type: "round",
            content: <Latex value={String.raw`\textcolor{#1d4ed8}{\forall n \geq N}`} />,
            correctSlot: 6,
          },
          {
            type: "round",
            content: <Latex value={String.raw`\textcolor{#1d4ed8}{\exists n \leq N}`} />,
            correctSlot: null,
          },
          {
            type: "round",
            content: <Latex value={String.raw`\textcolor{#1d4ed8}{\exists n \geq N}`} />,
            correctSlot: null,
          },
          {
            type: "round",
            content: <Latex value={String.raw`\textcolor{#1d4ed8}{\forall N \in \mathbb{N}}`} />,
            correctSlot: null,
          },
          {
            type: "round",
            content: <Latex value={String.raw`\textcolor{#1d4ed8}{\exists N \in \mathbb{N}}`} />,
            correctSlot: 5,
          },
        ]}
      >
        <table>
          <thead>
            <tr>
              <th>Tube terms</th>
              <th>Math terms</th>
              <th>Quantifiers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                For any tube centered at <Latex value="L" />, no matter how
                small...
              </td>
              <td>
                <FridgeMagnetSlot id={0} />
              </td>
              <td>
                <FridgeMagnetSlot id={4} type="round" />
              </td>
            </tr>
            <tr>
              <td>
                there is an <VocabTerm bold>index</VocabTerm>...
              </td>
              <td>
                <FridgeMagnetSlot id={1} />
              </td>
              <td>
                <FridgeMagnetSlot id={5} type="round" />
              </td>
            </tr>
            <tr>
              <td>beyond which all the sequence terms...</td>
              <td>
                <FridgeMagnetSlot id={2} />
              </td>
              <td>
                <FridgeMagnetSlot id={6} type="round" />
              </td>
            </tr>
            <tr>
              <td>are inside the tube.</td>
              <td>
                <FridgeMagnetSlot id={3} />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </FridgeMagnets>
      <p>So our final definition is...</p>
      <blockquote>
        A sequence{" "}
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
        , we'll use this definition to prove that a specific sequence is
        convergent.
      </p>
    </Layout>
  );
}
