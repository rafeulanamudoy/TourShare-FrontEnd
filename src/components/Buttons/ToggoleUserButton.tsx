"use client";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
interface UserUpdateButtonProps {
  location: string; // Define the type of the location prop
}
export default function ToggoleUseButton({ location }: UserUpdateButtonProps) {
  const { push } = useRouter();
  return (
    <button onClick={() => push(`${location}`)}>
      <FontAwesomeIcon
        style={{ width: "1.5em", height: "2em" }}
        icon={faPenSquare}
      ></FontAwesomeIcon>
    </button>
  );
}
