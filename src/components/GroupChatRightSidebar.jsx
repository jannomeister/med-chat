import React from "react";

const GroupChatRightSidebar = ({ owner, members }) => {
  const sampleImg =
    "https://images.unsplash.com/photo-1617094876531-3ad72ca3306d?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfHRvd0paRnNrcEdnfHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
  const [memberAvatars, setMemberAvatars] = React.useState([]);

  // React.useEffect(() => {
  //   const tempArr = [];
  //   for (let i = 0; i < 8; i++) {
  //     tempArr.push(
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8&auto=format&fit=crop&w=500&q=60"
  //     );
  //   }

  //   setMemberAvatars(tempArr);
  // }, []);

  return (
    <aside className="h-screen w-80 fixed z-10 top-0 right-0 overflow-x-hidden pt-9 pr-5">
      <nav className="bg-gray-200 rounded-t-lg h-full text-center font-semibold p-4">
        <h1>Group Members</h1>

        {owner ? (
          <div className="flex flex-row">
            <div className="flex flex-col items-center justify-center w-2/5 h-auto py-1">
              <div className="inline-block relative overflow-hidden rounded-lg h-full w-4/5 bg-black border-2 border-white">
                <img
                  src={owner.photoUrl}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>

              <h1 className="text-xs font-bold">
                {owner.displayName ? owner.displayName : owner.email}
              </h1>
            </div>
            <div style={{ width: "60%" }}>
              <div className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-1 p-2 h-full">
                {members
                  .filter((m) => m.uid !== owner.userId)
                  .slice(0, 6)
                  .map((e, index) => (
                    <div
                      key={e.uid}
                      className={`flex justify-center rounded-full overflow-hidden w-full h-3/6 border-2 border-white ${
                        index % 2 === 0 ? "self-end" : ""
                      }`}
                      style={{ height: "65%" }}
                    >
                      <img
                        src={e.photoURL}
                        alt=""
                        className="object-cover h-full w-full"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <hr className="border-gray-300" />

        <div className="mt-5">
          <h1 className="text-xs text-left font-bold">PHOTOS & MULTIMEDIA</h1>
        </div>

        <hr className="border-gray-300" />

        <div className="mt-5">
          <h1 className="text-xs text-left font-bold">ATTACHMENTS</h1>
        </div>
      </nav>
    </aside>
  );
};

export default GroupChatRightSidebar;
