import { Layout, SidebarLink } from "../../components/Layout";

export const metadata = {
  title: "Algebra | Clown School",
};

interface AlgebraLayoutProps {
  children: React.ReactNode;
}

export default function AlgebraLayout({ children }: AlgebraLayoutProps) {
  return (
    <Layout
      sidebarHeader="Algebra"
      sidebarContent={
        <>
          <SidebarLink href="/algebra">What is Algebra?</SidebarLink>

          <SidebarLink href="/algebra/numbers-in-other-bases">
            Numbers in Other Bases
          </SidebarLink>
        </>
      }
    >
      {children}
    </Layout>
  );
}
