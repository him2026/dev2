import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="authenticated">
      <Header />
      <Sidebar />
      <main id="main-content" className="main-content">
        {children}
      </main>
      <Footer isAuth={true} />
      <MobileNav />
    </div>
  );
}
