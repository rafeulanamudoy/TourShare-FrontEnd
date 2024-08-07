import { removeCookie } from "@/src/lib/actions/Server/cookies";
import { getSingleUser } from "@/src/lib/actions/Server/user";
import { setUser } from "@/src/redux/features/auth/authSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { ENUM_USER_ROLE, IUpdatedUser } from "@/src/types/IUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

export const useUserData = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<IUpdatedUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchUserData = await getSingleUser();

        if (fetchUserData) {
          setUserData(fetchUserData?.data);
          dispatch(
            setUser({
              user: {
                name: fetchUserData?.data.name,

                email: fetchUserData?.data?.email,
                role: fetchUserData?.data?.role,
                profileImage: fetchUserData?.data?.profileImage,
                phoneNumber: fetchUserData?.data?.phoneNumber,
                _id: fetchUserData?.data?._id,
                emailVerified: fetchUserData?.data?.emailVerified,
              },
            })
          );
        } else {
          dispatch(
            setUser({
              user: {
                name: {
                  firstName: "",
                  lastName: "",
                },
                email: "",
                role: ENUM_USER_ROLE.DEFAULT,
                profileImage: {
                  url: "",
                  public_id: "",
                },
                _id: "",
                phoneNumber: "",
                emailVerified: false,
              },
            })
          );
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, userData };
};
