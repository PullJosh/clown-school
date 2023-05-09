"use client";

import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { VocabTerm } from "./VocabTerm";
import { useState } from "react";

interface SidebarLinkProps {
  href: string;
  children: React.ReactNode;
  status?: "default" | "wip" | "coming-soon";
}

export function SidebarLink({
  href,
  children,
  status = "default",
}: SidebarLinkProps) {
  const isActive = usePathname() === href;

  return (
    <Link
      href={href}
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
    </Link>
  );
}

interface LayoutProps {
  children: React.ReactNode;

  /** The page title. Should only be used in /pages, not /app */
  title?: React.ReactNode;

  sidebarHeader?: string;
  sidebarContent?: React.ReactNode;
}

export function Layout({
  children,
  title,
  sidebarHeader = "Real Analysis",
  sidebarContent = realAnalysisSidebarContent,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-screen h-screen overflow-hidden grid grid-rows-[auto,auto,1fr] grid-cols-[1fr] lg:grid-rows-[auto,1fr] lg:grid-cols-[300px,1fr]">
      <Head>
        {title && <title>{jsxToString(title)} | Clown School</title>}
        {!title && <title>Clown School</title>}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex bg-white border-b lg:border-r border-slate-200">
        <Link href="/" className="flex-grow flex items-center space-x-4">
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
        </Link>
        <button
          className="flex items-center justify-center w-16 h-16 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-slate-600"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex border-b border-slate-200 items-center px-24">
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
      <div
        className={classNames(
          "bg-white fixed z-50 inset-0 w-full h-full lg:static lg:w-auto lg:h-auto overflow-hidden lg:flex flex-col lg:border-r lg:border-slate-200",
          {
            flex: sidebarOpen,
            hidden: !sidebarOpen,
          }
        )}
      >
        {/* `relative` for this <div> makes it appear on top of the shadow of the <h2> below (so it's not ugly) */}
        <div className="flex bg-white border-b border-slate-200 relative z-10 lg:hidden">
          <div className="flex-grow h-16 flex items-center pl-3">
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
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-center w-16 h-16"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-slate-600"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h2 className="px-6 py-2 bg-white shadow font-bold relative">
          {sidebarHeader}
        </h2>
        <div className="overflow-y-auto py-4">{sidebarContent}</div>
      </div>
      <div className="overflow-y-auto px-16 lg:px-24">
        <div className="prose prose-slate py-12 relative">
          {title && <h1>{title}</h1>}
          {children}
        </div>
      </div>
    </div>
  );
}

const realAnalysisSidebarContent = (
  <>
    <SidebarLink href="/real-analysis">What is real analysis?</SidebarLink>

    <h2 className="px-6 py-2 font-bold text-slate-800">Sequences</h2>
    <div className="ml-6 border-l-2 border-slate-200">
      <SidebarLink href="/real-analysis/what-is-a-sequence">
        What is a sequence?
      </SidebarLink>
      <SidebarLink href="/real-analysis/sequence-converge-diverge-meaning">
        <VocabTerm>Convergence</VocabTerm> and <VocabTerm>divergence</VocabTerm>
      </SidebarLink>
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
  </>
);

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
