import Image from "next/image";
export default function Banner() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "90vh" }}>
      <Image
        src="/images/home.png"
        alt="home"
        layout="fill"
        objectFit="cover"
        objectPosition="bottom"
        quality={100}
      />
    </div>
  );
}
