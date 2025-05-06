import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
interface CardProps {
  src: string;
  name?: string;
  id: string;
}
const Card = ({ src, name = "Nombre por defecto", id }: CardProps) => {
  const [height, setHeight] = useState(0);

  const handleResize = () => {
    const paragraph = document.querySelector(".card-paragraph");
    if (paragraph) {
      setHeight(paragraph.scrollHeight);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="relative w-80 flex flex-col mb-1"
      style={{ minHeight: height + 24 }}
    >
      <h2 className="text-lg">{name}</h2>
      <Image alt="image" src={src} objectFit="cover" width={350} height={200} />
      <p className="card-paragraph text-sm">
        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus
        ex sapien vitae pellentesque sem placerat. In id cursus mi pretium
        tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
        Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis
        massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper
        vel class apten
      </p>
      <Link href={`/reservas/${id}`}>
        <button className="bg-red-950 text-white px-2 py-1">Reservar</button>
      </Link>
    </div>
  );
};
export default Card;
