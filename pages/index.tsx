import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-xl mx-auto py-16 space-y-3">
      <h1 className="font-bold text-3xl">Hello! Welcome to Clown School.</h1>
      <p>You can learn about...</p>
      <ul className="list-disc list-inside pl-4">
        <li>
          <Link href="/real-analysis">
            <a className="underline">Real Analysis</a>
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
