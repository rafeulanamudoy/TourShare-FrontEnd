"use client";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

const TeamUpdateButton = React.memo(() => {
  const { push } = useRouter();
  return (
    <button onClick={() => push(`team/update`)}>
      <FontAwesomeIcon
        style={{ width: "1.5em", height: "2em" }}
        icon={faPenSquare}
      ></FontAwesomeIcon>
    </button>
  );
});
TeamUpdateButton.displayName = "TeamUpdateButton";

export default TeamUpdateButton;
