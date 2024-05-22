"use client";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function TeamUpdateButton() {
  // console.log(location, "check location");
  const { push } = useRouter();
  return (
    <button onClick={() => push(`team/update`)}>
      <FontAwesomeIcon
        style={{ width: "1.5em", height: "2em" }}
        icon={faPenSquare}
      ></FontAwesomeIcon>
    </button>
  );
}
