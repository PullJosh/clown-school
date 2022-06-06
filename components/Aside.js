export function Aside({ children }) {
  return (
    <div className="not-prose space-y-1 bg-slate-100 rounded border px-3 py-2 my-3 text-slate-600 text-left text-sm xl:italic xl:my-0 xl:absolute xl:-right-6 xl:translate-x-full xl:-translate-y-full xl:w-64 xl:text-base xl:bg-transparent xl:border-0 xl:border-l-2 xl:rounded-none xl:py-0">
      <h5 className="uppercase font-semibold not-italic xl:hidden">
        Side note
      </h5>
      {children}
    </div>
  );
}
