"use client";
import Image from "next/image";
import React from "react";
import logo from "../../../public/images/whiteLogo.png";
import logo1 from "../../../public/images/logoWithoutText.png";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faUser } from "@fortawesome/free-solid-svg-icons";

import { useAppSelector } from "@/redux/hooks";
export default function Sidebar() {
  const { toggle } = useAppSelector((state) => state.toggle);

  return (
    <div
      className={`${toggle ? " w-24" : "w-80"} h-screen  text-white 
      } bg-[#31363F] `}
    >
      <div className="   border-b-2    h-36  grid  items-center justify-center  ">
        <div>
          <Image
            className={`  `}
            width={toggle ? 70 : 150}
            height={toggle ? 70 : 150}
            src={toggle ? logo1 : logo}
            placeholder="blur"
            alt="logo"
          />
        </div>
      </div>
      <div className=" mt-5 2xl:text-xl xl:text-lg lg:text-sm  text-xs  flex flex-col  gap-y-5   ">
        <div className=" ">
          <Link
            className={`mx-auto  w-[90%] hover:bg-[#191919]  flex   h-16 px-2 ${
              toggle ? "justify-center" : "justify-between"
            } items-center`}
            href="/profile"
          >
            <div className="flex gap-x-5 items-center">
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className={`  drop-shadow-md`}
                icon={faUser}
              />

              <span
                className={` ${
                  toggle ? "hidden" : "block"
                } capitalize font-bold `}
              >
                {" "}
                profile
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className={` ${toggle ? "hidden" : "block"}  `}
                icon={faCaretRight}
              />
            </div>
          </Link>
        </div>
        <div className="  ">
          <Link
            className={`mx-auto  w-[90%] hover:bg-[#191919]  flex   h-16 px-2 ${
              toggle ? "justify-center" : "justify-between"
            } items-center`}
            href="/profile"
          >
            <div className="flex gap-x-5 items-center">
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className="drop-shadow-md  "
                icon={faUser}
              />

              <span
                className={` ${
                  toggle ? "hidden" : "block"
                } capitalize font-bold `}
              >
                {" "}
                profile
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className={` ${toggle ? "hidden" : "block"}  `}
                icon={faCaretRight}
              />
            </div>
          </Link>
        </div>
        <div className="  ">
          <Link
            className={`mx-auto  w-[90%] hover:bg-[#191919]  flex   h-16 px-2 ${
              toggle ? "justify-center" : "justify-between"
            } items-center`}
            href="/profile"
          >
            <div className="flex gap-x-5 items-center">
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className="drop-shadow-md  "
                icon={faUser}
              />

              <span
                className={` ${
                  toggle ? "hidden" : "block"
                } capitalize font-bold `}
              >
                {" "}
                profile
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className={` ${toggle ? "hidden" : "block"}  `}
                icon={faCaretRight}
              />
            </div>
          </Link>
        </div>
        <div className="  ">
          <Link
            className={`mx-auto  w-[90%] hover:bg-[#191919]  flex   h-16 px-2 ${
              toggle ? "justify-center" : "justify-between"
            } items-center`}
            href="/profile"
          >
            <div className="flex gap-x-5 items-center">
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className="drop-shadow-md  "
                icon={faUser}
              />

              <span
                className={` ${
                  toggle ? "hidden" : "block"
                } capitalize font-bold `}
              >
                {" "}
                profile
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className={` ${toggle ? "hidden" : "block"}  `}
                icon={faCaretRight}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
