import Image from "next/image";
// this is a component that will be used in the header it contains the logo
const Logo = () => {
  return <Image src="/logo.png" alt="Logo" fill />;
};

export default Logo;
