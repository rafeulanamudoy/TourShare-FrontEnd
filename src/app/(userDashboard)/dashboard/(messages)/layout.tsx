import ChatLists from "@/components/chat/ChatLists";

export default async function MessageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" flex h-[calc(100vh - 144px )]">
      <ChatLists />

      <div className=" ">{children}</div>
    </section>
  );
}
