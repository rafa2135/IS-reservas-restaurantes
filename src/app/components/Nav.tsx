"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
//nav component
const Nav = () => {
  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    console.log("handleMenu");
    setOpen(!open);
  };
  return (
    <nav className="flex gap-4">
      <div className="relative w-6 h-6 md:hidden">
        <button onClick={handleMenu}>
          <Image src="/hamburger.png" alt="menu" fill />
        </button>
      </div>
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-amber-950 transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[500px] py-4" : "max-h-0 py-0"
        } flex flex-col`} // menu para mobile
      >
        <Link
          href="/about"
          className="px-4 py-2 hover:bg-gray-100 w-full text-center"
          onClick={handleMenu}
        >
          conocénos
        </Link>
        <Link
          href="/restaurants"
          className="px-4 py-2 hover:bg-gray-100 w-full text-center"
          onClick={handleMenu}
        >
          restaurantes
        </Link>
        <Link
          href="/contacto"
          className="px-4 py-2 hover:bg-gray-100 w-full text-center"
          onClick={handleMenu}
        >
          Contactanos
        </Link>
        <Link
          href="/auth/login"
          rel="login"
          className="bg-white text-red-950 px-0.5 rounded-bl-none font-bold w-50 text-center  mx-auto"
          onClick={handleMenu}
        >
          Login / registro
        </Link>
      </div>
      <div className="hidden md:flex gap-4" /* menu para desktop*/>
        <Link href="/about">Conócenos</Link>
        <Link href="/restaurants">Restaurantes</Link>
        <Link href="/contacto">Contactanos</Link>

        <Link
          rel="login"
          href="/auth/login"
          className="bg-white text-red-950 px-0.5 rounded-bl-none font-bold"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
