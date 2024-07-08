import ContactForm from "@/components/formComponent/ContactForm";
import { dancing_script } from "@/utilities/css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div id="#contact" className=" bg-[#E1E1E1] ">
      <div className="grid  grid-cols-2 gap-x-5 w-[70%] mx-auto py-5 ">
        <div className=" flex flex-col gap-y-5  ">
          <h1
            className={` 2xl:text-3xl  xl:text:2xl lg:text-xl md:text-base sm:text-sm  text-xs capitalize ${dancing_script.className}`}
          >
            Would Like To talk?
          </h1>
          <h1 className="  uppercase 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-xl sm:text-base  text-sm">
            Contact Details
          </h1>
          <p className="2xl:text-xl xl:text-base lg:text-sm md:text-xs text-[10px]">
            If you have a story to share or a question that has not been
            answered on our website, please get in touch with us via contact
            details listed below or fill in the form on the right.
          </p>
          <div>
            <div className="flex items-center gap-x-2 text-[#2e4262] font-bold 2xl:text-xl xl:text-base lg:text-sm md:text-xs text-[10px]">
              <FontAwesomeIcon
                style={{ width: "1em", height: "1em" }}
                icon={faEnvelope}
              />
              <span> Email: udoyrafeul@gmail.com</span>
            </div>
            <div className="flex items-center gap-x-2 text-[#2e4262] font-bold 2xl:text-xl xl:text-base lg:text-sm md:text-xs text-[10px]">
              <FontAwesomeIcon
                style={{ width: "1em", height: "1em" }}
                icon={faPhone}
              />
              <span> Phone Number: +8801515635005</span>
            </div>
          </div>
          <div className=" flex gap-x-5">
            <Link href="https://www.facebook.com/rafeul.anam.udoy">
              <FontAwesomeIcon
                style={{
                  width: "2em",
                  height: "2em",
                  color: "white",
                  backgroundColor: "#4267B2",
                  borderRadius: "5px",
                }}
                icon={faFacebookF}
              />
            </Link>
            <Link href="https://www.linkedin.com/in/rafeul-anam-udoy">
              <FontAwesomeIcon
                style={{
                  width: "2em",
                  height: "2em",
                  color: "white",
                  backgroundColor: "#0077B5",
                  borderRadius: "5px",
                }}
                icon={faLinkedin}
              />
            </Link>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
