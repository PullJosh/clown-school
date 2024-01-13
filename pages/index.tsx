import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-xl space-y-3 py-16">
      <h1 className="text-3xl font-bold">🤡 Hello! Welcome to Clown School.</h1>
      <p>You can learn about...</p>
      <ul className="list-inside list-disc pl-4">
        <li>
          <Link href="/algebra" className="underline">
            Algebra
          </Link>
        </li>
        <li>
          <Link href="/calculus" className="underline">
            Calculus
          </Link>
        </li>
        <li>
          <Link href="/multivariable-functions" className="underline">
            Multivariable Functions
          </Link>
        </li>
        <li>
          <Link href="/real-analysis" className="underline">
            Real Analysis
          </Link>
        </li>
      </ul>
      <p>
        This website is a currently a work in progress. Its purpose is to
        explain math concepts using pictures, examples, and lots of
        opportunities to practice.
      </p>
    </div>
  );
}
