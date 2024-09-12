import TeamJoin from "@/src/components/FormComponent/TeamJoin";

export default function page() {
  return (
    <div>
      <main>
        <TeamJoin />
      </main>
    </div>
  );
}

// useEffect(() => {
//   console.log("rerender");
//   const handleAsyncOp = () => {
//     const hash = window.location.hash;

//     const [, queryString] = hash.split("?");
//     if (queryString) {
//       const params = new URLSearchParams(queryString);
//       const joinId = params.get("joinId");

//       setJoinId(joinId);
//     } else {
//       setJoinId(searchParams.get("joinId"));
//     }
//   };
//   handleAsyncOp();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
