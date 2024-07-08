import { Dancing_Script, Rosario as Rosario } from "next/font/google";
import { CSSProperties } from "react";

export const override1: CSSProperties = {
  display: "block",
  margin: "0 auto",
  border: "#2e4262",

  backgroundColor: "#FF914F",
};
export const override2: CSSProperties = {
  display: "block",
  margin: "0 auto",
  border: "#2e4262",

  backgroundColor: "red",
};
export const dancing_script = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
});
