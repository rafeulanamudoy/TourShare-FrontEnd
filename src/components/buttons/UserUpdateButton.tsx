"use client";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
export default function UserUpdateButton() {
  const { push } = useRouter();
  return (
    <button onClick={() => push("/dashboard/update")}>
      <FontAwesomeIcon
        style={{ width: "1.5em", height: "2em" }}
        icon={faPenSquare}
      ></FontAwesomeIcon>
    </button>
  );
}
