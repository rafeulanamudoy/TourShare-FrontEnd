// pages/chat/[slug].tsx
import ChatComponent from "@/components/chat/ChatComponent";
import ChatHistory from "@/components/chat/ChatHistory";
import { getMessages } from "@/lib/actions/Server/messages";
import { getSingleUser } from "@/lib/actions/Server/user";

export default async function Chat({ params }: { params: { slug: string } }) {
  const recepientUser = decodeURIComponent(params.slug);
  const user = await getSingleUser();
  //console.log(user.data.email, "user email");
  const messages = await getMessages(user.data.email, recepientUser);
  //console.log(messages, "message");

  return (
    <div className="    ml-4  mt-4 h-[600px] w-[500px] flex flex-col p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4  text-center">{recepientUser}</h1>
      <div className=" overflow-y-auto "></div>
      <div className="overflow-y-auto">
        <ChatComponent recepient={recepientUser}>
          <ChatHistory messages={messages} />
        </ChatComponent>
      </div>
    </div>
  );
}
