import Image from "next/image";
import home from "@/public/images/home.png";

export default function Banner() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        zIndex: -1,
      }}
    >
      <Image
        src={home}
        alt="home"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "bottom",
        }}
        placeholder="blur"
        quality={75}
      />
    </div>
  );
}
