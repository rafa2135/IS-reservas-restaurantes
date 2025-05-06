import { Icon } from "@iconify/react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-amber-950 text-white py-6">
      <div
        className="container mx-auto max-w-screen-xl flex flex-wrap items-center px-4 
        md:justify-between"
      >
        {/* Social Media Links */}
        <div className="flex space-x-6">
          <Link href="https://wa.me/+580412-123456" aria-label="WhatsApp">
            <Icon
              icon="mdi:whatsapp"
              width="24"
              className="hover:text-gray-300 transition-colors duration-200"
            />
          </Link>
          <Link
            href="https://www.instagram.com/elrincóndelsabor"
            aria-label="Instagram"
          >
            <Icon
              icon="mdi:instagram"
              width="24"
              className="hover:text-gray-300 transition-colors duration-200"
            />
          </Link>
          <Link
            href="https://www.tiktok.com/@elrincóndelsabor"
            aria-label="TikTok"
          >
            <Icon
              icon="mdi:tiktok"
              width="24"
              className="hover:text-gray-300 transition-colors duration-200"
            />
          </Link>
          <Link href="mailto:contacto@elrincóndelsabor.com" aria-label="Email">
            <Icon
              icon="mdi:email"
              width="24"
              className="hover:text-gray-300 transition-colors duration-200"
            />
          </Link>
        </div>

        {/* Footer Text */}
        <div className="text-sm mt-2">
          &copy; El Rincón del Sabor {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
