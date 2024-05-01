import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { ENUM_USER_ROLE } from "@/types/IUser";
import { getUserFromCookie, removeCookie } from "@/lib/actions/Server/cookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSingleUser } from "@/lib/actions/Server/user";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getSingleUser();
        //console.log(userData, "userData");
        if (userData) {
          dispatch(
            setUser({
              user: {
                name: userData?.data.name,

                email: userData?.data?.email,
                role: userData?.data?.role,
                profileImage: userData?.data?.profileImage,
                phoneNumber: userData?.data?.phoneNumber,
                _id: userData?.data?._id,
              },
            })
          );
        }
        // console.log(userData, "from useUser hook");
        else {
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
              },
            })
          );
        }
      } catch (error) {
        console.log(
          error,
          "check error from useuserdata from user.ts file hook folder"
        );
      } finally {
        setIsLoading(false);
        // Update loading state when data fetching is done
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return loading state along with other data if needed
  return isLoading;
};

//   const { innerWidth } = useWindowSize();
//   const [resizeLoading, setResizeLoading] = useState(true);
//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     const debouncedHandleResize = _debounce(() => {
//       if (innerWidth && innerWidth < 1024) {
//         dispatch(setToggle());
//       }
//     }, 200);

//     window.addEventListener("resize", debouncedHandleResize);

//     return () => {
//       window.removeEventListener("resize", debouncedHandleResize);
//     };
//   }, [innerWidth, dispatch]);
//   useEffect(() => {
//     setResizeLoading(true);
//     const timeout = setTimeout(() => {
//       setResizeLoading(false);
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, []);

//   return resizeLoading;
// };
