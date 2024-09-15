import { removeCookie } from "@/src/lib/actions/Server/cookies";

import { setUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { ENUM_USER_ROLE } from "@/src/types/IUser";
import { useRouter } from "next/navigation";

export const useRemoveAccount = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const handleLogout = async () => {
    await removeCookie("accessToken");
    dispatch(
      setUser({
        user: {
          name: {
            firstName: "",
            lastName: "",
          },
          role: ENUM_USER_ROLE.DEFAULT,
          email: "",
          profileImage: {
            public_id: "",
            url: "",
          },
          _id: "",
          phoneNumber: "",
          emailVerified: false,
        },
      })
    );
    push("/");
  };

  return handleLogout;
};
