import { Latex } from "../../components/Latex";
import { Layout } from "../../components/Layout";
import { VocabTerm } from "../../components/VocabTerm";

export default function ProveSequenceConvergence() {
  return (
    <Layout
      title={
        <>
          How do you prove that a sequence <VocabTerm>converges</VocabTerm>?
        </>
      }
    >
      <h2>
        Step 1: Find <Latex value={String.raw`L`} />, the limit of the sequence
      </h2>
      <p>
        First, figure out what number <Latex value={String.raw`L`} /> you{" "}
        <em>think</em> the sequence converges to.
      </p>
      <h2>
        Step 2: Choose <Latex value={String.raw`\textcolor{#1d4ed8}{N}`} /> for
        an arbitrary <Latex value={String.raw`\varepsilon`} />
      </h2>
      <blockquote>
        Let <Latex value={String.raw`\varepsilon > 0`} />. Choose{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{N = }`} />{" "}
        <input type="text" className="bg-blue-200 px-2 py-1 rounded w-24" />.
      </blockquote>
      <p>
        Choose so that beyond{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{N}`} />, all the terms are
        within <Latex value={String.raw`\varepsilon`} /> of{" "}
        <Latex value={String.raw`L`} />. (Because that's what we're going to
        prove next.)
      </p>
      <h2>
        Step 3: Prove that your choice of{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{N}`} /> works
      </h2>
      <p>
        Finally, you need to prove that beyond your{" "}
        <Latex value={String.raw`\textcolor{#1d4ed8}{N}`} />, all the sequence
        terms are within <Latex value={String.raw`\varepsilon`} /> of{" "}
        <Latex value={String.raw`L`} />.
      </p>
    </Layout>
  );
}
