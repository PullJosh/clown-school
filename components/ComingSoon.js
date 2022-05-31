export function ComingSoon({ children }) {
  if (children) {
    return (
      <div className="my-3 bg-slate-100 border-4 border-dashed rounded-lg px-8 py-6 text-slate-600 italic">
        <div className="text-slate-700 text-lg not-italic font-semibold">
          Coming soon...
        </div>
        <div>{children}</div>
      </div>
    );
  }

  return (
    <div className="my-3 bg-slate-100 border-4 border-dashed text-center rounded-lg px-8 py-16 text-lg text-slate-600 italic">
      Coming soon...
    </div>
  );
}
