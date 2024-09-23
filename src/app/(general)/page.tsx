import ShowTeam from "@/src/components/ShowTeam";

export default function page(searchParams: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let page = Number(searchParams.searchParams.page) || 1;

  return (
    <main className="   ">
      <div id="showTeam">
        <ShowTeam page={page} />
      </div>
    </main>
  );
}
