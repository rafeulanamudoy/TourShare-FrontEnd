import React from "react";
import Image from "next/image";
import home from "@/public/images/home.png";

const Banner = React.memo(() => {
  return (
    <div
      style={{
        objectFit: "cover",
        objectPosition: "bottom",
        zIndex: -1,
        width: "100%",
        height: "100vh",
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
});

Banner.displayName = "Banner";

export default Banner;
