import { Literata } from "next/font/google";

const literata = Literata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-literata",
});

export const metadata = {
  title: "3D Functions | Clown School",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <div className={literata.variable}>{children}</div>;
}
