import ChatComponent from "@/components/chat/ChatComponent";
import ChatHistory from "@/components/chat/ChatHistory";
import { getMessages } from "@/lib/actions/Server/messages";
import { getSingleUser } from "@/lib/actions/Server/user";

export default async function Chat({ params }: { params: { slug: string } }) {
  const recepientUser = decodeURIComponent(params.slug);

  const user = await getSingleUser();
  //console.log(user.data.email, "user email");
  const messages = await getMessages(user?.data?.email, recepientUser);
  //console.log(messages, "message");

  return (
    <div className="   md:mb-0 mb-4  ml-4  mt-4 2xl:h-[500px]  lg:h[400px] md:h-[350px]  h-[300px]    lg:w-[450px] md:w-[400px] sm:w-[350px] w-[300px]  flex flex-col p-4 bg-gray-50">
      <h1 className="2xl:text-3xl xl:text-2xl lg:text-base  md:text-xs sm:text-[10px] text-[8px]  font-bold mb-4  text-center">
        {recepientUser}
      </h1>
      <div className=" overflow-y-auto "></div>
      <div className="overflow-y-auto ">
        <ChatComponent recepient={recepientUser}>
          <ChatHistory messages={messages} />
        </ChatComponent>
      </div>
    </div>
  );
}
