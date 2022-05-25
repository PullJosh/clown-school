import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { VocabTerm } from "./VocabTerm";

function SidebarLink({ href, children }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <a
        className={classNames("block border-l px-4 py-1", {
          "border-slate-900 font-medium": isActive,
        })}
      >
        {children}
      </a>
    </Link>
  );
}

export function Layout({ children, title, tldr }) {
  return (
    <div className="max-w-3xl mx-auto p-8 relative">
      <Head>
        {title && <title>{jsxToString(title)} | Clown School</title>}
        {!title && <title>Clown School</title>}
      </Head>
      <div className="mb-8 xl:fixed xl:top-0 xl:left-0 xl:w-72 xl:h-full xl:px-8 xl:py-6 xl:m-0 xl:overflow-y-auto">
        <nav>
          <Link href="/what-is-a-sequence">
            <a className="block text-slate-900 font-semibold mb-2">Sequences</a>
          </Link>
          <SidebarLink href="/what-is-a-sequence">
            What is a sequence?
          </SidebarLink>
          <SidebarLink href="/sequence-converge-diverge-meaning">
            What does it mean for a sequence to <VocabTerm>converge</VocabTerm>{" "}
            or <VocabTerm>diverge</VocabTerm>?
          </SidebarLink>
        </nav>
      </div>
      <div className="mb-6">
        <h1 className="text-slate-900 font-extrabold text-3xl sm:text-4xl mb-2 text-left">
          {title}
        </h1>
        {tldr && <div className="text-slate-500 sm:text-lg">tl;dr: {tldr}</div>}
      </div>
      <div className="prose prose-slate max-w-none">{children}</div>
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
