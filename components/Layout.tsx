import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { VocabTerm } from "./VocabTerm";

interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
  status?: "default" | "wip" | "coming-soon";
}

function SidebarLink({ href, children, status = "default" }: SidebarLinkProps) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <a
        className={classNames("flex items-center px-6 py-2", {
          "bg-slate-100 border-l-2 border-slate-800 -ml-[2px]": isActive,
          "cursor-default opacity-30": status === "coming-soon",
        })}
      >
        <span className="whitespace-nowrap text-ellipsis overflow-hidden">
          {children}
        </span>
        {status === "wip" && (
          <span className="ml-auto bg-yellow-200 text-yellow-700 text-xs px-1 py-px rounded-sm whitespace-nowrap">
            In progress
          </span>
        )}
      </a>
    </Link>
  );
}

export function Layout({ children, title }) {
  return (
    <div className="pl-[300px]">
      <Head>
        {title && <title>{jsxToString(title)} | Clown School</title>}
        {!title && <title>Clown School</title>}
      </Head>
      <div className="fixed top-0 left-0 h-screen w-[300px] flex flex-col bg-white border-r border-slate-200">
        <div className="bg-white border-b border-slate-200 flex items-center space-x-4">
          <svg viewBox="0 0 64 64" className="w-16 h-16">
            <text
              x={33}
              y={36}
              fontSize={36}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              🤡
            </text>
          </svg>
          <h1 className="font-semibold text-2xl">
            <span className="text-rose-700">Clown</span> school
          </h1>
        </div>
        <nav className="relative flex-1 overflow-hidden">
          <h1 className="px-6 py-2 bg-white shadow font-bold mb-4">
            Real Analysis
          </h1>
          <SidebarLink href="/real-analysis">
            What is real analysis?
          </SidebarLink>

          <h2 className="px-6 py-2 font-bold text-slate-800">Sequences</h2>
          <div className="ml-6 border-l-2 border-slate-200">
            <SidebarLink href="/real-analysis/what-is-a-sequence">
              What is a sequence?
            </SidebarLink>
            <SidebarLink href="/real-analysis/sequence-converge-diverge-meaning">
              <VocabTerm>Convergence</VocabTerm> and{" "}
              <VocabTerm>divergence</VocabTerm>
            </SidebarLink>
            {/* <img
            src="/inflatable-tube-man.png"
            alt=""
            className="absolute w-14 -right-4 -rotate-45 pointer-events-none select-none"
          /> */}
            <SidebarLink href="/real-analysis/technical-definition-sequence-convergence">
              Definition of <VocabTerm>convergence</VocabTerm>
            </SidebarLink>
            <SidebarLink
              href="/real-analysis/prove-sequence-convergence"
              status="wip"
            >
              Proving <VocabTerm>convergence</VocabTerm>
            </SidebarLink>
            <SidebarLink href="#" status="coming-soon">
              Definition of <VocabTerm>divergence</VocabTerm>
            </SidebarLink>
            <SidebarLink href="#" status="coming-soon">
              Proving <VocabTerm>divergence</VocabTerm>
            </SidebarLink>
            <SidebarLink href="#" status="coming-soon">
              Tails and subsequences
            </SidebarLink>
            <SidebarLink href="#" status="coming-soon">
              Squeeze theorem
            </SidebarLink>
            <SidebarLink href="#" status="coming-soon">
              Limit arithmetic
            </SidebarLink>
            <SidebarLink href="#" status="coming-soon">
              Ratio test
            </SidebarLink>
            <SidebarLink href="#" status="coming-soon">
              Cauchy sequences
            </SidebarLink>
          </div>
        </nav>
      </div>
      <main>
        <div className="sticky top-0 bg-white z-40">
          <header className="border-b border-slate-200">
            <div className="h-16 px-24 flex items-center">
              <form
                action="https://google.com/search"
                className="flex-1 max-w-prose flex bg-slate-100 rounded focus-within:bg-slate-200"
              >
                <input
                  type="hidden"
                  name="as_sitesearch"
                  value="clown-school.vercel.app"
                />
                <input
                  type="text"
                  name="q"
                  placeholder="Search..."
                  className="w-full px-4 py-2 bg-transparent rounded focus:outline-none"
                  required
                />
                <button type="submit">
                  <svg viewBox="0 0 40 40" className="w-10 h-10">
                    <circle
                      cx={17}
                      cy={17}
                      r={7}
                      strokeWidth={2}
                      className="stroke-slate-500"
                      fill="none"
                    />
                    <line
                      x1={22}
                      x2={29}
                      y1={22}
                      y2={29}
                      strokeWidth={2}
                      className="stroke-slate-500"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </header>
        </div>
        <div className="px-24">
          <div className="prose prose-slate py-12 relative">
            <h1>{title}</h1>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function jsxToString(jsx) {
  if (Array.isArray(jsx)) {
    return jsx.map(jsxToString).join("");
  }

  if (jsx?.type === "text") {
    return jsx.value;
  }

  if (jsx?.props?.children) {
    return jsxToString(jsx.props.children);
  }

  return String(jsx);
}
