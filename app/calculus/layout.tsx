import { Layout, SidebarLink } from "../../components/Layout";

export const metadata = {
  title: "Calculus | Clown School",
};

interface CalculusLayoutProps {
  children: React.ReactNode;
}

export default function CalculusLayout({ children }: CalculusLayoutProps) {
  return (
    <Layout
      sidebarHeader="Calculus"
      sidebarContent={
        <>
          <SidebarLink href="/calculus">What is Calculus?</SidebarLink>

          <h2 className="px-6 py-2 font-bold text-slate-800">Integrals</h2>
          <div className="ml-6 border-l-2 border-slate-200">
            <SidebarLink href="/calculus/who-cares-about-area">
              Who cares about area?
            </SidebarLink>
            <SidebarLink href="/calculus/riemann-sums">
              Riemann Sums
            </SidebarLink>
          </div>
        </>
      }
    >
      {children}
    </Layout>
  );
}
