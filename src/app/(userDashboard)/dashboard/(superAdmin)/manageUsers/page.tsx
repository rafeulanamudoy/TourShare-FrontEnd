import DeleteUserButton from "@/src/components/Buttons/DeleteUserButton";
import UserUpdateButton from "@/src/components/Buttons/UserUpdateButton";
import RoleSelect from "@/src/components/RoleSelect";
import { getAllUsers } from "@/src/lib/actions/Server/user";
import { IUserSchema } from "@/src/types/IUser";

export default async function page() {
  const users = await getAllUsers();

  return (
    <div className="uppercase my-10">
      <div className="grid  gap-y-5   ">
        <h1
          className=" text-[#0C264C] 2xl:text-8xl xl:text-6xl   lg:text-4xl sm:text-3xl text-2xl text-center underline"
          style={{ textUnderlineOffset: "0.2em", margin: "1rem" }}
        >
          Manage Users
        </h1>
      </div>
      <div className=" ">
        {users?.data && (
          <table className=" mx-auto  my-5 table-auto    border-collapse border border-slate-400 ">
            <thead
              className="    2xl:text-2xl xl:text-base lg:text-sm   md:text-xs    sm:text-[10px] text-[4px]
           "
            >
              <tr className="">
                <th className=" border border-slate-600  p-2">Name</th>
                <th className=" border border-slate-600  p-2">Email</th>
                <th className=" border border-slate-600 p-2 ">Phone Number</th>

                <th className=" border border-slate-600 p-2 ">Role</th>

                <th className=" border border-slate-600 p-2 ">Update</th>
                <th className=" border border-slate-600 p-2 ">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users?.data?.map((user: IUserSchema) => (
                <tr
                  className=" border  2xl:text-2xl xl:text-base lg:text-sm   md:text-xs    sm:text-[10px] text-[4px] border-slate-600 text-center"
                  key={user._id}
                >
                  <td className=" border border-slate-600 p-2">
                    {user.name.firstName} {user.name.lastName}
                  </td>
                  <td className=" border border-slate-600 p-2">{user.email}</td>
                  <td className=" border border-slate-600 p-2">
                    {user.phoneNumber}
                  </td>

                  <td className=" border border-slate-600 p-2">
                    {" "}
                    <RoleSelect value={user?.role} />
                  </td>
                  <td className=" border border-slate-600 p-2">
                    <UserUpdateButton payload={user} />
                  </td>

                  <td className=" border border-slate-600  p-2">
                    <DeleteUserButton id={user._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
