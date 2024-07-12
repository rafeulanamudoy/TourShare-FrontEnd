import ChattingLists from "@/src/components/Chat/ChattingLists";

export default async function MessageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className=" md:flex grid  md:justify-normal    justify-center md:h-[calc(100vh - 144px )]">
      <ChattingLists />

      <div className=" md:mx-0 mx-auto ">{children}</div>
    </section>
  );
}
