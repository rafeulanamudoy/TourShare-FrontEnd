import Image from "next/image";
export default function Banner() {
  return (
    <div>
      <Image
        src={"/images/home.png"}
        quality={100}
        style={{
          objectFit: "cover",
          objectPosition: "bottom",

          zIndex: -1,
          width: "100vw",
          height: "90vh",
        }}
        placeholder="blur"
        alt={"home"}
      />
    </div>
  );
}
