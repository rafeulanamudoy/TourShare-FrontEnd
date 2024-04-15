"use client";
import Image from "next/image";
import React from "react";
import logo from "../../../public/images/whiteLogo.png";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faUser,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToggle } from "@/redux/features/toggle/toggleSlice";
export default function Sidebar() {
  const { toggle } = useAppSelector((state) => state.toggle);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`${
        toggle ? " w-80   md:w-24" : "md:w-80    hidden md:block"
      } h-screen  text-white 
       bg-[#31363F]   md:relative absolute  `}
    >
      <div className="   flex  justify-end  p-5 md:hidden ">
        <button onClick={() => dispatch(setToggle())}>
          <FontAwesomeIcon
            style={{ width: "1.5em", height: "2em" }}
            icon={faCircleXmark}
          ></FontAwesomeIcon>
        </button>
      </div>
      <div className="   md:border-b-2    h-36 flex  items-center justify-center  ">
        <div className="      ">
          <Image
            className={`  `}
            src={logo}
            style={{
              width: `${toggle ? "70px" : "150px"}`,
              height: "auto",
            }}
            placeholder="blur"
            alt="logo"
          />
        </div>
      </div>
      <div className=" mt-5 2xl:text-xl xl:text-lg lg:text-sm  text-xs  flex flex-col  gap-y-5   ">
        <div className=" ">
          <Link
            className={` mx-auto  w-[90%] hover:bg-[#191919]  flex   h-16 px-2 ${
              toggle ? "md:justify-center justify-between" : "justify-between"
            } items-center`}
            href="/profile"
          >
            <div className="flex gap-x-5 items-center">
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className={`  `}
                icon={faUser}
              />

              <span
                className={` ${
                  toggle ? "md:hidden" : "block"
                } capitalize font-bold `}
              >
                {" "}
                profile
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className={` ${toggle ? "md:hidden" : "block"}  `}
                icon={faCaretRight}
              />
            </div>
          </Link>
        </div>
        <div className="  ">
          <Link
            className={`mx-auto  w-[90%] hover:bg-[#191919]  flex   h-16 px-2 ${
              toggle ? "md:justify-center justify-between" : "justify-between"
            } items-center`}
            href="/profile"
          >
            <div className="flex gap-x-5 items-center">
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className=" "
                icon={faUser}
              />

              <span
                className={` ${
                  toggle ? "md:hidden" : "block"
                } capitalize font-bold `}
              >
                {" "}
                profile
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className={` ${toggle ? "md:hidden" : "block"}  `}
                icon={faCaretRight}
              />
            </div>
          </Link>
        </div>
        <div className="  ">
          <Link
            className={`mx-auto  w-[90%] hover:bg-[#191919]  flex   h-16 px-2 ${
              toggle ? "md:justify-center justify-between" : "justify-between"
            } items-center`}
            href="/profile"
          >
            <div className="flex gap-x-5 items-center">
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className="  "
                icon={faUser}
              />

              <span
                className={` ${
                  toggle ? "md:hidden" : "block"
                } capitalize font-bold `}
              >
                {" "}
                profile
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className={` ${toggle ? "md:hidden" : "block"}  `}
                icon={faCaretRight}
              />
            </div>
          </Link>
        </div>
        <div className="  ">
          <Link
            className={`mx-auto  w-[90%] hover:bg-[#191919]  flex   h-16 px-2 ${
              toggle ? "md:justify-center justify-between" : "justify-between"
            } items-center`}
            href="/profile"
          >
            <div className="flex gap-x-5 items-center">
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className=" "
                icon={faUser}
              />

              <span
                className={` ${
                  toggle ? "md:hidden" : "block"
                } capitalize font-bold `}
              >
                {" "}
                profile
              </span>
            </div>
            <div>
              <FontAwesomeIcon
                style={{ width: "1.5em", height: "1.5em" }}
                className={` ${toggle ? "md:hidden" : "block"}  `}
                icon={faCaretRight}
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
