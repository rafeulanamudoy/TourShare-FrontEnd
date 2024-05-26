import { IJoinTeam } from "@/types/IJoinTeam";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface JoinPeopleProps {
  people: IJoinTeam;
}

export default function ShowJoinPeople({ people }: JoinPeopleProps) {
  console.log(people);
  return (
    <div className=" ">
      <table className=" mx-auto  my-5 table-auto    border-collapse border border-slate-400 ">
        <thead
          className="    2xl:text-2xl xl:text-base lg:text-sm   md:text-xs    sm:text-[10px] text-[8px]
           "
        >
          <tr className="">
            <th className=" border border-slate-600  p-2">Email</th>
            <th className=" border border-slate-600  p-2">Phone Number</th>

            <th className=" border border-slate-600 p-2 ">Group Members</th>

            <th className=" border border-slate-600 p-2 ">Connect</th>
            <th className=" border border-slate-600 p-2 ">Accept</th>
          </tr>
        </thead>
        <tbody>
          <tr
            className=" border  2xl:text-2xl xl:text-base lg:text-sm   md:text-xs    sm:text-[10px] text-[5px] border-slate-600 text-center"
            key={people?._id}
          >
            <td className=" border border-slate-600 p-2">{people?.email}</td>

            <td className=" border border-slate-600 p-2">
              {people.phoneNumber}
            </td>
            <td className=" border border-slate-600 p-2">
              {people.groupMember}
            </td>
            <td className=" border border-slate-600 p-2">
              <FontAwesomeIcon icon={faMessage} />
            </td>
            <td className=" border border-slate-600  p-2">accept</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
