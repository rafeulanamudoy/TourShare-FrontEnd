"use client";

import { useRemoveAccount, useUserData } from "@/hooks/user/user";
import { setToggle } from "@/redux/features/toggle/toggleSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NotificationModal } from "../notifications/NotificationModal";
import { INotification } from "@/types/INotification";
import { ENUM_NOTIFICATION_STATUS } from "@/enums/notification";
import useCombinedNotifications from "@/hooks/notifications/useCombinedNotification";

type NavbarProps = {
  allNotifications: INotification[];
  unseenNotifications: INotification[];
};

export default function Navbar({
  allNotifications,
  unseenNotifications,
}: NavbarProps) {
  const handleLogOut = useRemoveAccount();
  const { isLoading } = useUserData();
  const dispatch = useAppDispatch();
  const { profileImage } = useAppSelector((state) => state.auth.user);
  const instantNotifications = useAppSelector(
    (state) => state.notifications.notifications as INotification[]
  );

  console.log(instantNotifications, "check instant notification from navbar");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { combinedAllNotifications, combinedUnseenNotifications } =
    useCombinedNotifications(instantNotifications, allNotifications);

  return (
    <div className="bg-white 2xl:text-[25px] xl:text-[15px] lg:text-[12px] text-[8px] px-5 flex items-center justify-between h-36 border-b-2">
      <div>
        <button onClick={() => dispatch(setToggle())}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className="flex font-bold text-[#31363F] items-center gap-x-5 xl:gap-x-18 capitalize">
        <div className="relative">
          <button onClick={() => setIsModalOpen(true)}>
            <FontAwesomeIcon icon={faBell} />
            {combinedUnseenNotifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-[10px]">
                {combinedUnseenNotifications.length}
              </span>
            )}
          </button>
        </div>
        <div>
          <Link href="/">home</Link>
        </div>
        <div>
          <button className="capitalize" onClick={handleLogOut}>
            logout
          </button>
        </div>
        <div className="w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 rounded-full overflow-hidden">
          {profileImage && (
            <Image
              src={profileImage.url ? profileImage?.url : ""}
              alt="Picture of the author"
              className="rounded-full"
              width={100}
              height={100}
            />
          )}
        </div>
      </div>
      {isModalOpen && (
        <NotificationModal
          allNotifications={combinedAllNotifications}
          unseenNotifications={combinedUnseenNotifications}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
