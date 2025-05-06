import Link from "next/link";
import Logo from "../components/Logo";
import Nav from "./Nav";

const Header = () => {
  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-sm bg-amber-950 text-white`}
    >
      <div className="container mx-auto max-w-screen-xl flex flex-wrap items-center justify-between p-4 h-16">
        <div className="flex gap-4">
          <div className="relative w-6 h-6">
            <Logo />
          </div>
          <Link href="/">El Rincón del Sabor</Link>
        </div>
        <div>
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
