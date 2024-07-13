import Image from "next/image";
import home from "@/public/images/home.png";
export default function Banner() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "90vh",
      }}
    >
      <Image
        src={home}
        alt="home"
        layout="fill"
        objectFit="cover"
        objectPosition="bottom"
        placeholder="blur"
        quality={75}
      />
    </div>
  );
}
