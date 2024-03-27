"use client";
import Link from "next/link";

import Image from "next/image";
import logo from "../../public/images/logo.png";
import { Roboto as Roboto } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import {
  faBars,
  faRightFromBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { ENUM_USER_ROLE } from "@/types/IUser";
import {
  getUserFromCookie,
  removeCookie,
  verifyToken,
} from "@/lib/actions/Server/user";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  // console.log("render header component");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { email, role } = useAppSelector((state) => state.auth.user);
  const [userEmail, setUserEmail] = useState("");
  const dispatch = useAppDispatch();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  useEffect(() => {
    getUserFromCookie()
      .then((user) => {
        dispatch(
          setUser({
            user: {
              email: user.userEmail,
              role: user.role,
            },
          })
        );
        // Decode user here and set state accordingly
      })
      .catch((error) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogOut = async () => {
    // Cookies.remove("accessToken");
    await removeCookie("accessToken");
    dispatch(
      setUser({
        user: {
          role: ENUM_USER_ROLE.CUSTOMER,
          email: "",
        },
      })
    );
  };

  return (
    <div
      className={`z-10  bg-white   lg:absolute top-0 w-full   lg:h-[25vh]  grid   lg:flex lg:justify-evenly items-center opacity-80 font-roboto 2xl:text-[25px]  xl:text-[15px]   lg:text-[12px]  text-[8px]     uppercase ${roboto.className}`}
    >
      <nav
        className={`${
          isMobileMenuOpen ? `lg:flex` : `hidden`
        }  lg:flex grid  mx-5 lg:mx-0   gap-x-5  gap-y-5 xl:gap-y-0  xl:gap-x-18  items-center font-semibold `}
      >
        {[
          ["home", "/"],
          ["create team", "/createTeam"],
          ["join team", "/joinTeam"],
          ["about us", "/about us"],
        ].map(([title, url]) => (
          <Link className="" key={url} href={url}>
            {title}
          </Link>
        ))}
      </nav>
      <div className=" order-first  lg:order-none my-5 lg:my-0    mx-5  lg:mx-0 flex items-center   justify-between  ">
        <div className=" overflow-hidden">
          <Image
            className="logo"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={500}
            height={300}
            sizes="100vw"
            src={logo}
            placeholder="blur"
            alt="logo"
          />
        </div>

        <div className="lg:hidden    ">
          <button
            className="text-xl font-bold  text-black"
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon className="  " icon={faBars} />
          </button>
        </div>
      </div>

      <nav
        className={`${
          isMobileMenuOpen ? `lg:flex` : `hidden`
        }   lg:flex gap-x-5  mx-5 lg:mx-0 mt-5 lg:mt-0   xl:gap-x-18  items-center  font-semibold  
        `}
      >
        <div>
          <Link className="  " href="/contact">
            contact
          </Link>
        </div>
        {email ? (
          <div className="lg:flex gap-x-5   xl:gap-x-18 h-16 items-center gap-y-5   ">
            <button
              onClick={handleLogOut}
              className="  uppercase block my-5 lg:my-0"
            >
              sign out
            </button>
            <button className="  uppercase ">{email}</button>
          </div>
        ) : (
          <div
            className={`${
              isMobileMenuOpen ? `lg:flex` : `hidden`
            } lg:flex gap-x-5    xl:gap-x-18 h-16 items-center `}
          >
            {[
              ["sign In", "/signIn#signIn", faRightFromBracket],
              ["sign up", "/signUp#signUp", faUserPlus],
            ].map(([title, url, icon], index) => (
              <div key={index} className="authButton  mt-5 lg:mt-0   ">
                <div>
                  <Link
                    href={url as string}
                    className=" flex items-center gap-3 font-semibold "
                  >
                    <FontAwesomeIcon
                      style={{ width: "1.1em", height: "1.1em" }}
                      icon={icon as IconProp}
                      className="lg:block hidden"
                    />
                    <div>{title as string}</div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
