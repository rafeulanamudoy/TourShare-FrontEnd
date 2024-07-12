import JoinTeamButton from "@/components/Buttons/JoinTeamButton";
import { getSingleTeamById } from "@/lib/actions/Server/team";
import { formattedDate } from "@/utilities/TimeFormat";
import {
  faCalendarDays,
  faCoins,
  faEnvelope,
  faLayerGroup,
  faMapLocation,
  faPeopleGroup,
  faPhone,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function page({ params }: { params: { slug: string } }) {
  const team = await getSingleTeamById(params.slug);

  return (
    <div
      id="details"
      className="  w-[80%] mx-auto grid items-center justify-center"
    >
      <h1 className=" mt-5 2xl:text-6xl xl:text-4xl lg:text-2xl md:text-xl sm:text-base text-sm capitalize">
        Group Details
      </h1>
      <div>
        <div
          className=" grid lg:grid-cols-3  md:grid-cols-2   2xl:text-2xl  xl:text-xl lg:text-base md:text-sm sm:text-xs text-[8px]
          gap-5 mt-5  p-5  bg-gray-300"
        >
          <div className="flex  items-center gap-x-2">
            <FontAwesomeIcon
              style={{ width: "1em", height: "1em" }}
              icon={faLayerGroup}
            />
            <span> Group Name: {team?.data?.teamName}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <FontAwesomeIcon
              style={{ width: "1em", height: "1em" }}
              icon={faEnvelope}
            />
            <span> Email: {team?.data?.email}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <FontAwesomeIcon
              style={{ width: "1em", height: "1em" }}
              icon={faPhone}
            />
            <span> Phone Number: {team?.data?.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <FontAwesomeIcon
              style={{ width: "1em", height: "1em" }}
              icon={faMapLocation}
            />
            <span> Destination: {team?.data?.destination}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <FontAwesomeIcon
              style={{ width: "1em", height: "1em" }}
              icon={faCoins}
            />
            <span> Budget: {team?.data?.budget}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <FontAwesomeIcon
              style={{ width: "1em", height: "1em" }}
              icon={faCalendarDays}
            />
            <span className="duration">
              Duration: {formattedDate(team?.data?.startDate)} -{" "}
              {formattedDate(team?.data?.endDate)}
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <FontAwesomeIcon
              style={{ width: "1em", height: "1em" }}
              icon={faPeopleGroup}
            />
            <span>Current members: {team?.data?.currentMembers}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <FontAwesomeIcon
              style={{ width: "1em", height: "1em" }}
              icon={faUserGroup}
            />
            <span>Needed members: {team?.data?.neededMembers}</span>
          </div>
          <div>
            <JoinTeamButton
              teamId={team?.data?._id}
              status={team?.data?.teamStatus}
            />
          </div>
        </div>
        <div className=" mt-5  grid gap-y-5">
          <h1 className="2xl:text-4xl xl:text-2xl lg:text-xl md:text-xl sm:text-base  text-xs capitalize">
            Overview
          </h1>
          <div>
            <span className="    text-justify 2xl:text-2xl  xl:text-xl lg:text-base md:text-sm sm:text-xs text-[8px]">
              {team?.data?.teamDetails?.description}
            </span>
          </div>
          <hr className="leading-4 border-gray-500" />
          <div className="  text-justify 2xl:text-2xl  xl:text-xl lg:text-base md:text-sm sm:text-xs text-[8px]">
            <div className=" grid grid-cols-12 mb-5 gap-y-5  ">
              <span className="col-span-2">Depurture:</span>
              <span className="col-span-10">
                {team?.data?.teamDetails?.depurture}
              </span>
            </div>
            <hr className="leading-4 border-gray-500" />

            <div className=" grid grid-cols-12 my-5   ">
              <span className="col-span-2">Depurture Time:</span>
              <span className="col-span-10">
                {team?.data?.teamDetails?.depurtureTime}
              </span>
            </div>
            <hr className="leading-4 border-gray-500  " />
            <div className="grid grid-cols-12  my-5 ">
              <span className="col-span-2">Return Time:</span>
              <span className="col-span-10">
                {team?.data?.teamDetails?.returnTime}
              </span>
            </div>
          </div>
          {team?.data?.teamDetails?.activities?.length > 0 && (
            <div className="grid gap-y-5">
              <h1 className="2xl:text-4xl xl:text-2xl lg:text-xl md:text-xl sm:text-base  text-xs capitalize ">
                What We Will Do
              </h1>
              {team?.data?.teamDetails?.activities.map(
                (activity: { activity: string; _id: string }) => (
                  <ul
                    className="2xl:text-2xl  xl:text-xl lg:text-base md:text-sm sm:text-xs text-[8px]   list-disc ml-5  mb-5"
                    key={activity._id}
                  >
                    <li>{activity?.activity}</li>
                  </ul>
                )
              )}
            </div>
          )}
        </div>
        {team?.data?.teamDetails?.responsibilities?.length > 0 && (
          <div className="grid gap-y-5">
            <h1 className="2xl:text-4xl xl:text-2xl lg:text-xl md:text-xl sm:text-base  text-xs capitalize ">
              Responsibility
            </h1>
            {team?.data?.teamDetails?.responsibilities?.map(
              (responsibility: { responsibility: string; _id: string }) => (
                <ul
                  className="2xl:text-2xl  xl:text-xl lg:text-base md:text-sm sm:text-xs text-[8px]   list-disc ml-5  mb-5"
                  key={responsibility?._id}
                >
                  <li>{responsibility?.responsibility}</li>
                </ul>
              )
            )}
          </div>
        )}

        <div className="grid gap-y-5">
          <h1 className="2xl:text-4xl xl:text-2xl lg:text-xl md:text-xl sm:text-base text-xs capitalize ">
            Expense Breakdown
          </h1>
          <span className="2xl:text-2xl xl:text-xl lg:text-base md:text-sm sm:text-xs text-[8px] mb-5  ">
            {team?.data?.teamDetails?.costBreakDown}
          </span>
        </div>
      </div>
    </div>
  );
}
